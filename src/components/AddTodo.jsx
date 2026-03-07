import { useState } from "react";
import DeadlineBlock from "./DeadlineBlock";
import PlusIcon from "./PlusIcon";

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
          <PlusIcon />
        </button>
      </div>
      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
        setShowDeadlineInput={setShowDeadlineInput}
      />
    </form>
  );
}
