import { useState } from "react";

export function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, deadline);
      setText("");
      setDeadline("");
      setShowDeadlineInput(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-white shadow-sm border border-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить задачу..."
          className="flex-1 dark:bg-page-dark p-3 outline-none text-gray-700 dark:text-txt-dark placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-btn-light hover:bg-btn-light-hv hover:dark:bg-btn-dark-hv dark:bg-btn-dark p-3 text-white transition-colors duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      {showDeadlineInput && (
        <div className="flex items-center gap-2 mt-2 text-gray-500">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => {
              setDeadline("");
              setShowDeadlineInput(false);
            }}
            className="p-2 hover:text-gray-700"
          >
            Отмена
          </button>
        </div>
      )}
      {!showDeadlineInput && (
        <button
          type="button"
          onClick={() => {
            setDeadline("");
            setShowDeadlineInput(true);
          }}
          className="p-2 text-blue-500 hover:text-blue-700"
        >
          + Добавить дедлайн
        </button>
      )}
    </form>
  );
}
