import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import pickle
# import openai


# Load the trained model and scaler
with open('model.pkl', 'rb') as model_file:
    best_model = pickle.load(model_file)

with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

# Function to manually input data for the school
def manual_input():
    # Input data for each field (you can customize this with appropriate validation if needed)
    data = {
        'School ID': input("Enter School ID: "),
        'School Name': input("Enter School Name: "),
        'State': input("Enter State: "),
        'District': input("Enter District: "),
        'Block': input("Enter Block: "),
        'Rural/Urban': input("Enter Rural/Urban: "),
        'Cluster': input("Enter Cluster: "),
        'Village/City': input("Enter Village/City: "),
        'Pincode': input("Enter Pincode: "),
        'School Category': input("Enter School Category: "),
        'School Management': input("Enter School Management: "),
        'Medium of Instruction': input("Enter Medium of Instruction: "),
        'School Type': input("Enter School Type: "),
        'Total Teachers': int(input("Enter Total Teachers: ")),
        'Total Classrooms': int(input("Enter Total Classrooms: ")),
        'Total Students': int(input("Enter Total Students: ")),
        'Separate Room for HM': int(input("Enter Separate Room for HM (0/1): ")),
        'Lowest Class': int(input("Enter Lowest Class: ")),
        'Highest Class': int(input("Enter Highest Class: ")),
        'Boys Washrooms': int(input("Enter Boys Washrooms (0/1): ")),
        'Girls Washrooms': int(input("Enter Girls Washrooms (0/1): ")),
        'Boundary Wall': int(input("Enter Boundary Wall (0/1): ")),
        'Library Available': int(input("Enter Library Available (0/1): ")),
        'Drinking Water Available': int(input("Enter Drinking Water Available (0/1): ")),
        'Playground Available': int(input("Enter Playground Available (0/1): ")),
        'Electricity Availability': int(input("Enter Electricity Availability (0/1): ")),
        'Kitchens for Mid-Day Meal': int(input("Enter Kitchens for Mid-Day Meal (0/1): ")),
        'Eco-Friendly Construction (Rainwater Harvesting, Solar)': int(input("Enter Eco-Friendly Construction (Rainwater Harvesting, Solar) (0/1): ")),
        'Safety Standards Compliance (Earthquake, Fire)': int(input("Enter Safety Standards Compliance (0/1): ")),
        'Universal Access (Distance from habitation)': int(input("Enter Universal Access (0/1): ")),
        'Inclusive Environment (Ramp, Barrier-Free)': int(input("Enter Inclusive Environment (0/1): ")),
        'Transportation for Remote Areas': int(input("Enter Transportation for Remote Areas (0/1): ")),
        'Community Participation': int(input("Enter Community Participation (0/1): ")),
        'Qualified Teachers (RTE Act)': int(input("Enter Qualified Teachers (RTE Act) (0/1): ")),
        'ICT Integration (Computer Labs)': int(input("Enter ICT Integration (0/1): ")),
        'Vocational Training Availability': int(input("Enter Vocational Training Availability (0/1): ")),
        'Active School Management Committee (SMC)': int(input("Enter Active School Management Committee (0/1): ")),
        'Annual Maintenance (School Grants)': int(input("Enter Annual Maintenance (0/1): ")),
        'School Mapping (Geographic/Community Planning)': int(input("Enter School Mapping (0/1): ")),
        'Student Tracking (SDMIS)': int(input("Enter Student Tracking (0/1): ")),
        'Free and Compulsory Education': int(input("Enter Free and Compulsory Education (0/1): ")),
        'Non-Discrimination': int(input("Enter Non-Discrimination (0/1): ")),
        'No Punitive Practices': int(input("Enter No Punitive Practices (0/1): ")),
        'Timely Fund Utilization': int(input("Enter Timely Fund Utilization (0/1): ")),
        'Funds Audited Annually': int(input("Enter Funds Audited Annually (0/1): ")),
        'Resource Utilization Efficiency': int(input("Enter Resource Utilization Efficiency (0/1): ")),
        'Provision of Stipends for CWSN Girls': int(input("Enter Provision of Stipends for CWSN Girls (0/1): ")),
        'KGBV Upgraded': int(input("Enter KGBV Upgraded (0/1): ")),
        'Integration with Anganwadi Centers': int(input("Enter Integration with Anganwadi Centers (0/1): ")),
        'Curriculum Standards Adherence': int(input("Enter Curriculum Standards Adherence (0/1): ")),
        'Adequate Facilities': int(input("Enter Adequate Facilities (0/1): ")),
        'Safety Standards': int(input("Enter Safety Standards (0/1): ")),
        'Support for CWSN': int(input("Enter Support for CWSN (0/1): ")),
        'Community Engagement': int(input("Enter Community Engagement (0/1): ")),
        'Co-location with Anganwadi Centers': int(input("Enter Co-location with Anganwadi Centers (0/1): ")),
        'Child Protection Policies': int(input("Enter Child Protection Policies (0/1): ")),
        'Curriculum Implementation': int(input("Enter Curriculum Implementation (0/1): ")),
        'Qualified and Trained Teachers': int(input("Enter Qualified and Trained Teachers (0/1): ")),
        'Supportive Learning Environment': int(input("Enter Supportive Learning Environment (0/1): ")),
        'Governance and Management': int(input("Enter Governance and Management (0/1): ")),
        'Monitoring and Evaluation Practices': int(input("Enter Monitoring and Evaluation Practices (0/1): ")),
        'Management Structure': int(input("Enter Management Structure (0/1): ")),
        'Infrastructure Quality': int(input("Enter Infrastructure Quality (0/1): ")),
        'Support Systems': int(input("Enter Support Systems (0/1): ")),
        'Financial Management': int(input("Enter Financial Management (0/1): ")),
        'Positive Educational Outcomes': int(input("Enter Positive Educational Outcomes (0/1): ")),
        'Research and Development Engagement': int(input("Enter Research and Development Engagement (0/1): ")),
        'Student Learning Outcomes': int(input("Enter Student Learning Outcomes (0/1): ")),
        'Data Management and Reporting': int(input("Enter Data Management and Reporting (0/1): "))
    }
    
    return data

# Get user input
input_data = manual_input()

# Convert input data into a DataFrame
input_df = pd.DataFrame([input_data])

# Calculate 'Total/Students' and 'Total/Classroom' as required
input_df['Total/Students'] = input_df['Total Teachers'] / input_df['Total Students']
input_df['Total/Classroom'] = input_df['Total Classrooms'] / input_df['Total Students']

# List of features used for prediction
prediction_features = [
    'Lowest Class', 'Highest Class', 'Boys Washrooms', 'Girls Washrooms', 'Boundary Wall', 'Library Available', 
    'Drinking Water Available', 'Playground Available', 'Electricity Availability', 
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

# Select only the relevant features for prediction
input_df_for_prediction = input_df[prediction_features]

# Load scaler and transform the input data
input_scaled = scaler.transform(input_df_for_prediction)

# Predict the school rating using the trained model
predicted_rating = best_model.predict(input_scaled)

# Output the prediction
print(f"The predicted school rating is: {predicted_rating[0]}")

# Initialize the suggestions list
suggestions = []

# Add suggestions for each feature
# Initialize the suggestions list
suggestions = []

# Add suggestion for teacher/student ratio
if input_df['Total/Students'].iloc[0] < 0.025:
    suggestions.append("Consider hiring more teachers to improve the teacher-student ratio.")

# Add suggestion for total classrooms/classrooms per student ratio
if input_df['Total/Classroom'].iloc[0] < 0.02:
    suggestions.append("Consider increasing the number of classrooms for better space and learning environment.")

# Add suggestion for separate room for HM (Headmaster)
if input_df['Separate Room for HM'].iloc[0] == 0:
    suggestions.append("Consider providing a separate room for the Headmaster for better administration.")

# Add suggestion for lowest and highest class range
lowest_class = input_df['Lowest Class'].iloc[0]
highest_class = input_df['Highest Class'].iloc[0]

valid_class_combinations = [
    (1, 5), (1, 12), (1, 10), (1, 8), 
    (5, 8), (5, 10), (5, 8), (9, 10), 
    (11, 12)
]

if (lowest_class, highest_class) not in valid_class_combinations:
    suggestions.append("The combination of lowest and highest classes is non-standard. Please ensure the range is appropriate for your school's grade structure.")

# Add suggestions for facilities and features
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


# Print suggestions
print("Suggestions for improvement:")
for suggestion in suggestions:
    print(f"- {suggestion}")

if not suggestions:
    print("No suggestions for improvement.")


# import google.generativeai as genai

# # Function to interact with the chatbot about suggestions
# def chatbot_integration(suggestions):
#     # Configure API key for Google Generative AI
#     genai.configure(api_key="process.env.GEMINI_API_KEY")  # Replace with your actual API key

#     print("\nWelcome to the Suggestion Chatbot!")
#     print("You can ask questions about the suggestions provided.")

#     while True:
#         user_query = input("\nAsk a question about the suggestions or type 'exit' to quit: ").strip()

#         if user_query.lower() == "exit":
#             print("Thank you for using the Suggestion Chatbot! Goodbye!")
#             break
        
#         # Prompt generation based on suggestions and user query
#         suggestion_prompt = (
#             f"You are a chatbot expert on school structure standards and improvement under UDISE guidelines. "
#             f"Here are the suggestions provided to  school for improvement: {suggestions}. "
#             f"Answer the following user query of a school adminstrator who is provided with these suggestion. use words like your school, so it feels like u are taling to him about his school : {user_query}"

#             "this is samagra shiksha framework chapters summary for standard schools, use this in your answers. , dont mentions chapter nmber please in answers "
#             "CHAPTER 1  Introduction Education is a fundamental right and a key driver for social and economic development. It plays a crucial role in empowering individuals and communities. Education was primarily a state responsibility until the 1976 Constitutional Amendment, which made it a concurrent subject. The National Policy on Education (NPE) was introduced to address educational challenges and promote universal access. The NPE emphasizes the need for a holistic approach to education, focusing on quality, equity, and access. It laid the groundwork for various initiatives aimed at universalizing elementary education. The Right to Education (RTE) Act, 2009, mandates free and compulsory education for all children aged 6-14 years. It aims to eliminate barriers to education and ensure that every child has access to quality schooling. The Samagra Shiksha scheme aims to unify various existing educational programs (SSA, RMSA, TE) to create a cohesive framework. This integrated approach is designed to improve overall educational quality and learning outcomes."
#             "CHAPTER 2  School Access, Infrastructure Development and Retention The scheme aims to ensure that all children aged 4-18 years have access to education, with a special focus on reaching out to marginalized and disadvantaged groups. Schools must be equipped with adequate facilities, including classrooms, toilets, and safe drinking water. Infrastructure improvements are essential for creating a conducive learning environment. Implementation of the Student Data Management Information System (SDMIS) helps monitor student enrollment and retention. Regular tracking helps identify dropouts and implement timely interventions. Support is provided for establishing pre-school classes to prepare children for formal schooling, ensuring that elementary schools are accessible within specified distances to facilitate attendance. Initiatives to reduce dropout rates include counseling, mentorship programs, and community engagement, with a focus on creating a supportive environment that encourages students to stay in school."
#             "CHAPTER 3  Addressing Gender and Equity Issues in School Education This chapter emphasizes the need to address gender and social disparities in education, with strategies to promote equal opportunities for all children, regardless of gender or background. The RTE Act includes provisions for non-discrimination and inclusion of disadvantaged groups, encouraging schools to adopt practices that promote equity and inclusivity. Special measures to retain girls in school include scholarships, transportation support, and safe learning environments, along with gender-sensitive teaching practices and curricula. Efforts ensure that children from marginalized communities, including SC/ST and minority groups, have access to quality education, with targeted interventions to support these groups. Community engagement involves parents and communities in promoting gender equity and supporting children's education, alongside awareness campaigns to highlight the importance of education for all children."
#             "CHAPTER 4  Inclusion of Children with Special Needs in Education There is an emphasis on integrating children with disabilities into mainstream education settings to provide equal opportunities for all children to learn and thrive. Support services include aids, appliances, and resource support through special educators and trained personnel. Schools should have access to necessary resources to support children with special needs. Efforts focus on ensuring that children with special needs can access the curriculum effectively, with adaptations and modifications to teaching methods and materials. Partnerships between regular schools and special schools enhance support for children with disabilities by sharing resources and expertise. Teacher training and awareness programs for parents and communities promote understanding, acceptance, and support for inclusive education."
#             "CHAPTER 5  Quality Interventions Quality education encompasses multiple dimensions, including learning outcomes, teacher effectiveness, and school environment, requiring a holistic approach to improvement. School improvement plans are developed to enhance quality. Continuous professional development for teachers improves teaching practices and student learning outcomes, focusing on innovative teaching methods, classroom management, and subject-specific pedagogy. Initiatives to improve learning outcomes include remedial classes, after-school programs, and summer camps, with assessments to identify learning gaps and tailor interventions. Curriculum development emphasizes relevance and engagement, incorporating life skills, critical thinking, and problem-solving. Mechanisms for regular monitoring of educational quality and student performance inform decision-making and improve practices."
#             "CHAPTER 6  Teacher Education and Teacher Training The evolution of teacher education in India highlights key policies and reforms, recognizing the critical role teachers play in shaping educational outcomes. SCERTs are responsible for curriculum development and teacher training, while DIETs focus on pre-service and in-service training for teachers. Capacity-building initiatives improve the effectiveness of teacher training institutions through relevant modules aligned with current educational needs. In-service training programs keep teachers updated on new methodologies and technologies, offering peer learning and professional networks. Teacher performance is assessed using feedback from students, peers, and supervisors to inform professional development."
#             "CHAPTER 7  Information and Communication Technology (ICT) in School Education ICT is recognized as a powerful tool to enhance teaching and learning processes, facilitating access to information, improving engagement, and supporting personalized learning. Schools must be equipped with adequate ICT infrastructure, including computers, internet access, and multimedia resources, with investment in technology essential for effective integration. Training programs for teachers focus on integrating ICT into teaching practices, emphasizing digital literacy and the use of educational software and online resources. Quality digital content, including e-books, videos, and interactive modules, is developed in collaboration with content developers. Mechanisms to assess ICT's impact on teaching and learning outcomes use regular feedback from teachers and students to improve integration."
#             "CHAPTER 8  Vocationalisation of School Education The chapter emphasizes the importance of vocational education in enhancing employability and skill development, integrating vocational courses into the school curriculum to provide practical skills alongside academic knowledge. Vocational courses are offered alongside traditional subjects to create pathways for students to transition from school to training or employment. Partnerships with local industries provide hands-on training opportunities through internships and apprenticeship programs. Competencies acquired through vocational education are assessed and certified with clear criteria and standards. Awareness campaigns promote the value of vocational education, highlighting success stories of individuals who have benefited from vocational training."
#             "CHAPTER 9  Pre-school Education Early childhood education is critical for laying the foundation for lifelong learning, emphasizing holistic development, including cognitive, social, emotional, and physical growth. Developmentally appropriate practices focus on the interests and needs of young children, incorporating play-based and experiential learning activities. Pre-schools must provide safe and nurturing environments, with regular health check-ups and nutrition programs. Community involvement engages parents and communities in fostering a supportive environment for children, organizing workshops and training sessions to highlight the importance of early childhood education. Training for pre-school educators on child development, effective strategies, and inclusive environments is essential, with systems to monitor pre-school education quality and assess children's development."
#             "CHAPTER 10 Programme Management Effective management practices are critical for successful implementation of educational programs, with clear roles and responsibilities for stakeholders. Teachers, parents, and communities are involved in program management to ensure accountability and transparency through school management committees that facilitate local decision-making and resource allocation. Robust monitoring and evaluation mechanisms use data-driven approaches to assess program effectiveness and make necessary adjustments. Capacity-building initiatives train education officials and school leaders in effective program management practices, fostering leadership skills among school heads. Resource allocation ensures financial, human, and material resources are efficiently distributed, prioritizing areas requiring immediate attention. Collaboration with NGOs and private sector organizations leverages resources and expertise, while sustainability focuses on long-term planning and funding strategies. Feedback mechanisms establish channels for stakeholder input, regularly reviewing and updating policies and practices based on feedback."
            

#         )

#         try:
#             # Initialize the GenerativeModel with the model of choice
#             model = genai.GenerativeModel("gemini-1.5-flash")  # Using the gemini-1.5-flash model

#             # Generate response content based on the prompt
#             response = model.generate_content(suggestion_prompt)

#             # Output the text response
#             print("\nChatbot Response:")
#             print(response.text.strip())

#         except Exception as e:
#             print("Error while connecting to the chatbot service:", str(e))
#             break

# # Assuming 'suggestions' is populated with relevant data:
# if suggestions:
#     chatbot_integration(suggestions)
# else:
#     print("No suggestions available for chatbot interaction.")
