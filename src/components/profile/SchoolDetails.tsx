import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, AlertTriangle, CheckCircle } from 'lucide-react';
import { SchoolDetail } from '../../types/schoolDetail';

interface SchoolDetailsProps {
  schoolData: SchoolDetail | null;
  loading: boolean;
  error: string | null;
}

export function SchoolDetails({ schoolData, loading, error }: SchoolDetailsProps) {
  const school = schoolData[0];
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">Error loading school details</span>
        </div>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-medium text-yellow-900">
            School Details Not Found
          </h3>
        </div>
        <p className="text-yellow-700 mb-4">
          Please complete the school analysis form to add your school details.
        </p>
        <button
          onClick={() => navigate('/analysis')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Complete Analysis Form
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <School className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">School Details</h3>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-green-600 font-medium">Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Basic Information</h4>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">School Name</dt>
                <dd className="text-sm font-medium text-gray-900">{school.schoolName}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">School ID</dt>
                <dd className="text-sm font-medium text-gray-900">{school.schoolID}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Category</dt>
                <dd className="text-sm font-medium text-gray-900">{school.schoolCategory}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Type</dt>
                <dd className="text-sm font-medium text-gray-900">{school.schoolType}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Location</h4>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">State</dt>
                <dd className="text-sm font-medium text-gray-900">{school.state}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">District</dt>
                <dd className="text-sm font-medium text-gray-900">{school.district}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Block</dt>
                <dd className="text-sm font-medium text-gray-900">{school.block}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Pin Code</dt>
                <dd className="text-sm font-medium text-gray-900">{school.pincode}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Statistics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <dt className="text-sm text-gray-500">Total Students</dt>
              <dd className="mt-1 text-2xl font-semibold text-indigo-600">
                {school.totalStudents.toLocaleString()}
              </dd>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <dt className="text-sm text-gray-500">Total Teachers</dt>
              <dd className="mt-1 text-2xl font-semibold text-indigo-600">
                {school.totalTeachers.toLocaleString()}
              </dd>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <dt className="text-sm text-gray-500">Total Classrooms</dt>
              <dd className="mt-1 text-2xl font-semibold text-indigo-600">
                {school.totalClassrooms.toLocaleString()}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}