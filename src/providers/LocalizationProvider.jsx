import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  getLanguageConfig,
  getSupportedLanguageCode,
  resolveLanguageFromInput,
  translations,
} from "../constants/localization";
import { LocalizationContext } from "../context/LocalizationContext";
import formatDateTime from "../helpers/dateUtils";

const getPreferredLanguage = () => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (storedLanguage) {
    return resolveLanguageFromInput(storedLanguage);
  }

  const browserLanguages = [
    ...(window.navigator.languages ?? []),
    window.navigator.language,
  ].filter(Boolean);

  const matchedLanguage = browserLanguages.find((language) =>
    SUPPORTED_LANGUAGES.some(
      (supportedLanguage) =>
        supportedLanguage.code === getSupportedLanguageCode(language)
    )
  );

  return resolveLanguageFromInput(matchedLanguage);
};

const interpolateTranslation = (value, params) => {
  if (typeof value === "function") {
    return value(params);
  }

  return Object.entries(params).reduce((message, [key, replacement]) => {
    return message.replaceAll(`{{${key}}}`, String(replacement));
  }, value);
};

const LocalizationProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getPreferredLanguage);
  const languageConfig = getLanguageConfig(language);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(resolveLanguageFromInput(nextLanguage));
  }, []);

  const t = useCallback((key, params = {}) => {
    const value =
      translations[language]?.[key] ??
      translations[DEFAULT_LANGUAGE]?.[key] ??
      key;

    return interpolateTranslation(value, params);
  }, [language]);

  const localizedFormatDateTime = useCallback(
    (dateString, options) =>
      formatDateTime(dateString, languageConfig.locale, options),
    [languageConfig.locale]
  );

  const contextValue = useMemo(() => {
    return {
      language,
      setLanguage,
      languages: SUPPORTED_LANGUAGES,
      locale: languageConfig.locale,
      speechLocale: languageConfig.speechLocale,
      translateLanguage: languageConfig.translateCode,
      t,
      formatDateTime: localizedFormatDateTime,
    };
  }, [
    language,
    languageConfig.locale,
    languageConfig.speechLocale,
    languageConfig.translateCode,
    localizedFormatDateTime,
    setLanguage,
    t,
  ]);

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
