import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building2, Shield } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  access: 'admin' | 'editor' | 'viewer';
}

const mockCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'Principal',
    email: 'sarah.johnson@school.edu',
    phone: '+91 98765 43210',
    department: 'Administration',
    access: 'admin'
  },
  {
    id: '2',
    name: 'Prof. Rajesh Kumar',
    role: 'Department Head',
    email: 'rajesh.kumar@school.edu',
    phone: '+91 98765 43211',
    department: 'Academic',
    access: 'editor'
  },
  {
    id: '3',
    name: 'Mrs. Priya Sharma',
    role: 'Infrastructure Coordinator',
    email: 'priya.sharma@school.edu',
    phone: '+91 98765 43212',
    department: 'Infrastructure',
    access: 'editor'
  }
];

export function CollaboratorsList() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Add Member
        </button>
      </div>

      <div className="space-y-4">
        {mockCollaborators.map((collaborator, index) => (
          <motion.div
            key={collaborator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-indigo-600" />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">{collaborator.name}</h3>
                <p className="text-sm text-gray-600">{collaborator.role}</p>
                
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{collaborator.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{collaborator.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span>{collaborator.department}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded text-sm text-indigo-600">
                <Shield className="h-4 w-4" />
                <span className="capitalize">{collaborator.access}</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200">
                •••
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}