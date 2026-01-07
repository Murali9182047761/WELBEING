import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.metrics import classification_report, mean_squared_error
import joblib
import os

def train_models():
    # Load data
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'screen_time_wellness_data.csv')
    if not os.path.exists(data_path):
        print("Data file not found. Please run generate_data.py first.")
        return

    df = pd.read_csv(data_path)
    
    # Preprocessing
    # Encoders
    le_gender = LabelEncoder()
    df['Gender'] = le_gender.fit_transform(df['Gender'])
    
    # Features and Targets
    X = df[['Age', 'Gender', 'Work_Screen_Time', 'Social_Media_Hours', 'Gaming_Hours', 'Sleep_Hours', 'Physical_Activity_Hours']]
    y_reg = df['Mental_Wellness_Score']
    y_clf = df['Risk_Category']
    
    # Scaling
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Split
    X_train, X_test, y_reg_train, y_reg_test, y_clf_train, y_clf_test = train_test_split(
        X_scaled, y_reg, y_clf, test_size=0.2, random_state=42
    )
    
    # Train Regression Model
    print("Training Regression Model...")
    regressor = GradientBoostingRegressor(random_state=42)
    regressor.fit(X_train, y_reg_train)
    y_reg_pred = regressor.predict(X_test)
    mse = mean_squared_error(y_reg_test, y_reg_pred)
    print(f"Regression Mean Squared Error: {mse:.2f}")
    
    # Train Classification Model
    print("Training Classification Model...")
    classifier = RandomForestClassifier(random_state=42)
    classifier.fit(X_train, y_clf_train)
    y_clf_pred = classifier.predict(X_test)
    print("Classification Report:")
    print(classification_report(y_clf_test, y_clf_pred))
    
    # Save artifacts
    artifacts_dir = os.path.join(os.path.dirname(__file__), 'artifacts')
    os.makedirs(artifacts_dir, exist_ok=True)
    
    joblib.dump(regressor, os.path.join(artifacts_dir, 'wellness_regressor.pkl'))
    joblib.dump(classifier, os.path.join(artifacts_dir, 'risk_classifier.pkl'))
    joblib.dump(scaler, os.path.join(artifacts_dir, 'scaler.pkl'))
    joblib.dump(le_gender, os.path.join(artifacts_dir, 'encoder_gender.pkl'))
    
    print(f"Models saved to {artifacts_dir}")

if __name__ == "__main__":
    train_models()
