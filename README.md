# 🚀 Employee Salary Prediction ML Project

A comprehensive machine learning application that predicts employee salaries using multiple ML algorithms, built with React, TypeScript, and TensorFlow.js.

![Project Preview](https://via.placeholder.com/800x400/10b981/ffffff?text=SalaryPredict+AI)

## 🎯 Features

### 🤖 Machine Learning Models
- **Linear Regression** - Statistical baseline with gradient descent
- **Polynomial Regression** - Captures non-linear relationships
- **Neural Network** - Deep learning with TensorFlow.js (5-layer architecture)
- **Random Forest** - Ensemble method with 15 decision trees

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

### Machine Learning
- **TensorFlow.js** - Neural networks in the browser
- **ML-Matrix** - Matrix operations
- **ML-Regression** - Linear and polynomial regression
- **Custom Algorithms** - Hand-built Random Forest implementation

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
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/salary-prediction-ml.git
cd salary-prediction-ml
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

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
├── data/               # Dataset and sample data
│   └── sampleData.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions and ML models
│   ├── dataProcessing.ts
│   └── models.ts
└── App.tsx            # Main application component
```

## 🤖 ML Pipeline

### Data Preprocessing
- Categorical encoding for education, job titles, locations
- Feature normalization using Z-score standardization
- Train/test split (80/20) with data shuffling

### Model Training
- Real-time training with progress indicators
- Cross-validation for model evaluation
- Performance metrics calculation

### Prediction
- Best model selection based on R² score
- Confidence intervals for predictions
- Real-time salary estimation

## 📊 Performance Metrics

Each model is evaluated using:
- **R² Score** - Coefficient of determination
- **MAE** - Mean Absolute Error
- **RMSE** - Root Mean Square Error
- **MAPE** - Mean Absolute Percentage Error
- **Accuracy** - Predictions within 15% of actual

## 🌟 Key Highlights

- **Browser-based ML** - No server required, runs entirely in browser
- **Indian Context** - Realistic salary data for Indian tech industry
- **Type-safe** - Full TypeScript implementation
- **Responsive** - Works on desktop, tablet, and mobile
- **Professional UI** - Production-ready design

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
The project is optimized for static hosting platforms like Netlify, Vercel, or GitHub Pages.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TensorFlow.js team for browser-based ML capabilities
- Chart.js for beautiful data visualizations
- Tailwind CSS for rapid UI development
- Indian tech community for salary insights

## 📞 Contact

Your Name - [@yourusername](https://twitter.com/yourusername) - your.email@example.com

Project Link: [https://github.com/yourusername/salary-prediction-ml](https://github.com/yourusername/salary-prediction-ml)

---

⭐ **Star this repository if you found it helpful!**