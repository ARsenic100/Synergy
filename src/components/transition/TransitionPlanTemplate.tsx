import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  Flag,
  MessageSquare, 
  Plus, 
  Settings, 
  Users 
} from 'lucide-react';
import { PlanTimeline } from './timeline/PlanTimeline';
import { TaskList } from './tasks/TaskList';
import { CollaboratorsList } from './collaboration/CollaboratorsList';
import { ProgressOverview } from './progress/ProgressOverview';
import { PlanSettings } from './settings/PlanSettings';
import { useAuth } from '../../contexts/AuthContext';

export function TransitionPlanTemplate() {
  const {user} = useAuth();
  const [activeTab, setActiveTab] = useState('timeline');
  const [showSettings, setShowSettings] = useState(false);

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Transition Plan
              </h1>
              <p className="text-gray-600 mt-1">
                UDISE Code : {user?.schoolId}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              {/* <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>New Task</span>
              </button> */}
            </div>
          </div>

          {/* Quick Stats */}
          {/* <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-600">Time Remaining</p>
                  <p className="text-lg font-semibold text-gray-900">45 days</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                  <p className="text-lg font-semibold text-gray-900">24/36</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Team Members</p>
                  <p className="text-lg font-semibold text-gray-900">8</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Comments</p>
                  <p className="text-lg font-semibold text-gray-900">156</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'timeline' && <PlanTimeline />}
          {activeTab === 'tasks' && <TaskList />}
          {activeTab === 'collaborators' && <CollaboratorsList />}
          {activeTab === 'progress' && <ProgressOverview />}
        </motion.div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <PlanSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}