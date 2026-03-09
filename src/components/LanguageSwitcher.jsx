import { useEffect, useRef, useState } from "react";
import {
  RiArrowDownSLine,
  RiCheckLine,
  RiGlobalLine,
} from "react-icons/ri";
import { useLocalization } from "../hooks/useLocalization";
import GlassPanel from "./ui/GlassPanel";

const LanguageSwitcher = () => {
  const { language, languages, setLanguage, t } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const selectedLanguage =
    languages.find((item) => item.code === language) ?? languages[0];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative w-full min-[360px]:w-auto">
      <GlassPanel
        as="div"
        className="flex min-h-14 w-full min-w-0 items-center gap-3 rounded-[1.45rem] border border-slate-200/80 bg-white/86 px-2.5 py-2 shadow-[0_18px_45px_rgba(17,35,46,0.08)] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(7,18,36,0.84),rgba(11,28,52,0.78))] dark:shadow-[0_18px_45px_rgba(2,8,24,0.28)] sm:min-w-[14rem]"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-[rgba(15,105,113,0.08)] text-[#0e6971] dark:bg-white/6 dark:text-slate-200">
          <RiGlobalLine className="text-lg" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 sm:block">
            {t("language.label")}
          </p>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={t("language.label")}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className="flex h-10 w-full items-center justify-between gap-3 rounded-xl pr-1 text-left text-[0.98rem] font-semibold text-slate-900 outline-none transition hover:text-[#0e6971] focus-visible:ring-4 focus-visible:ring-[rgba(21,119,128,0.12)] dark:text-slate-50 dark:hover:text-[#8be4e6] dark:focus-visible:ring-[rgba(84,205,208,0.12)] sm:mt-0.5 sm:h-8"
          >
            <span className="truncate">{selectedLanguage.nativeLabel}</span>
            <span className="flex items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/6 dark:text-slate-300">
                {selectedLanguage.shortLabel}
              </span>
              <RiArrowDownSLine
                className={`text-lg text-slate-400 transition dark:text-slate-500 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </GlassPanel>

      {isOpen ? (
        <div
          role="listbox"
          aria-label={t("language.label")}
          className="absolute top-full right-0 z-50 mt-2 min-w-full overflow-hidden rounded-[1.25rem] border border-slate-200/90 bg-white/96 p-1.5 shadow-[0_24px_55px_rgba(17,35,46,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(8,17,32,0.96)]"
        >
          {languages.map((item) => {
            const isSelected = item.code === language;

            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-[0.9rem] px-3 py-2.5 text-left transition ${
                  isSelected
                    ? "bg-[rgba(21,119,128,0.12)] text-[#0e6971] dark:bg-[rgba(84,205,208,0.14)] dark:text-[#8be4e6]"
                    : "text-slate-700 hover:bg-slate-100/90 dark:text-slate-200 dark:hover:bg-white/6"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {item.nativeLabel}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    {item.shortLabel}
                  </p>
                </div>

                {isSelected ? (
                  <RiCheckLine className="shrink-0 text-base" />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default LanguageSwitcher;
