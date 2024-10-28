import joblib
import sys
import json
import os

# Get the directory of this script
script_dir = os.path.dirname(os.path.realpath(__file__))

# Load the model from the same directory as this script
model_path = os.path.join(script_dir, 'failure_model.joblib')
model = joblib.load(model_path)

# Retrieve the data passed from server.js
data_json = sys.argv[1]
data = json.loads(data_json)
X = [[data['temperature'], data['pressure'], data['vibration']]]

# Make the prediction
prediction = model.predict(X)

# Output the prediction result
print(int(prediction[0]))
