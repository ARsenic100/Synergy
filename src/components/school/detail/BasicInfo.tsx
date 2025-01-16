import React from 'react';
import { SchoolDetail } from '../../../types/schoolDetail';
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  School as SchoolIcon,
} from 'lucide-react';

interface BasicInfoProps {
  school: SchoolDetail;
}

export function BasicInfo({ school }: BasicInfoProps) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <SchoolIcon className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">School Name</div>
                <div className="font-medium">{school.schoolName}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">UDISE Code</div>
                <div className="font-medium">{school.schoolID}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">
                  {school.district}, {school.state}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">School Type</div>
                <div className="font-medium">{school.schoolType}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">School Category</div>
                <div className="font-medium">{school.schoolCategory}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">School Management</div>
                <div className="font-medium">{school.schoolManagement}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Medium of Instruction</div>
                <div className="font-medium">{school.mediumOfInstruction}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Rural/Urban</div>
                <div className="font-medium">{school.ruralUrban}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Block</div>
                <div className="font-medium">{school.block}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6">Location Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">State</label>
              <div className="font-medium">{school.state}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">District</label>
              <div className="font-medium">{school.district}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Cluster</label>
              <div className="font-medium">{school.cluster}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Village/City</label>
              <div className="font-medium">{school.villageCity}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Pincode</label>
              <div className="font-medium">{school.pincode}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Rural/Urban</label>
              <div className="font-medium">{school.ruralUrban}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6">Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Class Range</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Lowest Class</label>
                <div className="font-medium">{school.lowestClass}th</div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Highest Class</label>
                <div className="font-medium">{school.highestClass}th</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-4">Infrastructure</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-500">Total Classrooms</label>
                <div className="font-medium">{school.totalClassrooms}</div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Total Teachers</label>
                <div className="font-medium">{school.totalTeachers}</div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Total Students</label>
                <div className="font-medium">{school.totalStudents}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}