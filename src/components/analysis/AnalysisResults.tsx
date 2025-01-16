import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AnalysisFormData } from '../../types/analysis';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface AnalysisResultsProps {
  data: AnalysisFormData;
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export function AnalysisResults({ data }: AnalysisResultsProps) {
  const totalStudents = 
    data.generalCategoryTotal + 
    data.scCategoryTotal + 
    data.stCategoryTotal + 
    data.obcCategoryTotal;

  const categoryData = [
    { name: 'General', value: data.generalCategoryTotal },
    { name: 'SC', value: data.scCategoryTotal },
    { name: 'ST', value: data.stCategoryTotal },
    { name: 'OBC', value: data.obcCategoryTotal },
  ];

  const infrastructureScore = calculateInfrastructureScore(data);
  const recommendedStructure = determineRecommendedStructure(data);
  const insights = generateInsights(data);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">AI Analysis Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold">Infrastructure Score</h3>
            </div>
            <p className="text-2xl font-bold text-indigo-600">{infrastructureScore}%</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Recommended Structure</h3>
            </div>
            <p className="text-lg font-medium text-green-600">{recommendedStructure}</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold">Student-Teacher Ratio</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {(totalStudents / data.totalTeachers).toFixed(1)}:1
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Student Category Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  insight.type === 'positive' ? 'bg-green-50 text-green-700' :
                  insight.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}
              >
                <p>{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateInfrastructureScore(data: AnalysisFormData): number {
  const factors = [
    data.hasBoundaryWall,
    data.hasRamps,
    data.hasPlayground,
    data.hasDrinkingWater
  ];
  
  const score = (factors.filter(Boolean).length / factors.length) * 100;
  return Math.round(score);
}

function determineRecommendedStructure(data: AnalysisFormData): string {
  const totalStudents = 
    data.generalCategoryTotal + 
    data.scCategoryTotal + 
    data.stCategoryTotal + 
    data.obcCategoryTotal;

  if (totalStudents <= 150) return 'Primary School (1-5)';
  if (totalStudents <= 300) return 'Upper Primary School (1-8)';
  if (totalStudents <= 500) return 'Secondary School (1-10)';
  return 'Senior Secondary School (1-12)';
}

function generateInsights(data: AnalysisFormData): Array<{ type: 'positive' | 'warning' | 'negative', message: string }> {
  const insights = [];
  const totalStudents = 
    data.generalCategoryTotal + 
    data.scCategoryTotal + 
    data.stCategoryTotal + 
    data.obcCategoryTotal;

  // Student-Teacher Ratio Analysis
  const ratio = totalStudents / data.totalTeachers;
  if (ratio > 35) {
    insights.push({
      type: 'negative',
      message: `High student-teacher ratio (${ratio.toFixed(1)}:1). Consider hiring additional teachers.`
    });
  } else if (ratio < 20) {
    insights.push({
      type: 'positive',
      message: `Excellent student-teacher ratio (${ratio.toFixed(1)}:1), enabling personalized attention.`
    });
  }

  // Infrastructure Analysis
  const infrastructureChecks = [
    data.hasBoundaryWall,
    data.hasRamps,
    data.hasPlayground,
    data.hasDrinkingWater
  ];
  
  const infrastructureScore = (infrastructureChecks.filter(Boolean).length / infrastructureChecks.length) * 100;
  
  if (infrastructureScore < 50) {
    insights.push({
      type: 'negative',
      message: 'Critical infrastructure gaps identified. Immediate attention required for basic facilities.'
    });
  } else if (infrastructureScore < 75) {
    insights.push({
      type: 'warning',
      message: 'Some infrastructure improvements needed to meet standard requirements.'
    });
  } else {
    insights.push({
      type: 'positive',
      message: 'Strong infrastructure foundation with most essential facilities in place.'
    });
  }

  // Diversity and Inclusion Analysis
  const diversityRatio = (data.scCategoryTotal + data.stCategoryTotal + data.obcCategoryTotal) / totalStudents;
  if (diversityRatio > 0.3) {
    insights.push({
      type: 'positive',
      message: 'Good representation of diverse student categories, promoting inclusive education.'
    });
  }

  // Gender Balance in Teaching Staff
  const femaleTeacherRatio = data.femaleTeachers / data.totalTeachers;
  if (femaleTeacherRatio >= 0.4 && femaleTeacherRatio <= 0.6) {
    insights.push({
      type: 'positive',
      message: 'Well-balanced gender representation in teaching staff.'
    });
  }

  return insights;
}