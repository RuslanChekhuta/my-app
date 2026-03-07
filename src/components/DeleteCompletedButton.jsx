import React from "react";

const DeleteCompletedButton = ({ onClick, hasCompletedTodos }) => {
  if (!hasCompletedTodos) return null;

  return (
    <button
      onClick={onClick}
      className="bg-red-500 hover:bg-red-600 mt-4 px-4 py-2 rounded text-white transition-colors cursor-pointer"
    >
      Удалить выполненное
    </button>
  );
};

export default DeleteCompletedButton;
