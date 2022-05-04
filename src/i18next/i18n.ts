import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import translationEN from "../Components/locales/en/translation.json";
import translationRU from "../Components/locales/ru/translation.json";
import translationZH from "../Components/locales/zh/translation.json";


const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    },
    zh: {
        translation: translationZH
    }
};

// @ts-ignore
i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: resources,
        fallbackLng: 'ru',
        whitelist: ["en", "ru", "zh"],
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
