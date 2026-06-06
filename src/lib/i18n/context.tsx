import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKeys } from './translations';

type Language = 'fr' | 'en' | 'ar';

interface i18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  isRTL: boolean;
}

const i18nContext = createContext<i18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: TranslationKeys): string => {
    const keys = key.split('.') as (keyof typeof translations.fr)[];
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        // Fallback to FR if key missing
        let fallback: any = translations.fr;
        for (const fk of keys) {
          fallback = fallback?.[fk];
        }
        return fallback || key;
      }
    }
    return result;
  };

  return (
    <i18nContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div className={isRTL ? 'font-arabic' : ''} style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'inherit' }}>
        {children}
      </div>
    </i18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(i18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
