import { useEffect, useState } from "react";
import { getLanguageDisplayName } from "../constants/localization";
import { translateTaskText } from "../helpers/taskTranslation";
import { useLocalization } from "./useLocalization";

export const useTaskTranslation = (text) => {
  const { language, t, translateLanguage } = useLocalization();
  const [translationState, setTranslationState] = useState({
    translatedText: null,
    sourceLanguage: null,
    canTranslate: false,
  });
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setShowOriginal(false);

    translateTaskText(text, translateLanguage).then((result) => {
      if (!isCancelled) {
        setTranslationState(result);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [text, translateLanguage]);

  const sourceLanguageLabel = translationState.sourceLanguage
    ? getLanguageDisplayName(translationState.sourceLanguage, language)
    : "";
  const isTranslated = translationState.canTranslate;
  const displayText =
    isTranslated && !showOriginal ? translationState.translatedText : text;

  return {
    displayText,
    isTranslated,
    showOriginal,
    toggleTranslation: () => setShowOriginal((current) => !current),
    toggleLabel: showOriginal
      ? t("task.showTranslation")
      : t("task.showOriginal"),
    translationBadgeLabel: t("task.autoTranslated", {
      language: sourceLanguageLabel,
    }),
  };
};
