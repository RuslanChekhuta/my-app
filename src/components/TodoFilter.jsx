import React from "react";

const TodoFilter = ({ filter, setFilter }) => {
  const buttonClasses = (currentFilter) => {
    return `px-4 py-2 rounded transition-color cursor-pointer ${
      filter === currentFilter
        ? "bg-blue-500 text-white"
        : "bg-blue-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button onClick={() => setFilter("all")} className={buttonClasses("all")}>
        Все
      </button>
      <button
        onClick={() => setFilter("active")}
        className={buttonClasses("active")}
      >
        Не выполенные
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={buttonClasses("completed")}
      >
        Выполенные
      </button>
    </div>
  );
};

export default TodoFilter;
