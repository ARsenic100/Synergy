import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../services/api';
import { ProfileForm } from '../components/profile/ProfileForm';
import { PasswordResetForm } from '../components/profile/PasswordResetForm';
import { PendingApprovals } from '../components/admin/PendingApprovals';
import { SchoolDetails } from '../components/profile/SchoolDetails';
import { useSchoolAdminDetails } from '../hooks/useSchoolAdminDetails';
import { User, Lock, UserCheck, School } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  console.log(user);
  const { schoolData, loading: schoolLoading, error: schoolError } = 
    useSchoolAdminDetails(user?.role === 'SCHOOL_ADMIN' ? user?.schoolId : undefined);

  useEffect(() => {
    if (user?.role === 'SUPER_ADMIN') {
      fetchPendingApprovals();
    }
  }, [user]);

  const fetchPendingApprovals = async () => {
    try {
      const data = await authApi.getPendingApprovals();
      setPendingApprovals(data);
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
    }
  };

  const handleProfileUpdate = async (data: { name: string; email: string }) => {
    try {
      setLoading(true);
      await authApi.updateProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      setLoading(true);
      await authApi.resetPassword(data);
    } catch (error) {
      console.error('Error resetting password:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      setLoading(true);
      await authApi.approveUser(userId);
      await fetchPendingApprovals();
    } catch (error) {
      console.error('Error approving user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      setLoading(true);
      await authApi.rejectUser(userId);
      await fetchPendingApprovals();
    } catch (error) {
      console.error('Error rejecting user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <User className="h-5 w-5 mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`${
                activeTab === 'password'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Lock className="h-5 w-5 mr-2" />
              Password
            </button>
            {user?.role === 'SCHOOL_ADMIN' && (
              <button
                onClick={() => setActiveTab('school')}
                className={`${
                  activeTab === 'school'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <School className="h-5 w-5 mr-2" />
                School Details
              </button>
            )}
            {user?.role === 'SUPER_ADMIN' && (
              <button
                onClick={() => setActiveTab('approvals')}
                className={`${
                  activeTab === 'approvals'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <UserCheck className="h-5 w-5 mr-2" />
                Pending Approvals
              </button>
            )}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <ProfileForm
              user={user}
              onSubmit={handleProfileUpdate}
              loading={loading}
            />
          )}
          {activeTab === 'password' && (
            <PasswordResetForm
              onSubmit={handlePasswordReset}
              loading={loading}
            />
          )}
          {activeTab === 'school' && user?.role === 'SCHOOL_ADMIN' && (
            <SchoolDetails
              schoolData={schoolData}
              loading={schoolLoading}
              error={schoolError}
            />
          )}
          {activeTab === 'approvals' && user?.role === 'SUPER_ADMIN' && (
            <PendingApprovals
              approvals={pendingApprovals}
              onApprove={handleApprove}
              onReject={handleReject}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}