import React from 'react';
import { SchoolDetail } from '../../../types/schoolDetail';
import {
  Library,
  Monitor,
  Droplets,
  Zap,
  Wifi,
  BookOpen,
  Activity,
  Building,
  Check,
  X,
} from 'lucide-react';

interface FacilitiesOverviewProps {
  school: SchoolDetail;
}

export function FacilitiesOverview({ school }: FacilitiesOverviewProps) {
  const facilities = [
    { 
      name: 'Library', 
      icon: Library, 
      available: school.availableFacilities[0]?.library 
    },
    { 
      name: 'Computer Lab', 
      icon: Monitor, 
      available: school.availableFacilities[0]?.computerLab 
    },
    { 
      name: 'Drinking Water', 
      icon: Droplets, 
      available: school.availableFacilities[0]?.drinkingWater 
    },
    { 
      name: 'Electricity', 
      icon: Zap, 
      available: school.availableFacilities[0]?.electricity 
    },
    { 
      name: 'Internet', 
      icon: Wifi, 
      available: school.availableFacilities[0]?.internet 
    },
    { 
      name: 'Science Lab', 
      icon: Activity, 
      available: school.availableFacilities[0]?.scienceLab 
    },
    { 
      name: 'Smart Classroom', 
      icon: Monitor, 
      available: school.availableFacilities[0]?.smartClassroom 
    },
    { 
      name: 'Playground', 
      icon: Activity, 
      available: school.availableFacilities[0]?.playground 
    },
    { 
      name: 'Auditorium', 
      icon: Building, 
      available: school.availableFacilities[0]?.auditorium 
    },
    { 
      name: 'Digital Library', 
      icon: BookOpen, 
      available: school.availableFacilities[0]?.digitalLibrary 
    },
  ];

  const digitalEquipment = [
    { name: 'Desktops', count: school.digitalEquipment[0]?.desktops || 0 },
    { name: 'Laptops', count: school.digitalEquipment[0]?.laptops || 0 },
    { name: 'Projectors', count: school.digitalEquipment[0]?.projectors || 0 },
    { name: 'Smart Boards', count: school.digitalEquipment[0]?.smartBoards || 0 },
    { name: 'Printers', count: school.digitalEquipment[0]?.printers || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Facilities Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6">Available Facilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {facilities.map((facility) => {
            const Icon = facility.icon;
            return (
              <div
                key={facility.name}
                className={`p-4 rounded-lg border ${
                  facility.available
                    ? 'border-indigo-200 bg-indigo-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    className={`h-5 w-5 ${
                      facility.available ? 'text-indigo-600' : 'text-gray-400'
                    }`}
                  />
                  {facility.available ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div
                  className={`text-sm font-medium ${
                    facility.available ? 'text-indigo-900' : 'text-gray-500'
                  }`}
                >
                  {facility.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Digital Equipment */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6">Digital Equipment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {digitalEquipment.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-700">{item.name}</span>
              <span className="text-lg font-semibold text-indigo-600">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Infrastructure Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6">Infrastructure Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Basic Amenities</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Separate Room for HM</span>
                {school.separateRoomForHM ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Boys Washrooms</span>
                {school.boysWashrooms ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Girls Washrooms</span>
                {school.girlsWashrooms ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-4">Safety & Security</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Boundary Wall</span>
                {school.boundaryWall ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Safety Standards</span>
                {school.safetyStandards ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Universal Access</span>
                {school.universalAccess ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}