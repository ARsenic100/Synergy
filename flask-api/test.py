import requests
import json

# Replace with your API endpoint
url = "https://synergy-ml-model.onrender.com/predict_school_rating"  # Update with your deployment URL if hosted online

# Sample input data
input_data = {
    "Lowest Class": 1,
    "Highest Class": 12,
    "Total Teachers": 20,
    "Total Students": 500,
    "Total Classrooms": 10,
    "Boys Washrooms": 1,
    "Girls Washrooms": 1,
    "Boundary Wall": 1,
    "Library Available": 1,
    "Drinking Water Available": 1,
    "Playground Available": 1,
    "Electricity Availability": 1,
    "Kitchens for Mid-Day Meal": 1,
    "Eco-Friendly Construction (Rainwater Harvesting, Solar)": 0,
    "Safety Standards Compliance (Earthquake, Fire)": 1,
    "Universal Access (Distance from habitation)": 1,
    "Inclusive Environment (Ramp, Barrier-Free)": 1,
    "Transportation for Remote Areas": 1,
    "Community Participation": 1,
    "Qualified Teachers (RTE Act)": 1,
    "ICT Integration (Computer Labs)": 1,
    "Vocational Training Availability": 1,
    "Active School Management Committee (SMC)": 1,
    "Annual Maintenance (School Grants)": 1,
    "School Mapping (Geographic/Community Planning)": 1,
    "Student Tracking (SDMIS)": 1,
    "Free and Compulsory Education": 1,
    "Non-Discrimination": 1,
    "No Punitive Practices": 1,
    "Timely Fund Utilization": 1,
    "Funds Audited Annually": 1,
    "Resource Utilization Efficiency": 1,
    "Provision of Stipends for CWSN Girls": 1,
    "KGBV Upgraded": 1,
    "Integration with Anganwadi Centers": 1,
    "Adequate Facilities": 1,
    "Safety Standards": 1,
    "Support for CWSN": 1,
    "Community Engagement": 1,
    "Co-location with Anganwadi Centers": 1,
    "Child Protection Policies": 1,
    "Curriculum Implementation": 1,
    "Qualified and Trained Teachers": 1,
    "Supportive Learning Environment": 1,
    "Governance and Management": 1,
    "Monitoring and Evaluation Practices": 1,
    "Management Structure": 1,
    "Infrastructure Quality": 1,
    "Support Systems": 1,
    "Financial Management": 1,
    "Positive Educational Outcomes": 1,
    "Research and Development Engagement": 1,
    "Student Learning Outcomes": 1,
    "Data Management and Reporting": 1
}

# Send POST request
response = requests.post(url, json=input_data)

# Calculate response size
response_size = len(response.content)

# Display response and size
print("Response JSON:", response.json())
print("Response Size (bytes):", response_size)




# Replace with your API endpoint
url = "https://synergy-ml-model.onrender.com/predict"  # Update with your deployment URL if hosted online

# Sample input data for the /predict endpoint
input_data = {
    "Initial Quality Score": 75,
    "Initial Enrollments": 300,
    "Resource Amount (₹)": 500000,
    "Total Months": 6,
    "Resource Type": "3"  # Represents Teaching Staff
}

# Send POST request
response = requests.post(url, json=input_data)

# Calculate response size
response_size = len(response.content)

# Display response and size
print("Response JSON:", response.json())
print("Response Size (bytes):", response_size)

