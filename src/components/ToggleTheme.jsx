import { FaSun, FaMoon } from "react-icons/fa";

const ToggleTheme = ({ toggleTheme, theme }) => {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/75 px-3 py-2 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="hidden text-right sm:block">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Interface
        </p>
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {theme === "light" ? "Day Shift" : "Night Shift"}
        </p>
      </div>

      <button
        className="relative cursor-pointer"
        onClick={toggleTheme}
        aria-label="Переключить тему"
      >
        <div className="h-9 w-[4.5rem] rounded-full bg-slate-200 shadow-inner transition-colors duration-300 dark:bg-slate-800"></div>
        <div className="absolute top-1 left-1 flex h-7 w-7 transform items-center justify-center rounded-full bg-white text-sm shadow-md transition-transform duration-300 dark:translate-x-9 dark:bg-slate-900">
          {theme === "light" ? (
            <FaSun className="text-amber-500" />
          ) : (
            <FaMoon className="text-cyan-300" />
          )}
        </div>
      </button>
    </div>
  );
};

export default ToggleTheme;
