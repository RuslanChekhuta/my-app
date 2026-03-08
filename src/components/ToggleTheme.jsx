import NetWorkProvider from "../providers/NetWorkProvider";
import Notification from "./Notification";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleTheme = ({ toggleTheme, theme }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <button className="relative cursor-pointer" onClick={toggleTheme}>
          <div className="bg-gray-300 dark:bg-btn-dark shadow-inner rounded-full w-14 h-7 transition-colors duration-300"></div>
          <div className="top-0.5 left-0.5 absolute flex justify-center items-center bg-white shadow-md rounded-full w-6 h-6 text-sm transition-transform translate-x-0 dark:translate-x-7 duration-300 transform">
            {" "}
            {theme === "light" ? (
              <FaSun className="text-yellow-500" />
            ) : (
              <FaMoon className="text-blue-700" />
            )}
          </div>
        </button>
      </div>
      <NetWorkProvider>
        <Notification />
      </NetWorkProvider>
    </div>
  );
};

export default ToggleTheme;
