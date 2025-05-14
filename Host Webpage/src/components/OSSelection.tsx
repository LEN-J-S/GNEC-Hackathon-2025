import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface OSSelectionProps {
  recommendedOS: string | null;
}

const OSSelection: React.FC<OSSelectionProps> = ({ recommendedOS }) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Link 
        to="/windows"
        className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
          recommendedOS === 'Windows' ? 'ring-2 ring-blue-500 ring-offset-4' : ''
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
        <div className="bg-white shadow-lg hover:shadow-xl rounded-2xl p-10 h-full flex flex-col items-center justify-center text-center transition-transform group-hover:-translate-y-1">
          <div className="absolute top-4 right-4">
            {recommendedOS === 'Windows' && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {t('download.recommended')}
              </span>
            )}
          </div>
          
          <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-6 text-white transform group-hover:rotate-6 transition-transform">
            <Monitor size={40} />
          </div>
          
          <h3 className="text-2xl font-bold mb-3">{t('download.windows.title')}</h3>
          <p className="text-gray-600 mb-8">{t('download.windows.subtitle')}</p>
          
          <span className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium group-hover:shadow-lg transition-all duration-300">
            {t('download.windows.button')}
          </span>
        </div>
      </Link>
      
      <Link 
        to="/android"
        className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
          recommendedOS === 'Android' ? 'ring-2 ring-purple-500 ring-offset-4' : ''
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
        <div className="bg-white shadow-lg hover:shadow-xl rounded-2xl p-10 h-full flex flex-col items-center justify-center text-center transition-transform group-hover:-translate-y-1">
          <div className="absolute top-4 right-4">
            {recommendedOS === 'Android' && (
              <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                {t('download.recommended')}
              </span>
            )}
          </div>
          
          <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 text-white transform group-hover:rotate-6 transition-transform">
            <Smartphone size={40} />
          </div>
          
          <h3 className="text-2xl font-bold mb-3">{t('download.android.title')}</h3>
          <p className="text-gray-600 mb-8">{t('download.android.subtitle')}</p>
          
          <span className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium group-hover:shadow-lg transition-all duration-300">
            {t('download.android.button')}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default OSSelection;