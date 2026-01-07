from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load Models
ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), 'artifacts')

try:
    regressor = joblib.load(os.path.join(ARTIFACTS_DIR, 'wellness_regressor.pkl'))
    classifier = joblib.load(os.path.join(ARTIFACTS_DIR, 'risk_classifier.pkl'))
    scaler = joblib.load(os.path.join(ARTIFACTS_DIR, 'scaler.pkl'))
    le_gender = joblib.load(os.path.join(ARTIFACTS_DIR, 'encoder_gender.pkl'))
    print("Models loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")
    regressor = None
    classifier = None
    scaler = None
    le_gender = None

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    if not regressor or not classifier:
        return jsonify({'error': 'Models not loaded'}), 500
        
    data = request.json
    
    try:
        # Extract features
        age = float(data.get('Age'))
        gender = data.get('Gender')
        work_screen = float(data.get('Work_Screen_Time'))
        social_screen = float(data.get('Social_Media_Hours'))
        gaming_screen = float(data.get('Gaming_Hours'))
        sleep = float(data.get('Sleep_Hours'))
        activity = float(data.get('Physical_Activity_Hours'))
        
        # Transformation
        # Handle gender encoding safely
        try:
            gender_encoded = le_gender.transform([gender])[0]
        except:
             # Fallback or error, assume default if unknown
             gender_encoded = 0 # e.g. Male or most common
        
        features = np.array([[age, gender_encoded, work_screen, social_screen, gaming_screen, sleep, activity]])
        features_scaled = scaler.transform(features)
        
        # Prediction
        wellness_score = regressor.predict(features_scaled)[0]
        risk_class = classifier.predict(features_scaled)[0]
        
        # Feature Importance Analysis (Simplified "What-if" Logic)
        # We can implement simple logic: "If you reduce social media by 1 hr, score improves by X"
        # For now, just return predictions
        
        return jsonify({
            'wellness_score': round(wellness_score, 1),
            'risk_category': risk_class,
            'message': f"Your predicted wellness score is {round(wellness_score, 1)} ({risk_class})."
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
