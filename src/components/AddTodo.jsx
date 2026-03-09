import { useState } from "react";
import {
  RiArrowRightUpLine,
  RiCalendarScheduleLine,
  RiMicFill,
  RiMicLine,
  RiSparklingLine,
} from "react-icons/ri";
import DeadlineBlock from "./DeadlineBlock";
import Button from "./ui/Button";
import EyebrowChip from "./ui/EyebrowChip";
import FieldControl from "./ui/FieldControl";
import GlassPanel from "./ui/GlassPanel";
import StatusMessage from "./ui/StatusMessage";
import StatusPill from "./ui/StatusPill";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useLocalization } from "../hooks/useLocalization";
import formatDateTime from "../helpers/dateUtils";

export function AddTodo({ onAdd }) {
  const { locale, t } = useLocalization();
  const defaultPlaceholder = t("add.defaultPlaceholder");
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);
  const [inputError, setInputError] = useState("");
  const hasInputError = Boolean(inputError);
  const {
    isSupported,
    isListening,
    speechError,
    resetTranscript,
    toggleListening,
  } = useSpeechRecognition({
    onTranscriptChange: (nextText) => {
      setText(nextText);
      if (nextText.trim()) {
        setInputError("");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      setInputError(t("add.emptyPlaceholder"));
      return;
    }

    const isAdded = await onAdd(trimmedText, deadline);

    if (!isAdded) {
      return;
    }

    setText("");
    setDeadline("");
    setShowDeadlineInput(false);
    setInputError("");
    resetTranscript();
  };

  return (
    <GlassPanel
      as="form"
      onSubmit={handleSubmit}
      className="motion-fade-up p-4 shadow-[0_30px_100px_rgba(17,35,46,0.12)] motion-delay-1 sm:p-5"
    >
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl min-w-0">
          <EyebrowChip icon={RiSparklingLine}>{t("add.eyebrow")}</EyebrowChip>

          <h2 className="display-font mt-3 text-[1.7rem] font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-[2rem]">
            {t("add.title")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t("add.description")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          <StatusPill tone="neutral">{t("add.voiceInput")}</StatusPill>
          <StatusPill tone="neutral">{t("add.localQueue")}</StatusPill>
          {deadline && (
            <StatusPill icon={RiCalendarScheduleLine} tone="warm">
              {formatDateTime(deadline, locale, {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </StatusPill>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="group relative col-span-2 block md:col-span-1">
          <span className="sr-only">{t("add.inputLabel")}</span>
          <FieldControl
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim()) {
                setInputError("");
              }
            }}
            placeholder={inputError || defaultPlaceholder}
            aria-invalid={hasInputError}
            className={`min-h-14 rounded-[1.35rem] pr-12 text-[15px] ${
              hasInputError
                ? "border-[rgba(181,38,54,0.28)] bg-[rgba(181,38,54,0.06)] text-[#8f1f2d] placeholder:text-[#8f1f2d] focus:border-[rgba(181,38,54,0.45)] focus:ring-[rgba(181,38,54,0.12)] dark:border-[rgba(255,115,141,0.34)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffd3db] dark:placeholder:text-[#ffb1be] dark:focus:border-[rgba(255,115,141,0.42)] dark:focus:ring-[rgba(181,38,54,0.18)]"
                : "dark:border-slate-800"
            }`}
          />
          <RiArrowRightUpLine
            className={`pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg transition ${
              hasInputError
                ? "text-[#b52636] dark:text-[#ff9fb0]"
                : "text-slate-300 group-focus-within:text-[#0e6971] dark:text-slate-600 dark:group-focus-within:text-[#8be4e6]"
            }`}
          />
        </label>

        <Button
          onClick={() => toggleListening(text)}
          disabled={!isSupported}
          variant={
            !isSupported
              ? "secondary"
              : isListening
                ? "dangerSoft"
                : "secondary"
          }
          size="lg"
          className={`w-full justify-center ${!isSupported ? "bg-slate-100 text-slate-400 dark:bg-slate-900/60 dark:text-slate-600" : ""}`}
          title={
            !isSupported
              ? t("add.voiceUnavailable")
              : isListening
                ? t("add.stopRecording")
                : t("add.startVoice")
          }
          aria-label={
            !isSupported
              ? t("add.voiceUnavailable")
              : isListening
                ? t("add.stopRecording")
                : t("add.startRecording")
          }
        >
          {isListening ? (
            <RiMicFill className="text-lg" />
          ) : (
            <RiMicLine className="text-lg" />
          )}
          <span className="hidden sm:inline">
            {isListening ? t("add.recordingShort") : t("add.voiceShort")}
          </span>
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={`w-full justify-center ${isListening ? "bg-slate-400 dark:bg-slate-700" : ""}`}
          disabled={isListening}
        >
          {t("add.create")}
          <RiArrowRightUpLine className="text-lg" />
        </Button>
      </div>

      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
        setShowDeadlineInput={setShowDeadlineInput}
      />
      {!isSupported && (
        <StatusMessage tone="warning" className="motion-fade-up mt-3">
          {speechError || t("speech.unsupported")}
        </StatusMessage>
      )}
      {speechError && isSupported && (
        <StatusMessage tone="error" className="motion-fade-up mt-3">
          {speechError}
        </StatusMessage>
      )}
      {isListening && (
        <StatusPill
          tone="danger"
          dot
          animatedDot
          className="motion-fade-up mt-3"
        >
          {t("add.recordingHint")}
        </StatusPill>
      )}
    </GlassPanel>
  );
}
