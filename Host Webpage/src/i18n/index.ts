import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';
import bnTranslations from './locales/bn.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import hiTranslations from './locales/hi.json';
import idTranslations from './locales/id.json';
import swTranslations from './locales/sw.json';
import zhTranslations from './locales/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
      bn: { translation: bnTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      hi: { translation: hiTranslations },
      id: { translation: idTranslations },
      sw: { translation: swTranslations },
      zh: { translation: zhTranslations }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;