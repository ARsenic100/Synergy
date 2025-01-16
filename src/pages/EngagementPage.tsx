import React, { useState } from 'react';
import {
  MessageSquare,
  ClipboardList,
  Bell,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Trophy,
  Bot,
  Headphones,
} from 'lucide-react';
import { EngagementDashboard } from '../components/engagement/EngagementDashboard';
import { DiscussionForum } from '../components/engagement/DiscussionForum';
import { SurveyCenter } from '../components/engagement/SurveyCenter';
import { PolicyCenter } from '../components/engagement/PolicyCenter';
import { StakeholderDirectory } from '../components/engagement/directory/StakeholderDirectory';
import { EventsCalendar } from '../components/engagement/events/EventsCalendar';
import { AchievementCenter } from '../components/engagement/achievements/AchievementCenter';
import { SupportCenter } from '../components/engagement/support/SupportCenter';

type EngagementSection =
  | 'discussions'
  | 'surveys'
  | 'policies'
  | 'directory'
  | 'events'
  | 'achievements'
  | 'support';

export function EngagementPage() {
  const [activeSection, setActiveSection] =
    useState<EngagementSection>('discussions');

  const navigationItems = [
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'surveys', label: 'Surveys', icon: ClipboardList },
    { id: 'policies', label: 'Policy Updates', icon: Bell },
    { id: 'directory', label: 'Directory', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'support', label: 'Support', icon: Headphones },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'discussions':
        return <DiscussionForum />;
      case 'surveys':
        return <SurveyCenter />;
      case 'policies':
        return <PolicyCenter />;
      case 'directory':
        return <StakeholderDirectory />;
      case 'events':
        return <EventsCalendar />;
      case 'achievements':
        return <AchievementCenter />;
      case 'support':
        return <SupportCenter />;
      default:
        return <EngagementDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Stakeholder Engagement Portal
          </h1>
          <p className="text-lg opacity-90">
            Connect, collaborate, and stay informed with your education
            community
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        setActiveSection(item.id as EngagementSection)
                      }
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* AI Assistant */}
            {/* <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Bot className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Get personalized recommendations and help navigating the portal
              </p>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Ask AI Assistant
              </button>
            </div> */}
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
