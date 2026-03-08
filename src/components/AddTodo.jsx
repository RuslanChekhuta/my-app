import { useState } from "react";
import {
  RiArrowRightUpLine,
  RiCalendarScheduleLine,
  RiMicFill,
  RiMicLine,
  RiSparklingLine,
} from "react-icons/ri";
import DeadlineBlock from "./DeadlineBlock";
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
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/82 p-4 shadow-[0_30px_100px_rgba(17,35,46,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/68 sm:p-5"
    >
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,119,128,0.18)] bg-[rgba(21,119,128,0.09)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0e6971] dark:border-[rgba(84,205,208,0.2)] dark:bg-[rgba(84,205,208,0.08)] dark:text-[#8be4e6]">
            <RiSparklingLine className="text-sm" />
            Capture fast
          </div>

          <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-[2rem]">
            Добавьте следующую важную задачу
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Печатайте или диктуйте. Дедлайн можно прикрепить сразу, а
            синхронизация сама догонит сервер при возвращении сети.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900/70">
            Voice input
          </span>
          <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900/70">
            Offline queue
          </span>
          {deadline && (
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(229,122,74,0.18)] bg-[rgba(229,122,74,0.12)] px-3 py-1.5 text-[#a74f28] dark:border-[rgba(255,173,139,0.24)] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]">
              <RiCalendarScheduleLine className="text-sm" />
              {new Date(deadline).toLocaleString("ru-RU", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="group relative block">
          <span className="sr-only">Текст новой задачи</span>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim()) {
                setInputError("");
              }
            }}
            placeholder="Например: подготовить weekly review и созвон с командой"
            className="min-h-14 w-full rounded-[1.35rem] border border-slate-200 bg-[rgba(255,255,255,0.85)] px-4 pr-12 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[rgba(21,119,128,0.5)] focus:ring-4 focus:ring-[rgba(21,119,128,0.12)] dark:border-slate-800 dark:bg-slate-900/75 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[rgba(84,205,208,0.45)] dark:focus:ring-[rgba(84,205,208,0.12)]"
          />
          <RiArrowRightUpLine className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg text-slate-300 transition group-focus-within:text-[#0e6971] dark:text-slate-600 dark:group-focus-within:text-[#8be4e6]" />
        </label>

        <button
          type="button"
          onClick={() => toggleListening(text)}
          disabled={!isSupported}
          className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-[1.35rem] border px-4 text-sm font-semibold transition ${
            !isSupported
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-600"
              : isListening
                ? "border-[rgba(181,38,54,0.24)] bg-[rgba(181,38,54,0.12)] text-[#8f1f2d] shadow-[0_20px_45px_rgba(181,38,54,0.12)] dark:border-[rgba(255,115,141,0.24)] dark:bg-[rgba(181,38,54,0.18)] dark:text-[#ffb1be]"
                : "cursor-pointer border-slate-200 bg-white/85 text-slate-700 hover:border-[rgba(21,119,128,0.28)] hover:text-[#0e6971] dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-[rgba(84,205,208,0.28)] dark:hover:text-[#8be4e6]"
          }`}
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
        </button>

        <button
          type="submit"
          className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-[1.35rem] px-5 text-sm font-semibold text-white transition ${
            isListening
              ? "cursor-not-allowed bg-slate-400 dark:bg-slate-700"
              : "cursor-pointer bg-[linear-gradient(135deg,#157780_0%,#1f8d8d_100%)] shadow-[0_18px_40px_rgba(21,119,128,0.28)] hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(21,119,128,0.34)] dark:bg-[linear-gradient(135deg,#1f8d8d_0%,#40a9aa_100%)]"
          }`}
          disabled={isListening}
        >
          Создать
          <RiArrowRightUpLine className="text-lg" />
        </button>
      </div>

      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
        setShowDeadlineInput={setShowDeadlineInput}
      />
      {inputError && (
        <div className="mt-3 rounded-2xl border border-[rgba(181,38,54,0.18)] bg-[rgba(181,38,54,0.08)] px-4 py-3 text-sm text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]">
          {inputError}
        </div>
      )}
      {!isSupported && (
        <div className="mt-3 rounded-2xl border border-[rgba(229,122,74,0.18)] bg-[rgba(229,122,74,0.08)] px-4 py-3 text-sm text-[#9a4a25] dark:border-[rgba(255,173,139,0.2)] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]">
          Голосовой ввод не поддерживается в этом браузере.
        </div>
      )}
      {speechError && isSupported && (
        <div className="mt-3 rounded-2xl border border-[rgba(181,38,54,0.18)] bg-[rgba(181,38,54,0.08)] px-4 py-3 text-sm text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]">
          {speechError}
        </div>
      )}
      {isListening && (
        <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-[rgba(181,38,54,0.14)] bg-[rgba(181,38,54,0.08)] px-4 py-2 text-sm text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]">
          <div className="h-2.5 w-2.5 rounded-full bg-[#c23647] animate-pulse"></div>
          <span>Идет запись. Нажмите на кнопку микрофона для остановки.</span>
        </div>
      )}
    </form>
  );
}
