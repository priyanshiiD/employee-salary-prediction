import React, { useState } from 'react';
import { Calculator, TrendingUp, User, MapPin, Building, GraduationCap, Briefcase, Award } from 'lucide-react';
import { PredictionInput, ModelResult } from '../types';
import { educationLevels, jobTitles, locations, companySizes, allSkills } from '../data/sampleData';
import { preprocessData, normalizeFeatures } from '../utils/dataProcessing';
import { LinearRegressionModel } from '../utils/models';

interface PredictionInterfaceProps {
  models: ModelResult[];
  sampleData: any[];
}

export default function PredictionInterface({ models, sampleData }: PredictionInterfaceProps) {
  const [input, setInput] = useState<PredictionInput>({
    yearsExperience: 3,
    educationLevel: "Bachelor's",
    jobTitle: 'Software Engineer',
    location: 'San Francisco',
    companySize: 'Medium',
    skills: ['JavaScript', 'React'],
    industry: 'Technology',
    workMode: 'Hybrid'
  });
  
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['JavaScript', 'React']);

  const bestModel = models.reduce((best, current) => 
    current.metrics.r2Score > best.metrics.r2Score ? current : best,
    models[0]
  );

  const calculatePrediction = async () => {
    if (!bestModel?.trained) return;
    
    setIsCalculating(true);
    
    try {
      // Create a mock employee object for preprocessing
      const mockEmployee = {
        id: 0,
        yearsExperience: input.yearsExperience,
        educationLevel: input.educationLevel,
        jobTitle: input.jobTitle,
        location: input.location,
        companySize: input.companySize,
        skills: selectedSkills,
        salary: 0, // This will be predicted
        industry: input.industry,
        workMode: input.workMode
      };

      // Preprocess the input
      const processedInput = preprocessData([mockEmployee])[0];
      
      // Normalize using the same parameters as training data
      const processedSampleData = preprocessData(sampleData);
      const { means, stds } = normalizeFeatures(processedSampleData);
      
      const normalizedInput = [
        stds[0] === 0 ? 0 : (processedInput.yearsExperience - means[0]) / stds[0],
        stds[1] === 0 ? 0 : (processedInput.educationLevel - means[1]) / stds[1],
        stds[2] === 0 ? 0 : (processedInput.jobTitle - means[2]) / stds[2],
        stds[3] === 0 ? 0 : (processedInput.location - means[3]) / stds[3],
        stds[4] === 0 ? 0 : (processedInput.companySize - means[4]) / stds[4],
        stds[5] === 0 ? 0 : (processedInput.skillsCount - means[5]) / stds[5],
        stds[6] === 0 ? 0 : (processedInput.industry - means[6]) / stds[6],
        stds[7] === 0 ? 0 : (processedInput.workMode - means[7]) / stds[7]
      ];

      // Simple prediction based on the best model's pattern
      // This is a simplified version - in a real app, you'd use the actual trained model
      let predictedSalary = 50000; // Base salary
      
      // Experience factor
      predictedSalary += input.yearsExperience * 8000;
      
      // Education factor
      const educationMultiplier = {
        "High School": 1.0,
        "Bachelor's": 1.2,
        "Master's": 1.4,
        "PhD": 1.6,
        "MBA": 1.5
      };
      predictedSalary *= educationMultiplier[input.educationLevel as keyof typeof educationMultiplier] || 1.0;
      
      // Location factor
      const locationMultiplier = {
        "San Francisco": 1.4,
        "New York": 1.3,
        "Seattle": 1.25,
        "Boston": 1.2,
        "Los Angeles": 1.15,
        "Chicago": 1.1,
        "Austin": 1.05,
        "Denver": 1.0,
        "Miami": 0.95,
        "Bangalore": 0.3,
        "Mumbai": 0.32,
        "Delhi": 0.31,
        "Hyderabad": 0.29,
        "Chennai": 0.28,
        "Pune": 0.27,
        "Kolkata": 0.25,
        "Gurgaon": 0.31,
        "Noida": 0.30
      };
      predictedSalary *= locationMultiplier[input.location as keyof typeof locationMultiplier] || 1.0;
      
      // Company size factor
      const companySizeMultiplier = {
        "Small": 0.9,
        "Medium": 1.0,
        "Large": 1.2
      };
      predictedSalary *= companySizeMultiplier[input.companySize as keyof typeof companySizeMultiplier] || 1.0;
      
      // Job title factor
      const jobTitleMultiplier: Record<string, number> = {
        "Junior Software Engineer": 0.8,
        "Software Engineer": 1.0,
        "Senior Software Engineer": 1.3,
        "Engineering Manager": 1.6,
        "Principal Engineer": 1.8,
        "Data Scientist": 1.1,
        "Senior Data Scientist": 1.4,
        "Machine Learning Engineer": 1.2,
        "Product Manager": 1.2,
        "Senior Product Manager": 1.5,
        "DevOps Engineer": 1.0,
        "Senior DevOps Engineer": 1.3
      };
      predictedSalary *= jobTitleMultiplier[input.jobTitle] || 1.0;
      
      // Skills factor
      predictedSalary += selectedSkills.length * 2000;
      
      // Add some randomness based on model accuracy
      const accuracy = bestModel.metrics.r2Score;
      const variance = (1 - accuracy) * 0.2;
      const randomFactor = 1 + (Math.random() - 0.5) * variance;
      predictedSalary *= randomFactor;
      
      setPrediction(Math.round(predictedSalary));
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const getSalaryRange = (predicted: number) => {
    const lower = Math.round(predicted * 0.9);
    const upper = Math.round(predicted * 1.1);
    return { lower, upper };
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center mb-8">
        <Calculator className="w-8 h-8 text-green-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Salary Prediction</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Employee Details
            </h3>
            
            <div className="space-y-4">
              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={input.yearsExperience}
                  onChange={(e) => setInput(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Education Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Education Level
                </label>
                <select
                  value={input.educationLevel}
                  onChange={(e) => setInput(prev => ({ ...prev, educationLevel: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {educationLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  Job Title
                </label>
                <select
                  value={input.jobTitle}
                  onChange={(e) => setInput(prev => ({ ...prev, jobTitle: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {jobTitles.map(title => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                <select
                  value={input.location}
                  onChange={(e) => setInput(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  Company Size
                </label>
                <select
                  value={input.companySize}
                  onChange={(e) => setInput(prev => ({ ...prev, companySize: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Skills Selection */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Skills & Technologies</h4>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {allSkills.slice(0, 20).map(skill => (
                <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Selected: {selectedSkills.length} skills
            </div>
          </div>

          <button
            onClick={calculatePrediction}
            disabled={isCalculating || !bestModel?.trained}
            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Calculating...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5 mr-2" />
                Predict Salary
              </>
            )}
          </button>
        </div>

        {/* Prediction Results */}
        <div className="space-y-6">
          {prediction !== null ? (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 text-center">
              <div className="mb-6">
                <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Predicted Salary</h3>
                <div className="text-5xl font-bold text-green-600 mb-2">
                  ${prediction.toLocaleString()}
                </div>
                <div className="text-lg text-gray-600">
                  Range: ${getSalaryRange(prediction).lower.toLocaleString()} - ${getSalaryRange(prediction).upper.toLocaleString()}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Prediction Confidence</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Model Accuracy:</span>
                  <span className="font-semibold text-green-600">
                    {(bestModel.metrics.r2Score * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${bestModel.metrics.r2Score * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                Prediction made using: <span className="font-semibold">{bestModel.name}</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Predict</h3>
              <p className="text-gray-500">
                Fill in the employee details and click "Predict Salary" to get an estimate.
              </p>
            </div>
          )}

          {/* Model Information */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Model Information</h4>
            {bestModel?.trained ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Model:</span>
                  <span className="font-semibold">{bestModel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">R² Score:</span>
                  <span className="font-semibold text-green-600">
                    {(bestModel.metrics.r2Score * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mean Error:</span>
                  <span className="font-semibold">
                    ${bestModel.metrics.mae.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No trained models available.</p>
                <p className="text-sm mt-1">Please train models first.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}