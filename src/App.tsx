import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { StandardizationPage } from './pages/StandardizationPage';
import { ProgressPage } from './pages/ProgressPage';
import { EngagementPage } from './pages/EngagementPage';
import { KnowYourSchoolPage } from './pages/KnowYourSchoolPage';
import { AIAnalysisResult } from './components/analysis/AIAnalysisResult';
import { GuidesList } from './components/support/guides/GuidesList';
import { TrainingList } from './components/support/training/TrainingList';
import { ToolsList } from './components/support/tools/ToolsList';
import { BestPracticesList } from './components/support/practices/BestPracticesList';
import { ResourceAllocationPage } from './pages/ResourceAllocationPage';
import { ProfilePage } from './pages/ProfilePage';
import { SchoolDetailPage } from './pages/SchoolDetailPage';
import { RegistrationPendingPage } from './pages/RegistrationPending';

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* <Route path="/analysis" element={<AnalysisPage />} /> */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/report" element={<AIAnalysisResult />} />
                <Route
                  path="/standardization"
                  element={<StandardizationPage />}
                />
                <Route
                  path="/standardization/guides"
                  element={<GuidesList />}
                />
                <Route
                  path="/standardization/training"
                  element={<TrainingList />}
                />
                <Route path="/standardization/tools" element={<ToolsList />} />
                <Route
                  path="/standardization/resources"
                  element={<BestPracticesList />}
                />
                <Route
                  path="/resources/allocation"
                  element={<ResourceAllocationPage />}
                />

                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/engagement" element={<EngagementPage />} />
                <Route path="/schools" element={<KnowYourSchoolPage />} />
                <Route path="/school/detail/:id" element={<SchoolDetailPage />} />
                <Route path="/registration-pending" element={<RegistrationPendingPage/>}/>
                
              </Routes>
            </main>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}
