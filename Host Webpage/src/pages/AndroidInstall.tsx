import React from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InstallationSteps from '../components/InstallationSteps';

const AndroidInstall: React.FC = () => {
  const { t } = useTranslation();

  const androidSteps = [
    {
      title: t('android.steps.download.title'),
      description: t('android.steps.download.description')
    },
    {
      title: t('android.steps.enable.title'),
      description: t('android.steps.enable.description')
    },
    {
      title: t('android.steps.install.title'),
      description: t('android.steps.install.description')
    },
    {
      title: t('android.steps.launch.title'),
      description: t('android.steps.launch.description')
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            {t('common.backToHome')}
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('android.title')}</h1>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 md:p-8 rounded-xl mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('android.package.title')}</h2>
              <p className="text-gray-600">{t('android.package.compatibility')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('android.package.version')}</p>
            </div>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:opacity-90 w-full md:w-auto justify-center"
              onClick={(e) => {
                e.preventDefault();
                alert(t('android.download.alert'));
              }}
            >
              <Download size={20} />
              {t('android.download.button')}
            </a>
          </div>
        </div>
        
        <InstallationSteps steps={androidSteps} />
        
        <div className="mt-12 p-6 md:p-8 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">{t('android.requirements.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">{t('android.requirements.minimum.title')}</h3>
              <ul className="space-y-2 text-gray-600">
                {t('android.requirements.minimum.list', { returnObjects: true }).map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">{t('android.requirements.recommended.title')}</h3>
              <ul className="space-y-2 text-gray-600">
                {t('android.requirements.recommended.list', { returnObjects: true }).map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <p className="text-sm text-yellow-800">
              <strong>{t('android.security.note.title')}:</strong> {t('android.security.note.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndroidInstall;