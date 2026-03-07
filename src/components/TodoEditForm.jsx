import React from "react";
import CheckedIcon from "./CheckedIcon";

const TodoEditForm = ({
  editText,
  setEditText,
  innerRef,
  editDeadline,
  setEditDeadline,
  onSave,
}) => {
  return (
    <div className="flex flex-col items-stretch gap-2 w-full" ref={innerRef}>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSave()}
        className="px-2 py-1 border-2 border-blue-500 rounded w-full text-gray-700 dark:text-gray-300 text-sm"
      />
      <div className="flex sm:flex-row flex-col gap-2 w-full">
        <input
          type="datetime-local"
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          className="sm:flex-1 px-2 py-1 border-2 border-blue-500 rounded w-full text-gray-700 dark:text-gray-300 text-sm"
        />
        <button
          onClick={onSave}
          className="flex justify-center items-center gap-1 bg-white px-2 sm:px-3 py-1 sm:py-1 border-2 border-green-500 hover:border-green-50 text-green-600 hover:text-green-800 text-sm sm:text-base transition-colors cursor-pointer"
        >
          <CheckedIcon />
          <span className="sm:hidden">OK</span>
          <span className="hidden sm:inline">Готово</span>
        </button>
      </div>
    </div>
  );
};

export default TodoEditForm;
