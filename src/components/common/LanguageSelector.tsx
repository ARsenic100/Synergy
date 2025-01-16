import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Menu } from '@headlessui/react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-gray-700 hover:bg-gray-100 rounded-lg">
        <Globe className="h-4 w-4" />
        <span>{languages.find((lang) => lang.code === language)?.name}</span>
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
        {languages.map((lang) => (
          <Menu.Item key={lang.code}>
            {({ active }) => (
              <button
                onClick={() => setLanguage(lang.code)}
                className={`${
                  active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                } w-full text-left px-4 py-2 text-sm`}
              >
                {lang.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
