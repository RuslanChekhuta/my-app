import { useEffect, useRef, useState } from "react";

const getSpeechRecognitionConstructor = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

const joinTranscriptParts = (...parts) => {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
};

const getSpeechErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "not-allowed":
    case "service-not-allowed":
      return "Доступ к микрофону запрещён. Проверьте разрешения браузера.";
    case "network":
      return "Ошибка сети во время распознавания речи.";
    case "no-speech":
      return "Речь не распознана. Попробуйте сказать задачу ещё раз.";
    default:
      return "Не удалось распознать речь. Попробуйте ещё раз.";
  }
};

export const useSpeechRecognition = ({
  lang = "ru-RU",
  onTranscriptChange,
}) => {
  const recognitionRef = useRef(null);
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
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      setIsSupported(false);
      setSpeechError("Голосовой ввод не поддерживается в этом браузере.");
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = lang;
    recognition.interimResults = true;

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
      setSpeechError(getSpeechErrorMessage(event.error));
    };

    recognition.onend = () => {
      if (shouldRestartRef.current) {
        try {
          recognition.start();
          return;
        } catch {
          shouldRestartRef.current = false;
          setIsListening(false);
          setSpeechError("Не удалось перезапустить запись. Попробуйте ещё раз.");
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
  }, [lang]);

  const startListening = (currentText = "") => {
    if (!recognitionRef.current) {
      setSpeechError("Голосовой ввод не поддерживается в этом браузере.");
      return;
    }

    transcriptSeedRef.current = currentText.trim();
    recognizedTextRef.current = "";
    shouldRestartRef.current = true;
    setSpeechError("");

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      shouldRestartRef.current = false;
      setIsListening(false);
      setSpeechError("Не удалось запустить запись. Попробуйте ещё раз.");
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
