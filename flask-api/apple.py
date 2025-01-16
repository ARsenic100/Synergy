from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the saved model
model_filename = "multi_output_model.pkl"
multi_output_model = joblib.load(model_filename)
print(f"Model loaded from {model_filename}")

# Month names for output
month_names = [
    "Jan", "Feb", "March", "April", "May", "June",
    "July", "August", "Sept", "Oct", "Nov", "Dec"
]

# Predict function
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

if __name__ == '__main__':
    app.run(debug=True)
