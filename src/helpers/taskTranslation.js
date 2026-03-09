import { TASK_TRANSLATION_CACHE_KEY } from "../constants/localization";

const pendingTranslationRequests = new Map();

const normalizeText = (text) => {
  return text.trim().replace(/\s+/g, " ");
};

const isStorageAvailable = () => {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
};

const loadTranslationCache = () => {
  if (!isStorageAvailable()) {
    return {};
  }

  try {
    const rawCache = window.localStorage.getItem(TASK_TRANSLATION_CACHE_KEY);
    return rawCache ? JSON.parse(rawCache) : {};
  } catch {
    window.localStorage.removeItem(TASK_TRANSLATION_CACHE_KEY);
    return {};
  }
};

const saveTranslationCache = (cache) => {
  if (!isStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(TASK_TRANSLATION_CACHE_KEY, JSON.stringify(cache));
};

const getCacheKey = (text, targetLanguage) => {
  return `${targetLanguage}::${normalizeText(text)}`;
};

export const getCachedTaskTranslation = (text, targetLanguage) => {
  const cache = loadTranslationCache();
  return cache[getCacheKey(text, targetLanguage)] ?? null;
};

const setCachedTaskTranslation = (text, targetLanguage, value) => {
  const cache = loadTranslationCache();
  cache[getCacheKey(text, targetLanguage)] = value;
  saveTranslationCache(cache);
};

const parseGoogleTranslationResponse = (payload) => {
  const translatedText = Array.isArray(payload?.[0])
    ? payload[0]
        .map((segment) => segment?.[0] ?? "")
        .join("")
        .trim()
    : "";

  return {
    translatedText,
    sourceLanguage: payload?.[2] ?? null,
  };
};

export const translateTaskText = async (text, targetLanguage) => {
  const normalizedText = normalizeText(text);

  if (!normalizedText || normalizedText.length < 2 || !targetLanguage) {
    return {
      translatedText: null,
      sourceLanguage: null,
      canTranslate: false,
    };
  }

  const cachedValue = getCachedTaskTranslation(normalizedText, targetLanguage);

  if (cachedValue) {
    return cachedValue;
  }

  const requestKey = getCacheKey(normalizedText, targetLanguage);

  if (pendingTranslationRequests.has(requestKey)) {
    return pendingTranslationRequests.get(requestKey);
  }

  const translationRequest = fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(
      targetLanguage
    )}&dt=t&q=${encodeURIComponent(normalizedText)}`
  )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const payload = await response.json();
      const { translatedText, sourceLanguage } =
        parseGoogleTranslationResponse(payload);
      const normalizedSourceLanguage = sourceLanguage?.toLowerCase() ?? null;
      const canTranslate =
        Boolean(translatedText) &&
        normalizedSourceLanguage !== targetLanguage &&
        translatedText !== normalizedText;

      const result = {
        translatedText: canTranslate ? translatedText : null,
        sourceLanguage: normalizedSourceLanguage,
        canTranslate,
      };

      setCachedTaskTranslation(normalizedText, targetLanguage, result);
      return result;
    })
    .catch(() => {
      return {
        translatedText: null,
        sourceLanguage: null,
        canTranslate: false,
      };
    })
    .finally(() => {
      pendingTranslationRequests.delete(requestKey);
    });

  pendingTranslationRequests.set(requestKey, translationRequest);

  return translationRequest;
};
