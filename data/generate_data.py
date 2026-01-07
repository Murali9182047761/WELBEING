import pandas as pd
import numpy as np
import random

def generate_synthetic_data(num_samples=1000):
    np.random.seed(42)
    random.seed(42)

    data = []

    for _ in range(num_samples):
        age = random.randint(18, 60)
        gender = random.choice(['Male', 'Female', 'Other'])
        
        # Screen Usage
        work_screen_time = round(np.random.normal(5, 2), 1) # Mean 5 hours, std 2
        work_screen_time = max(0, work_screen_time)
        
        social_media_hours = round(np.random.normal(2, 1.5), 1)
        social_media_hours = max(0, social_media_hours)
        
        gaming_hours = round(np.random.exponential(1), 1) if random.random() > 0.5 else 0
        
        total_screen_time = work_screen_time + social_media_hours + gaming_hours
        
        # Lifestyle
        sleep_hours = round(np.random.normal(7, 1.5), 1)
        sleep_hours = max(3, min(12, sleep_hours))
        
        physical_activity_hours = round(np.random.exponential(0.5), 1)
        
        # Wellness Calculation (Synthetic Logic)
        # Base score 70
        wellness_score = 70 
        
        # Factors
        if total_screen_time > 10:
            wellness_score -= (total_screen_time - 10) * 2
        
        if social_media_hours > 3:
            wellness_score -= (social_media_hours - 3) * 3
            
        if sleep_hours < 6:
            wellness_score -= (6 - sleep_hours) * 5
        elif sleep_hours > 8:
            wellness_score += 2
            
        if physical_activity_hours > 0.5:
            wellness_score += physical_activity_hours * 5
            
        # Random noise
        wellness_score += np.random.normal(0, 5)
        
        # Clip
        wellness_score = max(0, min(100, wellness_score))
        
        # Risk Class
        if wellness_score >= 75:
            risk_category = 'Low Risk'
        elif wellness_score >= 50:
            risk_category = 'Moderate Risk'
        else:
            risk_category = 'High Risk'
            
        data.append({
            'Age': age,
            'Gender': gender,
            'Work_Screen_Time': work_screen_time,
            'Social_Media_Hours': social_media_hours,
            'Gaming_Hours': gaming_hours,
            'Total_Screen_Time': total_screen_time,
            'Sleep_Hours': sleep_hours,
            'Physical_Activity_Hours': physical_activity_hours,
            'Mental_Wellness_Score': round(wellness_score, 1),
            'Risk_Category': risk_category
        })
        
    df = pd.DataFrame(data)
    return df

if __name__ == "__main__":
    print("Generating synthetic data...")
    df = generate_synthetic_data(2000)
    save_path = "c:\\Users\\Murali\\Desktop\\HARSHA\\data\\screen_time_wellness_data.csv"
    df.to_csv(save_path, index=False)
    print(f"Data saved to {save_path}")
    print(df.head())
