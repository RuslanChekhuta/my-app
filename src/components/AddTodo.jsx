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

export function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);
  const [inputError, setInputError] = useState("");
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
      setInputError("Введите текст задачи.");
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
      className="motion-fade-up p-4 shadow-[0_30px_100px_rgba(17,35,46,0.12)] sm:p-5 motion-delay-1"
    >
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <EyebrowChip icon={RiSparklingLine}>Быстрый ввод</EyebrowChip>

          <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-[2rem]">
            Добавьте следующую важную задачу
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Печатайте или диктуйте. Дедлайн можно прикрепить сразу, а
            синхронизация сама догонит сервер при возвращении сети.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          <StatusPill tone="neutral">Голосовой ввод</StatusPill>
          <StatusPill tone="neutral">Локальная очередь</StatusPill>
          {deadline && (
            <StatusPill icon={RiCalendarScheduleLine} tone="warm">
              {new Date(deadline).toLocaleString("ru-RU", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </StatusPill>
          )}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="group relative block">
          <span className="sr-only">Текст новой задачи</span>
          <FieldControl
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim()) {
                setInputError("");
              }
            }}
            placeholder="Например: подготовить обзор недели и созвон с командой"
            className="min-h-14 rounded-[1.35rem] bg-[rgba(255,255,255,0.85)] pr-12 text-[15px] dark:border-slate-800 dark:bg-slate-900/75"
          />
          <RiArrowRightUpLine className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg text-slate-300 transition group-focus-within:text-[#0e6971] dark:text-slate-600 dark:group-focus-within:text-[#8be4e6]" />
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
          className={!isSupported ? "bg-slate-100 text-slate-400 dark:bg-slate-900/60 dark:text-slate-600" : ""}
          title={
            !isSupported
              ? "Голосовой ввод недоступен"
              : isListening
                ? "Остановить запись"
                : "Начать запись голоса"
          }
          aria-label={
            !isSupported
              ? "Голосовой ввод недоступен"
              : isListening
                ? "Остановить запись"
                : "Начать запись"
          }
        >
          {isListening ? (
            <RiMicFill className="text-lg" />
          ) : (
            <RiMicLine className="text-lg" />
          )}
          <span className="hidden sm:inline">
            {isListening ? "Запись" : "Голос"}
          </span>
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={isListening ? "bg-slate-400 dark:bg-slate-700" : ""}
          disabled={isListening}
        >
          Создать
          <RiArrowRightUpLine className="text-lg" />
        </Button>
      </div>

      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
        setShowDeadlineInput={setShowDeadlineInput}
      />
      {inputError && (
        <StatusMessage tone="error" className="motion-fade-up mt-3">
          {inputError}
        </StatusMessage>
      )}
      {!isSupported && (
        <StatusMessage tone="warning" className="motion-fade-up mt-3">
          Голосовой ввод не поддерживается в этом браузере.
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
          Идет запись. Нажмите на кнопку микрофона для остановки.
        </StatusPill>
      )}
    </GlassPanel>
  );
}
