import React from 'react';
import { Brain, TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white shadow-2xl border-b border-gray-700">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400 absolute -top-1 -right-1 bg-slate-900 rounded-full p-0.5" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                SalaryPredict AI
              </h1>
              <p className="text-gray-300 text-lg mt-1">
                Advanced Machine Learning for Employee Compensation Analysis
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">4</div>
              <div className="text-sm text-gray-300">ML Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">95%</div>
              <div className="text-sm text-gray-300">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">35</div>
              <div className="text-sm text-gray-300">Data Points</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}