import React from 'react';
import { Link } from 'react-router-dom';
import { School, Clock } from 'lucide-react';

export function RegistrationPendingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <School className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registration Pending
        </h2>
        <div className="mt-2 flex justify-center">
          <Clock className="h-16 w-16 text-yellow-500" />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Your registration is currently pending approval from an administrator.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            You will be notified once your account has been approved.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <p className="text-center text-gray-700">
                What happens next?
              </p>
              <ul className="mt-4 space-y-4 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-600">•</span>
                  <span className="ml-2">
                    An administrator will review your registration details
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-600">•</span>
                  <span className="ml-2">
                    You will receive an email notification when your account is approved
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-600">•</span>
                  <span className="ml-2">
                    Once approved, you can log in using your registered email and password
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Need help?
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Return to login
              </Link>
              <span className="mx-2 text-gray-500">•</span>
              <a
                href="mailto:support@example.com"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}