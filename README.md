# 🚀 Employee Salary Prediction ML Project

A comprehensive machine learning application that predicts employee salaries using multiple Python ML algorithms, with a React TypeScript frontend and Python Flask backend.

[Live Demo](https://cheery-douhua-d8d335.netlify.app/)

## 🎯 Features

### 🤖 Machine Learning Models
- **Linear Regression** - scikit-learn LinearRegression
- **Polynomial Regression** - scikit-learn Pipeline with PolynomialFeatures
- **Neural Network** - scikit-learn MLPRegressor (128→64→32→16 architecture)
- **Random Forest** - scikit-learn RandomForestRegressor with 15 estimators

### 📊 Data Analytics
- **Interactive Visualizations** - Salary distributions, experience correlations
- **Real-time Charts** - Built with Chart.js and React-ChartJS-2
- **Comprehensive Metrics** - R², MAE, RMSE, MAPE, and accuracy scores
- **Indian Context** - Realistic salary data in INR with Indian cities

### 🎨 Modern UI/UX
- **Professional Design** - Clean, modern interface
- **Responsive Layout** - Mobile-first approach
- **Smooth Animations** - Micro-interactions and transitions
- **Real-time Feedback** - Progress indicators and loading states

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server

### Backend (Python)
- **Flask** - Web framework for API
- **scikit-learn** - Machine learning algorithms
- **pandas** - Data manipulation and analysis
- **numpy** - Numerical computing
- **Flask-CORS** - Cross-origin resource sharing

### Data Visualization
- **Chart.js** - Interactive charts
- **React-ChartJS-2** - React integration
- **Lucide React** - Beautiful icons

## 📈 Dataset

- **35 realistic employee records** with Indian tech industry context
- **8 input features**: Experience, Education, Job Title, Location, Company Size, Skills, Industry, Work Mode
- **Indian cities**: Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, and more
- **Salary range**: ₹6L to ₹50L+ based on realistic market data

## 🚀 Getting Started

### Prerequisites
- **Node.js 16+** and npm/yarn
- **Python 3.8+** and pip

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/salary-prediction-ml.git
cd salary-prediction-ml
```

2. **Setup Python Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

3. **Setup React Frontend** (in a new terminal)
```bash
cd ..  # Back to root directory
npm install
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

**Important**: Make sure both the Python backend (port 5000) and React frontend (port 5173) are running!

## 📱 How to Use

1. **Explore Data** - View interactive charts and salary analytics
2. **Train Models** - Click "Start Training" to train all 4 ML algorithms
3. **Make Predictions** - Fill in employee details and get instant salary predictions
4. **Compare Results** - See performance metrics for each model

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── DataVisualization.tsx
│   ├── ModelTraining.tsx
│   └── PredictionInterface.tsx
├── services/           # API service for backend communication
│   └── api.ts
├── data/               # Dataset and sample data
│   └── sampleData.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── dataProcessing.ts
│   └── models.ts       # (Legacy - now using Python backend)
├── App.tsx            # Main application component
└── backend/           # Python Flask backend
    ├── app.py         # Main Flask application
    ├── requirements.txt
    └── README.md
```

## 🤖 ML Pipeline

### Data Preprocessing
- **pandas DataFrame** processing
- **LabelEncoder** for categorical variables
- **StandardScaler** for feature normalization
- **train_test_split** (80/20) with random state

### Model Training
- **scikit-learn** model training
- **Real-time API** communication
- **Performance metrics** calculation
- **Model persistence** with joblib

### Prediction
- **RESTful API** for predictions
- **Best model selection** based on R² score
- **Real-time salary estimation**

## 📊 Performance Metrics

Each model is evaluated using:
- **R² Score** - Coefficient of determination
- **MAE** - Mean Absolute Error
- **RMSE** - Root Mean Square Error
- **MAPE** - Mean Absolute Percentage Error
- **Accuracy** - Predictions within 15% of actual

## 🌟 Key Highlights

- **Python ML Backend** - Professional scikit-learn implementation
- **RESTful API** - Clean separation between frontend and ML logic
- **Indian Context** - Realistic salary data for Indian tech industry
- **Type-safe** - Full TypeScript implementation
- **Responsive** - Works on desktop, tablet, and mobile
- **Professional UI** - Production-ready design

## 🔧 API Endpoints

- `GET /api/data` - Get sample dataset
- `POST /api/train` - Train all ML models
- `POST /api/predict` - Predict salary for given input
- `GET /api/models/status` - Get training status

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
- **Frontend**: Deploy to Netlify, Vercel, or GitHub Pages
- **Backend**: Deploy to Heroku, Railway, or any Python hosting service

**Note**: Update the `API_BASE_URL` in `src/services/api.ts` to point to your deployed backend.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- scikit-learn team for excellent ML library
- Flask team for lightweight web framework
- Chart.js for beautiful data visualizations
- Tailwind CSS for rapid UI development
- Indian tech community for salary insights