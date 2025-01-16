import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { School, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LanguageSelector } from './common/LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-white'
      : 'text-indigo-200 hover:text-gray-700 hover:bg-indigo-50 px-3 py-1 rounded-lg';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2">
          <School className="h-8 w-8" />
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center">
          <nav className="flex gap-4">
            <Link to="/schools" className={isActive('/schools')}>
              {t('nav.schools')}
            </Link>
            {/* <Link to="/analysis" className={isActive('/analysis')}>
              {t('nav.analysis')}
            </Link> */}
            <Link
              to="/standardization"
              className={isActive('/standardization')}
            >
              {t('nav.standardization')}
            </Link>
            <Link to="/progress" className={isActive('/progress')}>
              {t('nav.progress')}
            </Link>
            <Link
              to="/resources/allocation"
              className={isActive('/resources/allocation')}
            >
              {t('nav.resourceAllocation')}
            </Link>
            <Link to="/engagement" className={isActive('/engagement')}>
              {t('nav.engagement')}
            </Link>
          </nav>

          {/* User Info and Language Selector */}
          <div className="border-l border-indigo-500 pl-6 flex items-center gap-4">
            {/* Language Selector */}
            <LanguageSelector />

            {user ? (
              <>
                <Link to={'/profile'}>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm">{user.name}</span>
                  <span className="text-xs bg-indigo-700 px-2 py-1 rounded">
                    {user.role.replace('_', ' ')}
                  </span>
                </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-indigo-200 hover:text-gray-700 hover:bg-indigo-50 px-3 py-2 rounded-lg"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm">{t('auth.logout')}</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-indigo-200 hover:text-gray-700 hover:bg-indigo-50 text-sm px-3 py-2 rounded-lg"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm hover:bg-indigo-50"
                >
                  {t('auth.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
