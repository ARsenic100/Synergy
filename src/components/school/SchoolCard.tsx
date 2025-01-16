import React from 'react';
import { School } from '../../types/school';
import {
  MapPin,
  Users,
  GraduationCap,
  Building2,
  BarChart,
  ArrowRight,
  Star,
  BookOpen,
  Award,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SchoolCardProps {
  school: School;
  onViewDetails: () => void;
}

export function SchoolCard({ school, onViewDetails }: SchoolCardProps) {
  const getPerformanceBadgeColor = (performance: string) => {
    switch (performance.toLowerCase()) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'satisfactory':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs improvement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{school.name}</h3>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {school.district}, {school.state}
            </span>
          </div>
        </div>
        <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
            {school.qualityScore.toFixed(2)}
            </div>
          <div className="text-xs text-gray-500">Quality Score</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {school.currentStructure}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {school.studentCount} Students
          </span>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {school.teacherCount} Teachers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            1:{Math.round(school.studentCount / school.teacherCount)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {school.facilities?.map((facility) => (
          <span
            key={facility}
            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium"
          >
            {facility}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-sm ${getPerformanceBadgeColor(
            school.performanceBand
          )}`}
        >
          {school.performanceBand}
        </span>

        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Link
              to={`/school/detail/${school.schoolUDISECode}`}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">View Details</span>
            </Link>
          </button>
        </div>
      </div>

      {school.transitionStatus === 'in-progress' && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Transition in Progress</span>
          </div>
          <div className="mt-2 bg-yellow-100 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: school.qualityScore + '%' }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}