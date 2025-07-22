import React, { useState } from 'react';
import Header from './components/Header';
import DataVisualization from './components/DataVisualization';
import ModelTraining from './components/ModelTraining';
import PredictionInterface from './components/PredictionInterface';
import { sampleEmployeeData } from './data/sampleData';
import { ModelResult } from './types';

function App() {
  const [models, setModels] = useState<ModelResult[]>([
    { name: 'Linear Regression', metrics: { r2Score: 0, mae: 0, rmse: 0, mape: 0, accuracy: 0 }, predictions: [], trained: false, trainingTime: 0 },
    { name: 'Polynomial Regression', metrics: { r2Score: 0, mae: 0, rmse: 0, mape: 0, accuracy: 0 }, predictions: [], trained: false, trainingTime: 0 },
    { name: 'Neural Network', metrics: { r2Score: 0, mae: 0, rmse: 0, mape: 0, accuracy: 0 }, predictions: [], trained: false, trainingTime: 0 },
    { name: 'Random Forest', metrics: { r2Score: 0, mae: 0, rmse: 0, mape: 0, accuracy: 0 }, predictions: [], trained: false, trainingTime: 0 },
  ]);

  const handleModelsUpdate = (updatedModels: ModelResult[]) => {
    setModels(updatedModels);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Data Visualization Section */}
        <DataVisualization data={sampleEmployeeData} />
        
        {/* Model Training Section */}
        <ModelTraining 
          data={sampleEmployeeData} 
          onModelsUpdate={handleModelsUpdate}
        />
        
        {/* Prediction Interface Section */}
        <PredictionInterface 
          models={models}
          sampleData={sampleEmployeeData}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3"></div>
            <span className="text-xl font-bold">ML Salary Predictor</span>
          </div>
          <p className="text-gray-400 mb-4">
            Advanced machine learning for accurate salary predictions
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>• 4 ML Algorithms</span>
            <span>• Real-time Training</span>
            <span>• Interactive Predictions</span>
            <span>• Data Visualization</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;