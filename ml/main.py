# main.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os

MODEL_PATH = "models/diabetes_lightgbm.pkl" 
SCALER_DIABETES_PATH = "models/diabetes_scaler.pkl"
MODEL_HEART_PATH = "models/heart_lightgbm.pkl"  
SCALER_HEART_PATH = "models/heart_scaler.pkl"

diabetes_model = joblib.load(MODEL_PATH)
diabetes_scaler = joblib.load(SCALER_DIABETES_PATH)
heart_model = joblib.load(MODEL_HEART_PATH)
heart_scaler = joblib.load(SCALER_HEART_PATH)

#  Feature columns 
DIABETES_FEATURES = ['Age', 'Gender', 'Polyuria', 'Polydipsia', 'sudden weight loss',
                     'weakness', 'Polyphagia', 'Genital thrush', 'visual blurring',
                     'Itching', 'Irritability', 'delayed healing', 'partial paresis',
                     'muscle stiffness', 'Alopecia', 'Obesity', 'symptom_count',
                     'polyuria_polydipsia_interaction', 'age_obesity_interaction', 'age_gender_interaction']

DIABETES_NUMERIC = ['Age', 'symptom_count', 'age_obesity_interaction', 'age_gender_interaction']

HEART_FEATURES = ['Age', 'Sex', 'Cholesterol', 'Heart Rate', 'Smoking', 'Obesity',
                  'Alcohol Consumption', 'Exercise Hours Per Week', 'Diet_Healthy',
                  'Diet_Average', 'Diet_Unhealthy', 'systolic', 'diastolic', 'Diabetes',
                  'Family History', 'Previous Heart Problems', 'Medication Use', 'Stress Level',
                  'Sedentary Hours Per Day', 'Income', 'BMI', 'Triglycerides',
                  'Physical Activity Days Per Week', 'Sleep Hours Per Day', 'bp_mean',
                  'high_bp', 'cholesterol_ratio', 'age_bmi_interaction',
                  'stress_sedentary_interaction', 'bp_cholesterol_interaction']

HEART_NUMERIC = ['Age', 'Cholesterol', 'Heart Rate', 'systolic', 'diastolic', 'Stress Level',
                 'Sedentary Hours Per Day', 'Income', 'BMI', 'Triglycerides',
                 'Physical Activity Days Per Week', 'Sleep Hours Per Day', 'bp_mean',
                 'cholesterol_ratio', 'age_bmi_interaction', 'stress_sedentary_interaction',
                 'bp_cholesterol_interaction']

#  Pydantic model for input 
class PatientData(BaseModel):
    age: int
    gender: str
    height: float
    weight: float
    bloodPressure: str
    heartRate: int
    polydipsia: str
    polyuria: str
    fatigue: str
    smoking: str
    alcohol: str
    diet: str
    exercise_days: int
    sedentary_hours: int
    sleep: float
    stress: int
    family_history: str
    previous_heart_problems: str

#  FastAPI  
app = FastAPI(title="Health Risk Predictor")

@app.post("/predict/both")
def predict_both(data: PatientData):
    # Compute BMI
    bmi = data.weight / ((data.height / 100) ** 2)

    #  Prepare Diabetes Features 
    diabetes_dict = {
        'Age': data.age,
        'Gender': 1 if data.gender.lower() == 'male' else 0,
        'Polyuria': 1 if data.polyuria.lower() == 'yes' else 0,
        'Polydipsia': 1 if data.polydipsia.lower() == 'yes' else 0,
        'sudden weight loss': 1 if data.fatigue.lower() == 'yes' else 0,
        'weakness': 1 if data.fatigue.lower() == 'yes' else 0,
        'Polyphagia': 1 if data.fatigue.lower() == 'yes' else 0,
        'Genital thrush': 1 if data.smoking.lower() in ['yes','former'] else 0,
        'visual blurring': 1 if data.fatigue.lower() == 'yes' else 0,
        'Itching': 1 if data.smoking.lower() in ['yes','former'] else 0,
        'Irritability': 1 if data.stress > 7 else 0,
        'delayed healing': 1 if data.smoking.lower() in ['yes','former'] else 0,
        'partial paresis': 1 if data.fatigue.lower() == 'yes' else 0,
        'muscle stiffness': 1 if data.smoking.lower() in ['yes','former'] else 0,
        'Alopecia': 1 if data.smoking.lower() in ['yes','former'] else 0,
        'Obesity': 1 if bmi > 30 else 0,
    }
    # engineered features
    diabetes_dict['symptom_count'] = sum([diabetes_dict[f] for f in DIABETES_FEATURES if f not in ['Age','Obesity','age_obesity_interaction','age_gender_interaction','polyuria_polydipsia_interaction','symptom_count']])
    diabetes_dict['polyuria_polydipsia_interaction'] = diabetes_dict['Polyuria'] * diabetes_dict['Polydipsia']
    diabetes_dict['age_obesity_interaction'] = diabetes_dict['Age'] * diabetes_dict['Obesity']
    diabetes_dict['age_gender_interaction'] = diabetes_dict['Age'] * diabetes_dict['Gender']

    # Scale only numeric features
    diabetes_numeric_values = [diabetes_dict[f] for f in DIABETES_NUMERIC]
    diabetes_scaled_part = diabetes_scaler.transform([diabetes_numeric_values])
    for i, f in enumerate(DIABETES_NUMERIC):
        diabetes_dict[f] = diabetes_scaled_part[0][i]

    # Align features
    diabetes_features = [diabetes_dict.get(f, 0) for f in DIABETES_FEATURES]

    #   Heart Features 
    systolic, diastolic = map(float, data.bloodPressure.split('/'))
    heart_dict = {
        'Age': data.age,
        'Sex': 1 if data.gender.lower() == 'male' else 0,
        'Cholesterol': 262.91, 
        'Heart Rate': data.heartRate,
        'Smoking': 1 if data.smoking.lower() in ['yes','former'] else 0,
        'Obesity': 1 if bmi > 30 else 0,
        'Alcohol Consumption': 1 if data.alcohol.lower() != 'never' else 0,
        'Exercise Hours Per Week': data.exercise_days*2,
        'Diet_Healthy': 1 if data.diet.lower() == 'healthy' else 0,
        'Diet_Average': 1 if data.diet.lower() == 'average' else 0,
        'Diet_Unhealthy': 1 if data.diet.lower() in ['unhealthy','fast-food'] else 0,
        'systolic': systolic,
        'diastolic': diastolic,
        'Diabetes': 1 if data.polyuria.lower()=='yes' or data.polydipsia.lower()=='yes' else 0,
        'Family History': 1 if data.family_history.lower()=='yes' else 0,
        'Previous Heart Problems': 1 if data.previous_heart_problems.lower()=='yes' else 0,
        'Medication Use': 0,
        'Stress Level': data.stress,
        'Sedentary Hours Per Day': data.sedentary_hours,
        'Income': 100000,
        'BMI': bmi,
        'Triglycerides': 442.60,
        'Physical Activity Days Per Week': data.exercise_days,
        'Sleep Hours Per Day': data.sleep,
        'bp_mean': (systolic+diastolic)/2,
        'high_bp': 1 if systolic>140 or diastolic>90 else 0,
        'cholesterol_ratio': 262.91/442.60,
        'age_bmi_interaction': data.age*bmi,
        'stress_sedentary_interaction': data.stress*data.sedentary_hours,
        'bp_cholesterol_interaction': ((systolic+diastolic)/2)*262.91
    }

    # Scale numeric features
    heart_numeric_values = [heart_dict[f] for f in HEART_NUMERIC]
    heart_scaled_part = heart_scaler.transform([heart_numeric_values])
    for i, f in enumerate(HEART_NUMERIC):
        heart_dict[f] = heart_scaled_part[0][i]

    # Align features
    heart_features = [heart_dict.get(f, 0) for f in HEART_FEATURES]

    #  Predictions 
    diabetes_prob = diabetes_model.predict_proba([diabetes_features])[0][1]
    heart_prob = heart_model.predict_proba([heart_features])[0][1]

    # Format result
    result = {
        "diabetes": {
            "score": round(diabetes_prob*100, 2),
            "level": "Low" if diabetes_prob<0.3 else "Medium" if diabetes_prob<0.6 else "High"
        },
        "cvd": {
            "score": round(heart_prob*100, 2),
            "level": "Low" if heart_prob<0.3 else "Medium" if heart_prob<0.6 else "High"
        },
        "overall": {
            "score": round(max(diabetes_prob, heart_prob)*100,2),
            "level": "Low" if max(diabetes_prob, heart_prob)<0.3 else "Medium" if max(diabetes_prob, heart_prob)<0.6 else "High"
        }
    }

    return result