import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import it from './it';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
.use(LanguageDetector)
  .use(initReactI18next)  
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
    },
    lng: 'en',  
    fallbackLng: 'en', 
    debug: true, 
    interpolation: {
      escapeValue: false, 
    },
     backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to your translation files
        },
  });

export default i18n;
