import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'zh', name: '中文' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    document.documentElement.dir = languages.find(lang => lang.code === langCode)?.dir || 'ltr';
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
        aria-label="Select language"
      >
        <Languages size={20} />
        <span className="text-sm font-medium">{languages.find(lang => lang.code === i18n.language)?.name || 'English'}</span>
      </button>
      
      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
              i18n.language === language.code ? 'text-blue-600 font-medium' : 'text-gray-700'
            }`}
            onClick={() => handleLanguageChange(language.code)}
            dir={language.dir || 'ltr'}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;