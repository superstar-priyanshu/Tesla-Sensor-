import joblib
import sys
import json
import os
import pandas as pd  # Import pandas

# Get the directory of the current script (backend directory)
script_dir = os.path.dirname(os.path.realpath(__file__))

# Define the path to failure_model.joblib in the ml-training directory
model_path = os.path.join(script_dir, '..', 'ml-training', 'failure_model.joblib')
model = joblib.load(model_path)

# Use a default value if no argument is provided
if len(sys.argv) > 1:
    data_json = sys.argv[1]
else:
    # Default data for testing
    data_json = '{"temperature": 25, "pressure": 1.2, "vibration": 0.6}'

data = json.loads(data_json)

# Create DataFrame with feature names
X = pd.DataFrame([data], columns=['temperature', 'pressure', 'vibration'])

# Make the prediction
prediction = model.predict(X)

# Output the prediction result
print(int(prediction[0]))
