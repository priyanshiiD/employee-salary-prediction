const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ApiEmployee {
  id: number;
  yearsExperience: number;
  educationLevel: string;
  jobTitle: string;
  location: string;
  companySize: string;
  skills: string[];
  salary: number;
  industry: string;
  workMode: string;
}

export interface ApiModelResult {
  name: string;
  metrics: {
    r2Score: number;
    mae: number;
    rmse: number;
    mape: number;
    accuracy: number;
    trainingTime: number;
  };
  predictions: number[];
  trained: boolean;
  trainingTime: number;
}

export interface PredictionRequest {
  yearsExperience: number;
  educationLevel: string;
  jobTitle: string;
  location: string;
  companySize: string;
  skills: string[];
  industry: string;
  workMode: string;
}

export interface PredictionResponse {
  prediction: number;
  bestModel: string;
}

class ApiService {
  async getData(): Promise<ApiEmployee[]> {
    const response = await fetch(`${API_BASE_URL}/data`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }

  async trainModels(): Promise<ApiModelResult[]> {
    const response = await fetch(`${API_BASE_URL}/train`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to train models');
    }
    
    return response.json();
  }

  async predictSalary(data: PredictionRequest): Promise<PredictionResponse> {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to predict salary');
    }
    
    return response.json();
  }

  async getModelsStatus(): Promise<{ trained: boolean; models: string[] }> {
    const response = await fetch(`${API_BASE_URL}/models/status`);
    if (!response.ok) {
      throw new Error('Failed to get models status');
    }
    return response.json();
  }
}

export const apiService = new ApiService();