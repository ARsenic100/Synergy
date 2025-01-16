import React, { useState, useEffect } from 'react';
import { Share2, Search, Plus, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface SharedResource {
  _id: string;
  schoolId: string;
  schoolName: string;
  resourceType: string;
  totalQuantity: number;
  sharedQuantity: number;
  status: 'available' | 'shared' | 'unavailable';
  description?: string;
}

interface School {
  schoolID: string;
  schoolName: string;
  availableFacilities: Record<string, boolean>;
}

export function ResourceSharingHub() {
  const [activeTab, setActiveTab] = useState<'shared' | 'available'>('shared');
  const [schoolSearchTerm, setSchoolSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [availableResources, setAvailableResources] = useState<SharedResource[]>([]);
  const [sharedResources, setSharedResources] = useState<SharedResource[]>([]);
  const [isSharing, setIsSharing] = useState(false);
  const [shareForm, setShareForm] = useState<{
    resourceType: string;
    totalQuantity: number;
    sharedQuantity: number;
  }>({
    resourceType: '',
    totalQuantity: 0,
    sharedQuantity: 0,
  });

  // Search for school
  const searchSchool = async (schoolId: string) => {
    try {
      const response = await axios.get(`https://synergy-backend-six.vercel.app/api/school/details/search/${schoolId}`);
      setSelectedSchool(response.data[0]);
      console.log(response.data);
    } catch (error) {
      console.error('Error searching school:', error);
    }
  };

  // Fetch available resources
  const fetchAvailableResources = async () => {
    try {
      const response = await axios.get('https://synergy-backend-six.vercel.app/api/resource-plans/available');
      setAvailableResources(response.data);
    } catch (error) {
      console.error('Error fetching available resources:', error);
    }
  };

  // Share resources
  const handleShareResources = async () => {
    try {
      await axios.post('https://synergy-backend-six.vercel.app/api/resource-plans/share', {
        schoolId: selectedSchool?.schoolID,
        resources: [{
          ...shareForm,
          status: 'available'
        }]
      });
      setIsSharing(false);
      setShareForm({
        resourceType: '',
        totalQuantity: 0,
        sharedQuantity: 0,
      });
      fetchAvailableResources();
    } catch (error) {
      console.error('Error sharing resources:', error);
    }
  };

  // Request shared resource
  const handleRequestResource = async (resourceId: string) => {
    try {
      await axios.post('https://synergy-backend-six.vercel.app/api/resource-plans/request-shared', {
        requestingSchoolId: selectedSchool?.schoolID,
        resourceId
      });
      fetchAvailableResources();
    } catch (error) {
      console.error('Error requesting resource:', error);
    }
  };

  useEffect(() => {
    fetchAvailableResources();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Resource Sharing Hub</h2>
          <p className="text-gray-600 mt-1">
            Share and request resources within the school network
          </p>
        </div>
      </div>

      {/* School Search */}
      <div className="mb-8">
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Your School
          </label>
          <div className="relative">
            <input
              type="text"
              value={schoolSearchTerm}
              onChange={(e) => {
                setSchoolSearchTerm(e.target.value);
                searchSchool(e.target.value);
              }}
              className="w-full px-4 py-3 border rounded-lg pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter school ID..."
            />
            <Search className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {selectedSchool && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">{selectedSchool.schoolName}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Facilities:</h4>
                <div className="space-y-1">
                    {Object.entries(selectedSchool.availableFacilities[0])
                    .filter(([facility]) => facility !== '_id')
                    .filter(([, available]) => available)
                    .map(([facility]) => (
                      <div key={facility} className="text-sm text-gray-600">
                      • {facility.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('shared')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'shared'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Shared Resources
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'available'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Available Resources
        </button>
      </div>

      {/* Share Resources Form */}
      {activeTab === 'shared' && selectedSchool && (
        <div className="mb-8">
          <button
            onClick={() => setIsSharing(!isSharing)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Share New Resources
          </button>

          {isSharing && (
            <div className="mt-4 p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Share Resources</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resource Type
                  </label>
                  <select
                    value={shareForm.resourceType}
                    onChange={(e) => setShareForm({
                      ...shareForm,
                      resourceType: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Resource</option>
                    {Object.entries(selectedSchool.availableFacilities[0])
                    
                    
                      .filter(([facility]) => facility !== '_id')
                      .filter(([, available]) => available)
                      .map(([facility]) => (
                        <option key={facility} value={facility}>
                          {facility.replace(/([A-Z])/g, ' $1').trim()}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Quantity
                  </label>
                  <input
                    type="number"
                    value={shareForm.totalQuantity}
                    onChange={(e) => setShareForm({
                      ...shareForm,
                      totalQuantity: parseInt(e.target.value)
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shared Quantity
                  </label>
                  <input
                    type="number"
                    value={shareForm.sharedQuantity}
                    onChange={(e) => setShareForm({
                      ...shareForm,
                      sharedQuantity: parseInt(e.target.value)
                    })}
                    max={shareForm.totalQuantity}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleShareResources}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Share Resources
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Available Resources List */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          {availableResources.map((resource) => (
            <div key={resource._id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-medium">{resource.resourceType}</h3>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">School:</span> {resource.schoolName}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span>{' '}
                      {resource.sharedQuantity} available
                    </div>
                  </div>
                </div>

                {/* <button
                  onClick={() => handleRequestResource(resource._id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                  Request Resource
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}