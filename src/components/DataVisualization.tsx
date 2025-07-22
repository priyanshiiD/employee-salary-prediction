import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
} from 'chart.js';
import { Bar, Scatter, Line } from 'react-chartjs-2';
import { Employee } from '../types';
import { BarChart3, ScatterChart as ScatterIcon, TrendingUp, MapPin, Building, Users } from 'lucide-react';
import { formatCurrency, detectCurrency } from '../utils/dataProcessing';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

interface DataVisualizationProps {
  data: Employee[];
}

export default function DataVisualization({ data }: DataVisualizationProps) {
  // Salary by Experience scatter plot
  const experienceData = {
    datasets: [
      {
        label: 'Salary vs Experience',
        data: data.map(emp => ({
          x: emp.yearsExperience,
          y: emp.salary
        })),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  // Salary by Job Title bar chart
  const jobTitleSalaries = data.reduce((acc, emp) => {
    if (!acc[emp.jobTitle]) {
      acc[emp.jobTitle] = [];
    }
    acc[emp.jobTitle].push(emp.salary);
    return acc;
  }, {} as Record<string, number[]>);

  const avgSalariesByTitle = Object.entries(jobTitleSalaries).map(([title, salaries]) => ({
    title,
    avgSalary: salaries.reduce((sum, sal) => sum + sal, 0) / salaries.length
  })).sort((a, b) => b.avgSalary - a.avgSalary).slice(0, 10);

  const jobTitleData = {
    labels: avgSalariesByTitle.map(item => item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title),
    datasets: [
      {
        label: 'Average Salary',
        data: avgSalariesByTitle.map(item => item.avgSalary),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  // Salary by Location
  const locationSalaries = data.reduce((acc, emp) => {
    if (!acc[emp.location]) {
      acc[emp.location] = [];
    }
    acc[emp.location].push(emp.salary);
    return acc;
  }, {} as Record<string, number[]>);

  const avgSalariesByLocation = Object.entries(locationSalaries).map(([location, salaries]) => ({
    location,
    avgSalary: salaries.reduce((sum, sal) => sum + sal, 0) / salaries.length,
    count: salaries.length
  })).sort((a, b) => b.avgSalary - a.avgSalary);

  const locationData = {
    labels: avgSalariesByLocation.map(item => item.location),
    datasets: [
      {
        label: 'Average Salary by Location',
        data: avgSalariesByLocation.map(item => item.avgSalary),
        backgroundColor: avgSalariesByLocation.map(item => 
          item.location.includes('San Francisco') || item.location.includes('New York') || item.location.includes('London') 
            ? 'rgba(245, 158, 11, 0.8)' 
            : 'rgba(139, 69, 19, 0.8)'
        ),
        borderColor: avgSalariesByLocation.map(item => 
          item.location.includes('San Francisco') || item.location.includes('New York') || item.location.includes('London') 
            ? 'rgba(245, 158, 11, 1)' 
            : 'rgba(139, 69, 19, 1)'
        ),
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#374151'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y || context.parsed;
            return `Salary: ${formatCurrency(value, 'INR')}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6B7280'
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6B7280',
          callback: function(value: any) {
            return formatCurrency(value, 'INR');
          }
        }
      }
    }
  };

  const scatterOptions = {
    ...chartOptions,
    scales: {
      x: {
        ...chartOptions.scales.x,
        title: {
          display: true,
          text: 'Years of Experience',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#374151'
        }
      },
      y: {
        ...chartOptions.scales.y,
        title: {
          display: true,
          text: 'Salary (₹)',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#374151'
        }
      }
    }
  };

  // Calculate statistics
  const totalSalary = data.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = totalSalary / data.length;
  const avgExperience = data.reduce((sum, emp) => sum + emp.yearsExperience, 0) / data.length;
  const uniqueRoles = new Set(data.map(emp => emp.jobTitle)).size;
  const uniqueLocations = new Set(data.map(emp => emp.location)).size;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Data Analytics Dashboard</h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-700">{data.length}</div>
              <div className="text-sm text-emerald-600 font-medium">Total Records</div>
            </div>
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {formatCurrency(avgSalary, 'INR')}
              </div>
              <div className="text-sm text-blue-600 font-medium">Avg Salary</div>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-700">
                {avgExperience.toFixed(1)}
              </div>
              <div className="text-sm text-orange-600 font-medium">Avg Experience</div>
            </div>
            <Building className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-700">{uniqueLocations}</div>
              <div className="text-sm text-purple-600 font-medium">Locations</div>
            </div>
            <MapPin className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience vs Salary Scatter Plot */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <ScatterIcon className="w-6 h-6 text-emerald-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Experience vs Salary</h3>
          </div>
          <div className="h-80">
            <Scatter data={experienceData} options={scatterOptions} />
          </div>
        </div>

        {/* Job Title Average Salaries */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Top Paying Roles</h3>
          </div>
          <div className="h-80">
            <Bar data={jobTitleData} options={chartOptions} />
          </div>
        </div>

        {/* Location Average Salaries */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 lg:col-span-2">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-orange-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Salary by Location</h3>
          </div>
          <div className="h-80">
            <Bar data={locationData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-8 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-2">Highest Paying Location</h4>
            <p className="text-gray-600">
              {avgSalariesByLocation[0]?.location} - {formatCurrency(avgSalariesByLocation[0]?.avgSalary || 0, 'INR')}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-2">Most Common Role</h4>
            <p className="text-gray-600">
              {Object.entries(jobTitleSalaries).sort(([,a], [,b]) => b.length - a.length)[0]?.[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}