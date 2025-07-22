import React, { useState } from 'react';
import { Play, CheckCircle, AlertCircle, Zap, Brain, BarChart3, Network, Clock, Target } from 'lucide-react';
import { Employee, ModelResult } from '../types';
import { apiService } from '../services/api';

interface ModelTrainingProps {
  data: Employee[];
  onModelsUpdate: (models: ModelResult[]) => void;
}

export default function ModelTraining({ data, onModelsUpdate }: ModelTrainingProps) {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [currentModel, setCurrentModel] = useState('');
  const [models, setModels] = useState<ModelResult[]>([
    { name: 'Linear Regression', metrics: { r2Score: 0, mae: 0, rmse: 0, mape: 0, accuracy: 0 }, predictions: [], trained: false, trainingTime: 0 },
    { name: 'Polynomial Regression', metrics: { r2Score: 0, mae: 0, rmse: 0, mape: 0, accuracy: 0 }, predictions: [], trained: false, trainingTime: 0 },
    { name: 'Neural Network', metrics: { r2Score: 0, mae: 0, rmse: 0, mape: 0, accuracy: 0 }, predictions: [], trained: false, trainingTime: 0 },
    { name: 'Random Forest', metrics: { r2Score: 0, mae: 0, rmse: 0, mape: 0, accuracy: 0 }, predictions: [], trained: false, trainingTime: 0 },
  ]);

  const trainModels = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setCurrentModel('Initializing...');

    try {
      setCurrentModel('Training Python ML Models...');
      setTrainingProgress(25);
      
      // Call Python backend to train models
      const trainedModels = await apiService.trainModels();
      
      // Convert API response to our format
      const updatedModels: ModelResult[] = trainedModels.map(model => ({
        name: model.name,
        metrics: {
          r2Score: model.metrics.r2Score,
          mae: model.metrics.mae,
          rmse: model.metrics.rmse,
          mape: model.metrics.mape,
          accuracy: model.metrics.accuracy
        },
        predictions: model.predictions,
        trained: model.trained,
        trainingTime: model.trainingTime
      }));
      
      // Simulate progress updates
      for (let i = 0; i < updatedModels.length; i++) {
        setCurrentModel(updatedModels[i].name);
        setTrainingProgress(25 + (i + 1) * (75 / updatedModels.length));
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setTrainingProgress(100);
      setModels(updatedModels);
      onModelsUpdate(updatedModels);
    } catch (error) {
      console.error('Training error:', error);
      alert('Error training models. Make sure the Python backend is running on http://localhost:5000');
    } finally {
      setIsTraining(false);
      setCurrentModel('');
    }
  };

  const getModelIcon = (modelName: string) => {
    switch (modelName) {
      case 'Linear Regression':
        return <BarChart3 className="w-6 h-6" />;
      case 'Polynomial Regression':
        return <Zap className="w-6 h-6" />;
      case 'Neural Network':
        return <Brain className="w-6 h-6" />;
      case 'Random Forest':
        return <Network className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-emerald-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 0.9) return 'Excellent';
    if (score >= 0.8) return 'Very Good';
    if (score >= 0.6) return 'Good';
    if (score >= 0.4) return 'Fair';
    return 'Poor';
  };

  const formatMetric = (value: number, isPercentage: boolean = false) => {
    if (isPercentage) {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const bestModel = models.reduce((best, current) => 
    current.metrics.r2Score > best.metrics.r2Score ? current : best,
    models[0]
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Model Training Center</h2>
            <p className="text-gray-600 mt-1">Train and compare multiple ML algorithms</p>
          </div>
        </div>
        <button
          onClick={trainModels}
          disabled={isTraining}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl hover:from-emerald-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          <Play className="w-5 h-5 mr-2" />
          {isTraining ? 'Training Models...' : 'Start Training'}
        </button>
      </div>

      {isTraining && (
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mr-3"></div>
            <span className="text-lg font-semibold text-gray-700">
              {currentModel}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${trainingProgress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-2 flex justify-between">
            <span>Progress: {Math.round(trainingProgress)}%</span>
            <span>Python ML Backend</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((model, index) => (
          <div
            key={model.name}
            className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-lg ${
              model.trained
                ? 'border-emerald-200 shadow-md'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl mr-3 ${
                  model.trained ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {getModelIcon(model.name)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{model.name}</h3>
                  {model.trained && (
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {model.trainingTime}ms
                    </div>
                  )}
                </div>
              </div>
              {model.trained ? (
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-gray-400" />
              )}
            </div>

            {model.trained ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">R² Score:</span>
                      <span className={`font-bold ${getScoreColor(model.metrics.r2Score)}`}>
                        {formatMetric(model.metrics.r2Score, true)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Accuracy:</span>
                      <span className={`font-bold ${getScoreColor(model.metrics.accuracy)}`}>
                        {formatMetric(model.metrics.accuracy, true)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">MAE:</span>
                      <span className="font-semibold text-gray-800">
                        ₹{formatMetric(model.metrics.mae)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">MAPE:</span>
                      <span className="font-semibold text-gray-800">
                        {model.metrics.mape.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Performance indicator */}
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Performance Rating:</span>
                    <span className={`text-sm font-bold ${getScoreColor(model.metrics.r2Score)}`}>
                      {getPerformanceLabel(model.metrics.r2Score)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        model.metrics.r2Score >= 0.8
                          ? 'bg-emerald-500'
                          : model.metrics.r2Score >= 0.6
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(model.metrics.r2Score * 100, 5)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <div className="text-gray-400 mb-2 font-medium">Model not trained</div>
                <div className="text-sm text-gray-500">
                  Click "Start Training" to begin
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {models.some(m => m.trained) && (
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl p-6 border border-emerald-200">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Training Complete!</h3>
          </div>
          <p className="text-gray-600 mb-4">
            All models have been trained successfully. You can now use the prediction interface 
            to make salary predictions with the best performing model.
          </p>
          <div className="bg-white rounded-lg p-4 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Best Performing Model:</span>
                <div className="text-lg font-bold text-emerald-600">{bestModel.name}</div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-700">R² Score:</span>
                <div className="text-lg font-bold text-emerald-600">
                  {formatMetric(bestModel.metrics.r2Score, true)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}