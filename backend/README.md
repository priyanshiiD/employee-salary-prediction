# Python ML Backend

This is the Python backend for the Employee Salary Prediction ML project.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

The server will run on `http://localhost:5000`

## API Endpoints

- `GET /api/data` - Get sample dataset
- `POST /api/train` - Train all ML models
- `POST /api/predict` - Predict salary for given input
- `GET /api/models/status` - Get training status

## ML Models

1. **Linear Regression** - scikit-learn LinearRegression
2. **Polynomial Regression** - scikit-learn Pipeline with PolynomialFeatures
3. **Neural Network** - scikit-learn MLPRegressor
4. **Random Forest** - scikit-learn RandomForestRegressor

## Features

- Data preprocessing with pandas
- Feature encoding and scaling
- Model training and evaluation
- Performance metrics calculation
- RESTful API with Flask