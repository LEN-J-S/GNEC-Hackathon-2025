import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe2, Users, Laptop } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OSSelection from '../components/OSSelection';
import { getOSDetails } from '../utils/deviceDetection';

const Home: React.FC = () => {
  const [osType, setOsType] = useState<string | null>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    setOsType(getOSDetails().os);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute right-0 bottom-0 bg-[radial-gradient(circle_at_70%_90%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <a 
            href="https://sdgs.un.org/goals/goal10" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-medium hover:shadow-md transition-all duration-300"
          >
            <Globe2 size={18} className="text-blue-600" />
            {t('hero.sdgBadge')}
          </a>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              {t('hero.title')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('hero.tagline')}
          </p>
          
          <div className="flex justify-center">
            <a 
              href="#download" 
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {t('hero.downloadButton')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <section id="download" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {t('download.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('download.subtitle')}
            </p>
          </div>
          
          <OSSelection recommendedOS={osType} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight px-4">
            {t('features.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-6 text-white transform group-hover:rotate-6 transition-transform">
                <Laptop size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('features.offline.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('features.offline.description')}</p>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 text-white transform group-hover:rotate-6 transition-transform">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('features.equality.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('features.equality.description')}</p>
            </div>
            
            <div className="group bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl mb-6 text-white transform group-hover:rotate-6 transition-transform">
                <Globe2 size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('features.community.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('features.community.description')}</p>
            </div>
          </div>

          <div className="mt-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-10 rounded-3xl"></div>
            <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-gray-100 shadow-xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {t('join.title')}
              </h3>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                {t('join.description')}
              </p>
              <a 
                href="#download" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {t('join.button')}
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;