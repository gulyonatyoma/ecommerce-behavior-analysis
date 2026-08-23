"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Locale, Translation, translations } from "@/data/translations";

type LanguageContextValue = {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ru");

  useEffect(() => {
    const saved = window.localStorage.getItem("kal-locale") as Locale | null;
    if (saved === "ru" || saved === "kk") setLocale(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("kal-locale", locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t: translations[locale] as Translation,
      setLocale,
      toggleLocale: () => setLocale((current) => (current === "ru" ? "kk" : "ru")),
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
