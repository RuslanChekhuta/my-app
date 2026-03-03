import React from "react";

const ToggleTheme = ({ theme, toggleTheme }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <button className="relative cursor-pointer" onClick={toggleTheme}>
          <div className="bg-gray-300 dark:bg-btn-dark shadow-inner rounded-full w-14 h-7 transition-colors duration-300"></div>
          <div className="top-0.5 left-0.5 absolute bg-white shadow-md rounded-full w-6 h-6 transition-transform translate-x-0 dark:translate-x-7 duration-300 transform"></div>
        </button>
        <span className="ml-3 font-medium text-gray-700 dark:text-gray-300">
          {theme === "light" ? "Светлая" : "Темная"}
        </span>
      </div>
    </div>
  );
};

export default ToggleTheme;
