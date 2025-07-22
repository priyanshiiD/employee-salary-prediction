export interface Employee {
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

export interface ProcessedEmployee {
  yearsExperience: number;
  educationLevel: number;
  jobTitle: number;
  location: number;
  companySize: number;
  skillsCount: number;
  industry: number;
  workMode: number;
  salary: number;
}

export interface ModelMetrics {
  r2Score: number;
  mae: number;
  rmse: number;
  mape: number;
  accuracy: number;
}

export interface PredictionInput {
  yearsExperience: number;
  educationLevel: string;
  jobTitle: string;
  location: string;
  companySize: string;
  skills: string[];
  industry: string;
  workMode: string;
}

export interface ModelResult {
  name: string;
  metrics: ModelMetrics;
  predictions: number[];
  trained: boolean;
  trainingTime: number;
}

export interface DataStats {
  totalRecords: number;
  avgSalary: number;
  avgExperience: number;
  uniqueRoles: number;
  salaryRange: { min: number; max: number };
  topSkills: Array<{ skill: string; count: number }>;
}