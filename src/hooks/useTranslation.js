import { useState } from 'react';
import es from '../i18n/es.json';
import en from '../i18n/en.json';

const STORAGE_KEY = 'noctulabs-lang';
const translations = { es, en };

export default function useTranslation() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'es';
  });

  const changeLang = (newLang) => {
    localStorage.setItem(STORAGE_KEY, newLang);
    setLang(newLang);
  };

  const t = translations[lang];
  return { t, lang, setLang: changeLang };
}