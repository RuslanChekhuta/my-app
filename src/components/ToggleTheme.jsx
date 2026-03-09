import { FaSun, FaMoon } from "react-icons/fa";
import GlassPanel from "./ui/GlassPanel";
import { useLocalization } from "../hooks/useLocalization";

const ToggleTheme = ({ toggleTheme, theme }) => {
  const { t } = useLocalization();
  const isLightTheme = theme === "light";

  return (
    <GlassPanel
      as="div"
      className="flex min-h-14 w-full min-w-0 items-center justify-between gap-3 rounded-[1.45rem] border border-slate-200/80 bg-white/86 px-2.5 py-2 shadow-[0_18px_45px_rgba(17,35,46,0.08)] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(7,18,36,0.84),rgba(11,28,52,0.78))] dark:shadow-[0_18px_45px_rgba(2,8,24,0.28)] min-[360px]:w-auto"
    >
      <div className="min-w-0 flex-1">
        <p className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 sm:block">
          {t("theme.interface")}
        </p>
        <p className="text-[0.98rem] font-semibold text-slate-900 dark:text-slate-50 sm:mt-0.5 sm:whitespace-nowrap">
          {isLightTheme ? t("theme.light") : t("theme.dark")}
        </p>
      </div>

      <button
        type="button"
        className="group relative inline-flex h-10 w-[4.5rem] shrink-0 cursor-pointer items-center rounded-full border border-slate-200 bg-slate-100/90 p-1 shadow-inner transition-colors duration-300 touch-manipulation dark:border-white/8 dark:bg-white/8"
        onClick={toggleTheme}
        aria-label={t("theme.toggle")}
      >
        <FaSun
          className={`absolute left-2.5 text-xs transition ${
            isLightTheme
              ? "text-amber-500"
              : "text-slate-300/70 dark:text-slate-500"
          }`}
        />
        <FaMoon
          className={`absolute right-2.5 text-xs transition ${
            isLightTheme
              ? "text-slate-300/80 dark:text-slate-500"
              : "text-cyan-300"
          }`}
        />
        <span
          className={`absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-[0_8px_18px_rgba(15,23,42,0.18)] transition-transform duration-300 dark:bg-slate-950 ${
            isLightTheme ? "" : "translate-x-[2rem]"
          }`}
        >
          {isLightTheme ? (
            <FaSun className="text-amber-500" />
          ) : (
            <FaMoon className="text-cyan-300" />
          )}
        </span>
      </button>
    </GlassPanel>
  );
};

export default ToggleTheme;
