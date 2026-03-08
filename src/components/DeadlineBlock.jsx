import { RiCalendarScheduleLine, RiCloseLine } from "react-icons/ri";
import formatDateTime from "../helpers/dateUtils";

const DeadlineBlock = ({
  showDeadlineInput,
  deadline,
  setDeadline,
  setShowDeadlineInput,
}) => {
  return (
    <div className="mt-4">
      {showDeadlineInput && (
        <div className="flex flex-col gap-3 rounded-[1.35rem] border border-slate-200 bg-[rgba(248,246,242,0.75)] p-3 dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-white/85 px-4 text-sm text-slate-800 outline-none transition focus:border-[rgba(21,119,128,0.5)] focus:ring-4 focus:ring-[rgba(21,119,128,0.12)] dark:border-slate-700 dark:bg-slate-950/75 dark:text-slate-100 dark:focus:border-[rgba(84,205,208,0.45)] dark:focus:ring-[rgba(84,205,208,0.12)]"
          />

          <div className="flex flex-wrap items-center gap-2">
            {deadline && (
              <button
                type="button"
                onClick={() => setDeadline("")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(229,122,74,0.18)] px-4 text-sm font-medium text-[#9a4a25] transition hover:bg-[rgba(229,122,74,0.08)] dark:border-[rgba(255,173,139,0.22)] dark:text-[#ffc7af] dark:hover:bg-[rgba(229,122,74,0.14)]"
              >
                Очистить
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setDeadline("");
                setShowDeadlineInput(false);
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            >
              Скрыть
            </button>
          </div>
        </div>
      )}
      {!showDeadlineInput && (
        <button
          type="button"
          onClick={() => {
            setShowDeadlineInput(true);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[rgba(21,119,128,0.25)] hover:text-[#0e6971] dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-[rgba(84,205,208,0.25)] dark:hover:text-[#8be4e6]"
        >
          {deadline ? (
            <>
              <RiCalendarScheduleLine className="text-base" />
              <span>Дедлайн: {formatDateTime(deadline)}</span>
              <RiCloseLine className="text-base opacity-60" />
            </>
          ) : (
            <>
              <RiCalendarScheduleLine className="text-base" />
              <span>Добавить дедлайн</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default DeadlineBlock;
