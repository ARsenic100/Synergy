// src/components/resource-allocation/ResourceMatchingSystem.tsx

import React, { useState } from 'react';
import axios from 'axios';
import {
  ArrowRight,
  School,
  Package,
  Share2,
  CheckCircle,
  MapPin,
  Search,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SchoolMatch {
  schoolId: string;
  schoolName: string;
  matchScore: number;
  potentialResources: string[];
  reasonForMatch: string;
  location: {
    state: string;
    district: string;
  };
}

interface School {
  schoolID: string;
  schoolName: string;
}

export function ResourceMatchingSystem() {
  const [schoolSearchTerm, setSchoolSearchTerm] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('');
  const [schools, setSchools] = useState<School[]>([]);
  const [matches, setMatches] = useState<SchoolMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const {user} = useAuth();
  const searchSchools = async (schoolId: string) => {
    if (!schoolId) return;
    setSearching(true);
    try {
      const response = await axios.get(`https://synergy-backend-six.vercel.app/api/school/details/search/${schoolId}`);
      console.log(response.data);
      setSchools(response.data);
    } catch (error) {
      console.error('Error searching schools:', error);
    } finally {
      setSearching(false);
    }
  };

  const findMatches = async (schoolId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://synergy-backend-six.vercel.app/api/resource-plans/matches/${schoolId}`);
      setMatches(response.data);
      setSchools([]); // Clear school search results
      setSchoolSearchTerm(''); // Clear search term
    } catch (error) {
      console.error('Error finding matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolSelect = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    findMatches(schoolId);
  };

  const initiateResourceRequest = async (matchedSchoolId: string, matchScore: any ) => {
    try {
      await axios.post(' https://synergy-backend-six.vercel.app/api/resource-plans/matches', {
        requestingSchoolId: selectedSchoolId,
        matchedSchoolId,
        status: 'pending',
        matchScore: matchScore,
      });
      // You could add a success message or update the UI here
    } catch (error) {
      console.error('Error initiating resource request:', error);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Intelligent Resource Matching
          </h2>
          <p className="text-gray-600">
            Find the best resource sharing opportunities for your school
          </p>
        </div>
      </div>

      {/* School Search */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="max-w-xl mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your School
          </label>
          <div className="relative">
            <input
              type="text"
              value={user?.schoolId || schoolSearchTerm}
              onChange={(e) => {
                setSchoolSearchTerm(e.target.value);
                searchSchools(e.target.value);
              }}
              className="w-full px-4 py-3 border rounded-lg pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter school name or ID..."
            />
            {searching ? (
              <Loader2 className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            )}
          </div>

          {schools.length > 0 && (
            <div className="mt-2 border rounded-lg shadow-sm max-h-60 overflow-y-auto">
              {schools.map((school) => (
                <button
                  key={school.schoolID}
                  onClick={() => handleSchoolSelect(school.schoolID)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium">{school.schoolName}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({school.schoolID})
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Matches Display */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
        </div>
      ) : (
        matches.length > 0 && (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.schoolId}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <School className="h-5 w-5 text-indigo-600" />
                      <h3 className="font-medium">{match.schoolName}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          match.matchScore >= 70
                            ? 'bg-green-100 text-green-800'
                            : match.matchScore >= 40
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {match.matchScore}% Match
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {match.location.district}, {match.location.state}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Available Resources:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {match.potentialResources.map((resource) => (
                          <span
                            key={resource}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">{match.reasonForMatch}</p>
                  </div>

                  
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {matches.length === 0 && selectedSchoolId && !loading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <Share2 className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-yellow-800 mb-1">
            No Matches Found
          </h3>
          <p className="text-sm text-yellow-600">
            We couldn't find any resource matching opportunities for your school at
            this time.
          </p>
        </div>
      )}
    </div>
  );
}
