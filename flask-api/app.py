from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler
import joblib
from flask_cors import CORS
from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image
from io import BytesIO
import easyocr
import time
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler
with open('model.pkl', 'rb') as model_file:
    best_model = pickle.load(model_file)

with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

model_filename = "multi_output_model.pkl"
multi_output_model = joblib.load(model_filename)
print(f"Model loaded from {model_filename}")

# Month names for output
month_names = [
    "Jan", "Feb", "March", "April", "May", "June",
    "July", "August", "Sept", "Oct", "Nov", "Dec"
]

def scrape_school_data(html_content):
    """Extract school data from the HTML content."""
    soup = BeautifulSoup(html_content, 'html.parser')
    school_name_span = soup.find('span', class_='pFont14')
    school_name = school_name_span.text.strip() if school_name_span else "Unknown"
    return school_name

@app.route('/fetch-school-data', methods=['POST'])
def fetch_school_data():
    """Endpoint to fetch school data based on school ID."""
    data = request.json
    school_id = data.get('school_id')

    if not school_id:
        return jsonify({"error": "School ID is required."}), 400

    # Set up WebDriver
    driver = webdriver.Chrome()
    try:
        # Open the website
        driver.get("https://src.udiseplus.gov.in/home")
        time.sleep(2)

        # Fetch CAPTCHA using Selenium and Requests
        session = requests.Session()
        cookies = driver.get_cookies()
        for cookie in cookies:
            session.cookies.set(cookie['name'], cookie['value'])

        captcha_url = "https://src.udiseplus.gov.in/searchCaptcha"
        response = session.get(captcha_url, stream=True)

        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch CAPTCHA image."}), 500

        captcha_image = Image.open(BytesIO(response.content))
        captcha_image.save("captcha.jpg")

        # Use EasyOCR to extract text from CAPTCHA
        reader = easyocr.Reader(['en'])
        result = reader.readtext('captcha.jpg', detail=0)
        captcha_text = ''.join(result)

        # Fill in the form and submit
        wait = WebDriverWait(driver, 10)
        school_id_field = wait.until(EC.presence_of_element_located((By.NAME, "udiseCode")))
        captcha_field = wait.until(EC.presence_of_element_located((By.NAME, "captcha")))
        school_id_field.send_keys(school_id)
        captcha_field.send_keys(captcha_text)

        submit_button = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "btn-info")))
        submit_button.click()
        time.sleep(3)

        # Navigate to the report card
        school_name_link = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "clickLink")))
        school_name_link.click()
        driver.switch_to.window(driver.window_handles[-1])

        report_card_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '2022-23')]")))
        report_card_button.click()
        time.sleep(5)

        # Extract the report card HTML
        report_card_html = driver.page_source
        school_name = scrape_school_data(report_card_html)

        return report_card_html

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        driver.quit()


# Route for predicting school rating and providing suggestions
@app.route('/predict_school_rating', methods=['POST'])
def predict_school_rating():
    try:
        # Parse input data from JSON request
        print("hello")
        input_data = request.json
        
        # Convert input data to a DataFrame
        input_df = pd.DataFrame([input_data])
        print(input_df)
        # Calculate 'Total/Students' and 'Total/Classroom' ratios
        input_df['Total/Students'] = input_df['Total Teachers'] / input_df['Total Students']
        input_df['Total/Classroom'] = input_df['Total Classrooms'] / input_df['Total Students']

        # List of prediction features
        prediction_features = [
            'Lowest Class', 'Highest Class', 'Boys Washrooms', 'Girls Washrooms', 'Boundary Wall', 
            'Library Available', 'Drinking Water Available', 'Playground Available', 'Electricity Availability', 
            'Kitchens for Mid-Day Meal', 'Eco-Friendly Construction (Rainwater Harvesting, Solar)', 
            'Safety Standards Compliance (Earthquake, Fire)', 'Universal Access (Distance from habitation)', 
            'Inclusive Environment (Ramp, Barrier-Free)', 'Transportation for Remote Areas', 'Community Participation',
            'Qualified Teachers (RTE Act)', 'ICT Integration (Computer Labs)', 'Vocational Training Availability',
            'Active School Management Committee (SMC)', 'Annual Maintenance (School Grants)', 
            'School Mapping (Geographic/Community Planning)', 'Student Tracking (SDMIS)', 'Free and Compulsory Education',
            'Non-Discrimination', 'No Punitive Practices', 'Timely Fund Utilization', 'Funds Audited Annually',
            'Resource Utilization Efficiency', 'Provision of Stipends for CWSN Girls', 'KGBV Upgraded',
            'Integration with Anganwadi Centers', 'Adequate Facilities', 'Safety Standards', 'Support for CWSN', 
            'Community Engagement', 'Co-location with Anganwadi Centers', 'Child Protection Policies', 
            'Curriculum Implementation', 'Qualified and Trained Teachers', 'Supportive Learning Environment', 
            'Governance and Management', 'Monitoring and Evaluation Practices', 'Management Structure', 
            'Infrastructure Quality', 'Support Systems', 'Financial Management', 'Positive Educational Outcomes', 
            'Research and Development Engagement', 'Student Learning Outcomes', 'Data Management and Reporting',
            'Total/Students', 'Total/Classroom'
        ]

        # Select relevant features for prediction
        input_df_for_prediction = input_df[prediction_features]

        # Scale the input data
        input_scaled = scaler.transform(input_df_for_prediction)

        # Predict the school rating using the trained model
        predicted_rating = best_model.predict(input_scaled)[0]

        # Generate suggestions for improvements
        suggestions = []

        # Teacher/Student ratio suggestion
        if input_df['Total/Students'].iloc[0] < 0.025:
            suggestions.append("Consider hiring more teachers to improve the teacher-student ratio.")

        # Classrooms per student ratio suggestion
        if input_df['Total/Classroom'].iloc[0] < 0.02:
            suggestions.append("Consider increasing the number of classrooms for better space and learning environment.")

        # Non-standard class range suggestion
        valid_class_combinations = [(1, 5), (1, 12), (1, 10), (1, 8), (5, 8), (5, 10), (9, 10), (11, 12)]
        lowest_class = input_df['Lowest Class'].iloc[0]
        highest_class = input_df['Highest Class'].iloc[0]
        if (lowest_class, highest_class) not in valid_class_combinations:
            suggestions.append("The combination of lowest and highest classes is non-standard. Adjust the class range.")

        # Feature-based suggestions
        facilities = {
            'Boys Washrooms': "Ensure that there are separate washrooms for boys.",
    'Girls Washrooms': "Ensure that there are separate washrooms for girls.",
    'Boundary Wall': "Consider constructing a boundary wall for security and safety.",
    'Library Available': "Consider setting up a library for student access to learning resources.",
    'Drinking Water Available': "Ensure drinking water is available for students.",
    'Playground Available': "Consider providing a playground for outdoor activities.",
    'Electricity Availability': "Ensure the school has electricity for a better learning environment.",
    'Kitchens for Mid-Day Meal': "Ensure there are kitchens available for the mid-day meal program.",
    'Eco-Friendly Construction (Rainwater Harvesting, Solar)': "Consider implementing eco-friendly construction like rainwater harvesting or solar panels.",
    'Safety Standards Compliance (Earthquake, Fire)': "Ensure that the school complies with safety standards for earthquake and fire protection.",
    'Universal Access (Distance from habitation)': "Ensure that the school provides universal access with ramps and barrier-free access for differently-abled students.",
    'Inclusive Environment (Ramp, Barrier-Free)': "Ensure that the school provides an inclusive environment for all students.",
    'Transportation for Remote Areas': "Provide transportation options for students from remote areas.",
    'Community Participation': "Increase community participation in school activities and development.",
    'Qualified Teachers (RTE Act)': "Ensure that all teachers meet the qualifications required by the RTE Act.",
    'ICT Integration (Computer Labs)': "Consider setting up computer labs for ICT integration in the curriculum.",
    'Vocational Training Availability': "Consider offering vocational training programs for students.",
    'Active School Management Committee (SMC)': "Ensure an active and engaged School Management Committee for better governance.",
    'Annual Maintenance (School Grants)': "Ensure that there is an annual maintenance plan in place using available school grants.",
    'School Mapping (Geographic/Community Planning)': "Conduct school mapping for better community planning and resource allocation.",
    'Student Tracking (SDMIS)': "Implement a Student Data Management Information System (SDMIS) for better tracking of student performance.",
    'Free and Compulsory Education': "Ensure that all students have access to free and compulsory education.",
    'Non-Discrimination': "Ensure that the school follows non-discriminatory practices.",
    'No Punitive Practices': "Ensure that there are no punitive practices in the school system.",
    'Timely Fund Utilization': "Ensure that funds are utilized in a timely manner for school development.",
    'Funds Audited Annually': "Ensure that school funds are audited annually for transparency.",
    'Resource Utilization Efficiency': "Improve resource utilization efficiency for better management.",
    'Provision of Stipends for CWSN Girls': "Provide stipends for CWSN (Children With Special Needs) girls to support their education.",
    'KGBV Upgraded': "Consider upgrading the KGBV (Kasturba Gandhi Balika Vidyalaya) for better facilities.",
    'Integration with Anganwadi Centers': "Consider integrating the school with nearby Anganwadi centers for early childhood education.",
    'Adequate Facilities': "Ensure that the school has adequate facilities for student learning and development.",
    'Support for CWSN': "Ensure adequate support for CWSN students to facilitate their learning.",
    'Community Engagement': "Enhance community engagement to support school development and student success.",
    'Co-location with Anganwadi Centers': "Consider co-locating the school with Anganwadi centers for better integration of early education.",
    'Child Protection Policies': "Implement child protection policies to ensure the safety of all students.",
    'Curriculum Implementation': "Ensure proper implementation of the curriculum to maintain quality education.",
    'Qualified and Trained Teachers': "Ensure that teachers are adequately qualified and trained.",
    'Supportive Learning Environment': "Ensure a supportive learning environment with proper resources and infrastructure.",
    'Governance and Management': "Strengthen the governance and management structure for better school administration.",
    'Monitoring and Evaluation Practices': "Implement effective monitoring and evaluation practices to track student and school performance.",
    'Management Structure': "Ensure a strong and efficient management structure for school administration.",
    'Infrastructure Quality': "Improve the infrastructure quality to ensure a safe and conducive learning environment.",
    'Support Systems': "Ensure that there are adequate support systems for students and teachers.",
    'Financial Management': "Ensure proper financial management for effective allocation of school funds.",
    'Positive Educational Outcomes': "Focus on achieving positive educational outcomes for all students.",
    'Research and Development Engagement': "Engage in research and development activities to enhance educational practices.",
    'Student Learning Outcomes': "Focus on improving student learning outcomes through effective teaching and curriculum implementation.",
    'Data Management and Reporting': "Implement efficient data management and reporting systems to track progress and outcomes."
        }

        for feature, suggestion in facilities.items():
            if input_df[feature].iloc[0] == 0:
                suggestions.append(suggestion)

        # Prepare the response
        response = {
            "predicted_rating": predicted_rating,
            "suggestions": suggestions
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def predict_outputs(input_data, timeframe):
    # Prepare input array for prediction
    input_array = np.array([
        input_data["Initial Quality Score"],
        input_data["Initial Enrollments"],
        input_data["Resource Amount (₹)"],
        timeframe,  # Use the current timeframe
        input_data["Initial Resource Utilization (%)"],
        input_data["Resource Type_Learning Materials"],
        input_data["Resource Type_Teaching Staff"],
        input_data["Resource Type_Technology"]
    ]).reshape(1, -1)

    # Predict impacts
    predicted_impacts = multi_output_model.predict(input_array)
    quality_impact, enrollment_impact, final_resource_utilization = predicted_impacts[0]

    # Calculate final derived values
    final_quality_score = input_data["Initial Quality Score"] * (1 + quality_impact / 100)
    final_enrollments = input_data["Initial Enrollments"] * (1 + enrollment_impact / 100)

    return {
        "Quality Impact (%)": quality_impact,
        "Enrollment Impact (%)": enrollment_impact,
        "Final Resource Utilization (%)": final_resource_utilization,
        "Final Quality Score": min(round(final_quality_score), 100),  # Ensure max quality score is 100
        "Final Enrollments": round(final_enrollments)
    }

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from request
        data = request.json
        initial_quality_score = data.get("Initial Quality Score", 0)
        initial_enrollments = data.get("Initial Enrollments", 0)
        resource_amount = data.get("Resource Amount (₹)", 0)
        total_months = data.get("Total Months", 0)
        resource_type = data.get("Resource Type", "").lower()

        # Encode resource type into one-hot format
        resource_type_encoded = {
            "Resource Type_Learning Materials": 0,
            "Resource Type_Teaching Staff": 0,
            "Resource Type_Technology": 0
        }
        if resource_type == "4":
            resource_type_encoded["Resource Type_Learning Materials"] = 1
        elif resource_type == "3":
            resource_type_encoded["Resource Type_Teaching Staff"] = 1
        elif resource_type == "2":
            resource_type_encoded["Resource Type_Technology"] = 1

        input_data = {
            "Initial Quality Score": initial_quality_score,
            "Initial Enrollments": initial_enrollments,
            "Resource Amount (₹)": resource_amount,
            "Initial Resource Utilization (%)": 0,
            "Resource Type_Learning Materials": resource_type_encoded["Resource Type_Learning Materials"],
            "Resource Type_Teaching Staff": resource_type_encoded["Resource Type_Teaching Staff"],
            "Resource Type_Technology": resource_type_encoded["Resource Type_Technology"]
        }

        # Validate total months
        if not (1 <= total_months <= 12):
            return jsonify({"error": "Total Months must be between 1 and 12"}), 400

        # Generate predictions
        predictions = []
        for timeframe in range(1, total_months + 1):
            prediction = predict_outputs(input_data, timeframe)
            predictions.append({
                "month": month_names[timeframe - 1],
                "enrollment impact": f"{prediction['Enrollment Impact (%)']:.2f}%",
                "final enrollment": prediction["Final Enrollments"],
                "quality impact": f"{prediction['Quality Impact (%)']:.2f}%",
                "final quality score": prediction["Final Quality Score"],
                "resource utilization": f"{prediction['Final Resource Utilization (%)']:.2f}%"
            })

        return jsonify(predictions)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True) 
