import { Employee, ProcessedEmployee, DataStats } from '../types';
import { educationLevels, jobTitles, locations, companySizes, industries, workModes } from '../data/sampleData';

export function preprocessData(data: Employee[]): ProcessedEmployee[] {
  return data.map(employee => ({
    yearsExperience: employee.yearsExperience,
    educationLevel: educationLevels.indexOf(employee.educationLevel),
    jobTitle: jobTitles.indexOf(employee.jobTitle),
    location: locations.indexOf(employee.location),
    companySize: companySizes.indexOf(employee.companySize),
    skillsCount: employee.skills.length,
    industry: industries.indexOf(employee.industry),
    workMode: workModes.indexOf(employee.workMode),
    salary: employee.salary
  }));
}

export function normalizeFeatures(data: ProcessedEmployee[]): { 
  normalized: number[][], 
  means: number[], 
  stds: number[] 
} {
  const features = data.map(d => [
    d.yearsExperience,
    d.educationLevel,
    d.jobTitle,
    d.location,
    d.companySize,
    d.skillsCount,
    d.industry,
    d.workMode
  ]);

  const means = new Array(features[0].length).fill(0);
  const stds = new Array(features[0].length).fill(0);

  // Calculate means
  for (let i = 0; i < features[0].length; i++) {
    means[i] = features.reduce((sum, row) => sum + row[i], 0) / features.length;
  }

  // Calculate standard deviations
  for (let i = 0; i < features[0].length; i++) {
    const variance = features.reduce((sum, row) => sum + Math.pow(row[i] - means[i], 2), 0) / features.length;
    stds[i] = Math.sqrt(variance);
  }

  // Normalize features
  const normalized = features.map(row => 
    row.map((value, i) => stds[i] === 0 ? 0 : (value - means[i]) / stds[i])
  );

  return { normalized, means, stds };
}

export function splitData(features: number[][], targets: number[], testRatio: number = 0.2) {
  const shuffledIndices = Array.from({ length: features.length }, (_, i) => i)
    .sort(() => Math.random() - 0.5);
  
  const splitIndex = Math.floor(features.length * (1 - testRatio));
  
  const trainIndices = shuffledIndices.slice(0, splitIndex);
  const testIndices = shuffledIndices.slice(splitIndex);
  
  return {
    trainFeatures: trainIndices.map(i => features[i]),
    trainTargets: trainIndices.map(i => targets[i]),
    testFeatures: testIndices.map(i => features[i]),
    testTargets: testIndices.map(i => targets[i])
  };
}

export function calculateMetrics(actual: number[], predicted: number[]) {
  const n = actual.length;
  const actualMean = actual.reduce((sum, val) => sum + val, 0) / n;
  
  let ssRes = 0;
  let ssTot = 0;
  let mae = 0;
  let mape = 0;
  let correctPredictions = 0;
  
  for (let i = 0; i < n; i++) {
    const error = actual[i] - predicted[i];
    const relativeError = Math.abs(error / actual[i]);
    
    ssRes += error * error;
    ssTot += Math.pow(actual[i] - actualMean, 2);
    mae += Math.abs(error);
    mape += relativeError;
    
    // Consider prediction correct if within 15% of actual
    if (relativeError <= 0.15) {
      correctPredictions++;
    }
  }
  
  const r2Score = Math.max(0, 1 - (ssRes / ssTot));
  const rmse = Math.sqrt(ssRes / n);
  const accuracy = correctPredictions / n;
  
  return {
    r2Score,
    mae: mae / n,
    rmse,
    mape: (mape / n) * 100,
    accuracy
  };
}

export function getDataStats(data: Employee[]): DataStats {
  const salaries = data.map(emp => emp.salary);
  const skillCounts: Record<string, number> = {};
  
  data.forEach(emp => {
    emp.skills.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });
  
  const topSkills = Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));
  
  return {
    totalRecords: data.length,
    avgSalary: salaries.reduce((sum, sal) => sum + sal, 0) / data.length,
    avgExperience: data.reduce((sum, emp) => sum + emp.yearsExperience, 0) / data.length,
    uniqueRoles: new Set(data.map(emp => emp.jobTitle)).size,
    salaryRange: {
      min: Math.min(...salaries),
      max: Math.max(...salaries)
    },
    topSkills
  };
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  if (currency === 'INR') {
    // Convert to lakhs/crores for Indian currency
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  } else {
    return `$${amount.toLocaleString()}`;
  }
}

export function detectCurrency(location: string): string {
  const indianCities = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Gurgaon", "Noida", "Ahmedabad", "Jaipur", "Kochi"];
  return indianCities.includes(location) ? 'INR' : 'USD';
}