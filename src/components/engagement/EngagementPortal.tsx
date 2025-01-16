import React, { useEffect, useState } from 'react';
import { ForumPost as ForumPostType, Survey, PolicyUpdate } from '../../types/engagement';
import { ForumPost } from './ForumPost';
import { SurveyCard } from './SurveyCard';
import { PolicyUpdateCard } from './PolicyUpdateCard';
import { getForumPosts, getActiveSurveys, getPolicyUpdates } from '../../services/engagementService';
import { MessageSquare, ClipboardList, Bell } from 'lucide-react';

export function EngagementPortal() {
  const [posts, setPosts] = useState<ForumPostType[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [updates, setUpdates] = useState<PolicyUpdate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [postsData, surveysData, updatesData] = await Promise.all([
        getForumPosts(),
        getActiveSurveys(),
        getPolicyUpdates()
      ]);

      setPosts(postsData);
      setSurveys(surveysData);
      setUpdates(updatesData);
    };

    fetchData();
  }, []);

  const handleSurveyParticipate = (surveyId: string) => {
    console.log('Participating in survey:', surveyId);
  };

  const handleViewPolicyDetails = (updateId: string) => {
    console.log('Viewing policy update:', updateId);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Stakeholder Engagement Portal</h2>
        <p className="text-gray-600">
          Connect with other schools, share experiences, and stay updated on the latest policy changes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Discussion Forum</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Share experiences and get answers to your questions.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">Surveys & Feedback</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Participate in surveys to help improve the transition process.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Policy Updates</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Stay informed about the latest policy changes and requirements.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Recent Discussions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <ForumPost key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Active Surveys</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map(survey => (
            <SurveyCard
              key={survey.id}
              survey={survey}
              onParticipate={handleSurveyParticipate}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Policy Updates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {updates.map(update => (
            <PolicyUpdateCard
              key={update.id}
              update={update}
              onViewDetails={handleViewPolicyDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}