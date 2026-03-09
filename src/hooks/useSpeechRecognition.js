import { useEffect, useRef, useState } from "react";
import { useLocalization } from "./useLocalization";

const getSpeechRecognitionConstructor = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

const getSpeechEnvironment = () => {
  if (typeof window === "undefined") {
    return {
      isSecureContext: true,
      isLikelyMobile: false,
      recognitionConstructor: null,
    };
  }

  const isLikelyMobile =
    Boolean(window.matchMedia?.("(pointer: coarse)")?.matches) ||
    /Android|webOS|iPhone|iPad|iPod/i.test(window.navigator.userAgent);

  return {
    isSecureContext: window.isSecureContext,
    isLikelyMobile,
    recognitionConstructor: getSpeechRecognitionConstructor(),
  };
};

const joinTranscriptParts = (...parts) => {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
};

const getSpeechErrorMessage = (errorCode, t) => {
  switch (errorCode) {
    case "not-allowed":
    case "service-not-allowed":
      return t("speech.permissionDenied");
    case "network":
      return t("speech.network");
    case "audio-capture":
      return t("speech.audioCapture");
    case "no-speech":
      return t("speech.noSpeech");
    default:
      return t("speech.generic");
  }
};

export const useSpeechRecognition = ({ onTranscriptChange }) => {
  const { speechLocale, t } = useLocalization();
  const recognitionRef = useRef(null);
  const speechEnvironmentRef = useRef(getSpeechEnvironment());
  const shouldRestartRef = useRef(false);
  const transcriptSeedRef = useRef("");
  const recognizedTextRef = useRef("");
  const onTranscriptChangeRef = useRef(onTranscriptChange);
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState("");

  useEffect(() => {
    onTranscriptChangeRef.current = onTranscriptChange;
  }, [onTranscriptChange]);

  useEffect(() => {
    const speechEnvironment = getSpeechEnvironment();
    speechEnvironmentRef.current = speechEnvironment;

    const { recognitionConstructor: SpeechRecognition, isLikelyMobile } =
      speechEnvironment;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setSpeechError(
        speechEnvironment.isSecureContext
          ? t("speech.unsupported")
          : t("speech.requiresSecure")
      );
      return undefined;
    }

    setIsSupported(true);
    setSpeechError("");

    const recognition = new SpeechRecognition();
    recognition.continuous = !isLikelyMobile;
    recognition.lang = speechLocale;
    recognition.interimResults = !isLikelyMobile;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalSegment = "";
      let interimSegment = "";

      for (
        let index = event.resultIndex;
        index < event.results.length;
        index += 1
      ) {
        const transcript = event.results[index][0].transcript.trim();

        if (event.results[index].isFinal) {
          finalSegment = joinTranscriptParts(finalSegment, transcript);
        } else {
          interimSegment = joinTranscriptParts(interimSegment, transcript);
        }
      }

      if (finalSegment) {
        recognizedTextRef.current = joinTranscriptParts(
          recognizedTextRef.current,
          finalSegment
        );
      }

      onTranscriptChangeRef.current?.(
        joinTranscriptParts(
          transcriptSeedRef.current,
          recognizedTextRef.current,
          interimSegment
        )
      );
    };

    recognition.onerror = (event) => {
      if (event.error === "aborted") {
        return;
      }

      shouldRestartRef.current = false;
      setIsListening(false);
      setSpeechError(getSpeechErrorMessage(event.error, t));
    };

    recognition.onend = () => {
      if (shouldRestartRef.current && !isLikelyMobile) {
        try {
          recognition.start();
          return;
        } catch {
          shouldRestartRef.current = false;
          setIsListening(false);
          setSpeechError(t("speech.restartFailed"));
        }
      }

      setIsListening(false);
      onTranscriptChangeRef.current?.(
        joinTranscriptParts(
          transcriptSeedRef.current,
          recognizedTextRef.current
        )
      );
    };

    recognitionRef.current = recognition;

    return () => {
      shouldRestartRef.current = false;
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;

      try {
        recognition.stop();
      } catch {
        // Ignore browser-specific stop errors during cleanup.
      }

      recognitionRef.current = null;
    };
  }, [speechLocale, t]);

  const startListening = (currentText = "") => {
    const speechEnvironment = speechEnvironmentRef.current;

    if (!recognitionRef.current) {
      setSpeechError(
        speechEnvironment.isSecureContext
          ? t("speech.unsupported")
          : t("speech.requiresSecure")
      );
      return;
    }

    if (!speechEnvironment.isSecureContext) {
      setSpeechError(
        speechEnvironment.isLikelyMobile
          ? t("speech.requiresSecureMobile")
          : t("speech.requiresSecure")
      );
      return;
    }

    transcriptSeedRef.current = currentText.trim();
    recognizedTextRef.current = "";
    shouldRestartRef.current = true;
    setSpeechError("");

    try {
      recognitionRef.current.start();
    } catch {
      shouldRestartRef.current = false;
      setIsListening(false);
      setSpeechError(
        speechEnvironment.isLikelyMobile
          ? t("speech.startFailedMobile")
          : t("speech.startFailed")
      );
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) {
      return;
    }

    shouldRestartRef.current = false;

    try {
      recognitionRef.current.stop();
    } catch {
      setIsListening(false);
    }
  };

  const toggleListening = (currentText = "") => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening(currentText);
  };

  const resetTranscript = () => {
    transcriptSeedRef.current = "";
    recognizedTextRef.current = "";
    onTranscriptChangeRef.current?.("");
  };

  return {
    isSupported,
    isListening,
    speechError,
    toggleListening,
    stopListening,
    resetTranscript,
  };
};
