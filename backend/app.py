from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import joblib
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Global variables to store models and data
models = {}
scaler = StandardScaler()
label_encoders = {}
feature_names = []
is_trained = False

# Sample dataset
SAMPLE_DATA = [
    {"id": 1, "yearsExperience": 2, "educationLevel": "Bachelor's", "jobTitle": "Software Engineer", "location": "Bangalore", "companySize": "Large", "skills": ["JavaScript", "React", "Node.js"], "salary": 800000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 2, "yearsExperience": 5, "educationLevel": "Master's", "jobTitle": "Senior Software Engineer", "location": "Hyderabad", "companySize": "Large", "skills": ["Python", "Django", "AWS", "Docker"], "salary": 1800000, "industry": "Technology", "workMode": "Remote"},
    {"id": 3, "yearsExperience": 1, "educationLevel": "Bachelor's", "jobTitle": "Junior Software Engineer", "location": "Pune", "companySize": "Medium", "skills": ["Java", "Spring Boot"], "salary": 600000, "industry": "Technology", "workMode": "Office"},
    {"id": 4, "yearsExperience": 8, "educationLevel": "Master's", "jobTitle": "Tech Lead", "location": "Mumbai", "companySize": "Large", "skills": ["Java", "Microservices", "Kubernetes", "Leadership"], "salary": 2800000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 5, "yearsExperience": 3, "educationLevel": "Bachelor's", "jobTitle": "Frontend Developer", "location": "Chennai", "companySize": "Medium", "skills": ["React", "TypeScript", "CSS"], "salary": 1200000, "industry": "Technology", "workMode": "Remote"},
    {"id": 6, "yearsExperience": 4, "educationLevel": "Master's", "jobTitle": "Data Scientist", "location": "Bangalore", "companySize": "Large", "skills": ["Python", "Machine Learning", "SQL", "Pandas"], "salary": 1600000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 7, "yearsExperience": 6, "educationLevel": "PhD", "jobTitle": "Senior Data Scientist", "location": "Delhi", "companySize": "Large", "skills": ["Python", "Deep Learning", "TensorFlow", "Statistics"], "salary": 2500000, "industry": "Technology", "workMode": "Remote"},
    {"id": 8, "yearsExperience": 2, "educationLevel": "Master's", "jobTitle": "Data Analyst", "location": "Kolkata", "companySize": "Medium", "skills": ["Python", "SQL", "Tableau"], "salary": 900000, "industry": "Finance", "workMode": "Office"},
    {"id": 9, "yearsExperience": 5, "educationLevel": "MBA", "jobTitle": "Product Manager", "location": "Bangalore", "companySize": "Large", "skills": ["Strategy", "Analytics", "Agile"], "salary": 2200000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 10, "yearsExperience": 3, "educationLevel": "Bachelor's", "jobTitle": "Associate Product Manager", "location": "Gurgaon", "companySize": "Medium", "skills": ["Product Strategy", "User Research"], "salary": 1400000, "industry": "E-commerce", "workMode": "Office"},
    {"id": 11, "yearsExperience": 4, "educationLevel": "Bachelor's", "jobTitle": "DevOps Engineer", "location": "Pune", "companySize": "Medium", "skills": ["AWS", "Docker", "Jenkins", "Terraform"], "salary": 1500000, "industry": "Technology", "workMode": "Remote"},
    {"id": 12, "yearsExperience": 6, "educationLevel": "Master's", "jobTitle": "Senior DevOps Engineer", "location": "Bangalore", "companySize": "Large", "skills": ["Kubernetes", "AWS", "CI/CD", "Monitoring"], "salary": 2300000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 13, "yearsExperience": 5, "educationLevel": "Master's", "jobTitle": "Software Engineer", "location": "San Francisco", "companySize": "Large", "skills": ["Python", "React", "AWS"], "salary": 9500000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 14, "yearsExperience": 3, "educationLevel": "Bachelor's", "jobTitle": "Software Engineer", "location": "London", "companySize": "Large", "skills": ["JavaScript", "Node.js", "MongoDB"], "salary": 4200000, "industry": "Technology", "workMode": "Remote"},
    {"id": 15, "yearsExperience": 4, "educationLevel": "Master's", "jobTitle": "Data Scientist", "location": "Toronto", "companySize": "Medium", "skills": ["Python", "ML", "SQL"], "salary": 5800000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 16, "yearsExperience": 7, "educationLevel": "Master's", "jobTitle": "Engineering Manager", "location": "Bangalore", "companySize": "Large", "skills": ["Leadership", "Java", "Architecture"], "salary": 3200000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 17, "yearsExperience": 2, "educationLevel": "Bachelor's", "jobTitle": "QA Engineer", "location": "Noida", "companySize": "Medium", "skills": ["Testing", "Selenium", "Java"], "salary": 700000, "industry": "Technology", "workMode": "Office"},
    {"id": 18, "yearsExperience": 4, "educationLevel": "Bachelor's", "jobTitle": "Backend Developer", "location": "Hyderabad", "companySize": "Large", "skills": ["Node.js", "MongoDB", "Express"], "salary": 1600000, "industry": "Technology", "workMode": "Remote"},
    {"id": 19, "yearsExperience": 6, "educationLevel": "Master's", "jobTitle": "Machine Learning Engineer", "location": "Mumbai", "companySize": "Large", "skills": ["Python", "TensorFlow", "MLOps"], "salary": 2400000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 20, "yearsExperience": 3, "educationLevel": "Bachelor's", "jobTitle": "Mobile Developer", "location": "Chennai", "companySize": "Medium", "skills": ["React Native", "Flutter", "Firebase"], "salary": 1300000, "industry": "Technology", "workMode": "Remote"},
    {"id": 21, "yearsExperience": 4, "educationLevel": "MBA", "jobTitle": "Business Analyst", "location": "Mumbai", "companySize": "Large", "skills": ["Excel", "SQL", "PowerBI"], "salary": 1800000, "industry": "Finance", "workMode": "Office"},
    {"id": 22, "yearsExperience": 6, "educationLevel": "Master's", "jobTitle": "Financial Analyst", "location": "Delhi", "companySize": "Large", "skills": ["Financial Modeling", "Excel", "Python"], "salary": 2000000, "industry": "Finance", "workMode": "Hybrid"},
    {"id": 23, "yearsExperience": 3, "educationLevel": "MBA", "jobTitle": "Management Consultant", "location": "Bangalore", "companySize": "Large", "skills": ["Strategy", "Analytics", "Presentation"], "salary": 2500000, "industry": "Consulting", "workMode": "Hybrid"},
    {"id": 24, "yearsExperience": 4, "educationLevel": "Bachelor's", "jobTitle": "UX Designer", "location": "Bangalore", "companySize": "Medium", "skills": ["Figma", "User Research", "Prototyping"], "salary": 1400000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 25, "yearsExperience": 5, "educationLevel": "Master's", "jobTitle": "Digital Marketing Manager", "location": "Mumbai", "companySize": "Large", "skills": ["SEO", "Google Ads", "Analytics"], "salary": 1600000, "industry": "E-commerce", "workMode": "Remote"},
    {"id": 26, "yearsExperience": 3, "educationLevel": "Bachelor's", "jobTitle": "Sales Executive", "location": "Delhi", "companySize": "Medium", "skills": ["CRM", "Communication", "Negotiation"], "salary": 800000, "industry": "Technology", "workMode": "Office"},
    {"id": 27, "yearsExperience": 6, "educationLevel": "MBA", "jobTitle": "Sales Manager", "location": "Mumbai", "companySize": "Large", "skills": ["Team Management", "Salesforce", "Strategy"], "salary": 2200000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 28, "yearsExperience": 8, "educationLevel": "Master's", "jobTitle": "Principal Engineer", "location": "Bangalore", "companySize": "Large", "skills": ["System Design", "Leadership", "Java"], "salary": 4000000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 29, "yearsExperience": 5, "educationLevel": "Bachelor's", "jobTitle": "Cloud Architect", "location": "Hyderabad", "companySize": "Large", "skills": ["AWS", "Azure", "Architecture"], "salary": 2800000, "industry": "Technology", "workMode": "Remote"},
    {"id": 30, "yearsExperience": 2, "educationLevel": "Master's", "jobTitle": "Research Engineer", "location": "Bangalore", "companySize": "Large", "skills": ["AI", "Research", "Python"], "salary": 1800000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 31, "yearsExperience": 4, "educationLevel": "Bachelor's", "jobTitle": "Full Stack Developer", "location": "Bangalore", "companySize": "Small", "skills": ["MERN Stack", "AWS", "Docker"], "salary": 1500000, "industry": "Technology", "workMode": "Remote"},
    {"id": 32, "yearsExperience": 7, "educationLevel": "Master's", "jobTitle": "CTO", "location": "Mumbai", "companySize": "Small", "skills": ["Leadership", "Architecture", "Strategy"], "salary": 5000000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 33, "yearsExperience": 3, "educationLevel": "Master's", "jobTitle": "Blockchain Developer", "location": "Pune", "companySize": "Medium", "skills": ["Solidity", "Web3", "Smart Contracts"], "salary": 2000000, "industry": "Technology", "workMode": "Remote"},
    {"id": 34, "yearsExperience": 4, "educationLevel": "Bachelor's", "jobTitle": "Cybersecurity Analyst", "location": "Chennai", "companySize": "Large", "skills": ["Security", "Penetration Testing", "CISSP"], "salary": 1800000, "industry": "Technology", "workMode": "Hybrid"},
    {"id": 35, "yearsExperience": 5, "educationLevel": "Master's", "jobTitle": "AI Engineer", "location": "Bangalore", "companySize": "Large", "skills": ["Deep Learning", "NLP", "Computer Vision"], "salary": 2600000, "industry": "Technology", "workMode": "Remote"}
]

def preprocess_data(data):
    """Preprocess the data for machine learning"""
    global label_encoders, feature_names
    
    df = pd.DataFrame(data)
    
    # Create features
    df['skillsCount'] = df['skills'].apply(len)
    
    # Categorical columns to encode
    categorical_columns = ['educationLevel', 'jobTitle', 'location', 'companySize', 'industry', 'workMode']
    
    # Initialize label encoders
    for col in categorical_columns:
        if col not in label_encoders:
            label_encoders[col] = LabelEncoder()
            df[col + '_encoded'] = label_encoders[col].fit_transform(df[col])
        else:
            df[col + '_encoded'] = label_encoders[col].transform(df[col])
    
    # Select features
    feature_columns = ['yearsExperience', 'skillsCount'] + [col + '_encoded' for col in categorical_columns]
    feature_names = feature_columns
    
    X = df[feature_columns]
    y = df['salary']
    
    return X, y, df

def calculate_metrics(y_true, y_pred):
    """Calculate various performance metrics"""
    r2 = r2_score(y_true, y_pred)
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    
    # MAPE calculation
    mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100
    
    # Accuracy (within 15% of actual)
    accuracy = np.mean(np.abs((y_true - y_pred) / y_true) <= 0.15)
    
    return {
        'r2Score': float(r2),
        'mae': float(mae),
        'rmse': float(rmse),
        'mape': float(mape),
        'accuracy': float(accuracy)
    }

@app.route('/api/data', methods=['GET'])
def get_data():
    """Get the sample dataset"""
    return jsonify(SAMPLE_DATA)

@app.route('/api/train', methods=['POST'])
def train_models():
    """Train all ML models"""
    global models, scaler, is_trained
    
    try:
        # Preprocess data
        X, y, df = preprocess_data(SAMPLE_DATA)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Initialize models
        model_configs = {
            'Linear Regression': LinearRegression(),
            'Polynomial Regression': Pipeline([
                ('poly', PolynomialFeatures(degree=2)),
                ('linear', LinearRegression())
            ]),
            'Neural Network': MLPRegressor(
                hidden_layer_sizes=(128, 64, 32, 16),
                activation='relu',
                solver='adam',
                alpha=0.001,
                batch_size=16,
                learning_rate_init=0.001,
                max_iter=500,
                random_state=42
            ),
            'Random Forest': RandomForestRegressor(
                n_estimators=15,
                max_depth=8,
                min_samples_split=3,
                random_state=42
            )
        }
        
        results = []
        
        # Train each model
        for name, model in model_configs.items():
            start_time = datetime.now()
            
            # Train model
            if name == 'Polynomial Regression':
                model.fit(X_train, y_train)
                y_pred = model.predict(X_test)
            else:
                model.fit(X_train_scaled, y_train)
                y_pred = model.predict(X_test_scaled)
            
            end_time = datetime.now()
            training_time = int((end_time - start_time).total_seconds() * 1000)
            
            # Calculate metrics
            metrics = calculate_metrics(y_test, y_pred)
            metrics['trainingTime'] = training_time
            
            # Store model
            models[name] = model
            
            results.append({
                'name': name,
                'metrics': metrics,
                'predictions': y_pred.tolist(),
                'trained': True,
                'trainingTime': training_time
            })
        
        is_trained = True
        return jsonify(results)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict_salary():
    """Predict salary for given input"""
    global models, scaler, label_encoders, is_trained
    
    if not is_trained:
        return jsonify({'error': 'Models not trained yet'}), 400
    
    try:
        data = request.json
        
        # Create a DataFrame with the input
        input_data = {
            'yearsExperience': data['yearsExperience'],
            'educationLevel': data['educationLevel'],
            'jobTitle': data['jobTitle'],
            'location': data['location'],
            'companySize': data['companySize'],
            'industry': data['industry'],
            'workMode': data['workMode'],
            'skills': data['skills'],
            'skillsCount': len(data['skills'])
        }
        
        df = pd.DataFrame([input_data])
        
        # Encode categorical variables
        categorical_columns = ['educationLevel', 'jobTitle', 'location', 'companySize', 'industry', 'workMode']
        
        for col in categorical_columns:
            try:
                df[col + '_encoded'] = label_encoders[col].transform(df[col])
            except ValueError:
                # Handle unseen categories
                df[col + '_encoded'] = 0
        
        # Select features
        feature_columns = ['yearsExperience', 'skillsCount'] + [col + '_encoded' for col in categorical_columns]
        X = df[feature_columns]
        
        # Scale features
        X_scaled = scaler.transform(X)
        
        # Get best model (highest R2 score)
        best_model_name = max(models.keys(), 
                            key=lambda k: calculate_metrics(
                                [1], [models[k].predict(X_scaled if k != 'Polynomial Regression' else X)[0]]
                            )['r2Score'] if hasattr(models[k], 'predict') else 0)
        
        best_model = models[best_model_name]
        
        # Make prediction
        if best_model_name == 'Polynomial Regression':
            prediction = best_model.predict(X)[0]
        else:
            prediction = best_model.predict(X_scaled)[0]
        
        return jsonify({
            'prediction': float(prediction),
            'bestModel': best_model_name
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/models/status', methods=['GET'])
def get_models_status():
    """Get training status of models"""
    return jsonify({
        'trained': is_trained,
        'models': list(models.keys()) if is_trained else []
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)