import { useState } from "react";
import DeadlineBlock from "./DeadlineBlock";
import PlusIcon from "./PlusIcon";
import MicrophoneIcon from "../assets/microphone.png";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

export function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);
  const { isSupported, isListening, speechError, resetTranscript, toggleListening } =
    useSpeechRecognition({
      onTranscriptChange: setText,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      const isAdded = await onAdd(text.trim(), deadline);

      if (!isAdded) {
        return;
      }

      setText("");
      setDeadline("");
      setShowDeadlineInput(false);
      resetTranscript();
    } else {
      alert("Введите текст задачи");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex min-[375px]:flex-row flex-col items-center bg-white dark:bg-page-dark shadow-sm border border-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden dark:text-txt-dark">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Добавить задачу..."
          className="flex-1 p-3 text-gray-700 outline-none placeholder-gray-400 dark:text-gray-200"
        />
        <div className="flex justify-end max-[374px]:justify-center items-center border-1 min-[375px]:border-0 w-full">
          <button
            type="button"
            onClick={() => toggleListening(text)}
            disabled={!isSupported}
            className={`cursor-pointer p-3 ${
              !isSupported
                ? "cursor-not-allowed bg-gray-200 opacity-60 dark:bg-gray-600"
                : isListening
                ? "bg-red-500 hover:bg-red-700"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 hover:dark:bg-gray-700"
            }  transition-colors duration-300 flex items-center justify-center`}
            title={
              !isSupported
                ? "Голосовой ввод недоступен"
                : isListening
                  ? "Остановить запись"
                  : "Начать запись голоса"
            }
          >
            <img
              src={MicrophoneIcon}
              alt="Микрофон"
              className={`w-6 h-6 ${
                isListening ? "filter brightness-0 invert" : ""
              }`}
            />
          </button>
          <button
            type="submit"
            className={`p-3 ${
              isListening
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-btn-light hover:bg-btn-light-hv cursor-pointer"
            }  text-white dark:bg-btn-dark hover:dark:bg-btn-dark-hv transition-colors duration-300 `}
            disabled={isListening}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
        setShowDeadlineInput={setShowDeadlineInput}
      />
      {!isSupported && (
        <div className="mt-2 text-sm text-amber-600 dark:text-amber-400">
          Голосовой ввод не поддерживается в этом браузере.
        </div>
      )}
      {speechError && isSupported && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {speechError}
        </div>
      )}
      {isListening && (
        <div className="flex items-center mt-2 text-blue-500 text-sm">
          <div className="bg-red-500 mr-2 rounded-full w-3 h-3 animate-pulse"></div>
          <span>Идет запись... Нажмите микрофон для остановки</span>
        </div>
      )}
    </form>
  );
}
