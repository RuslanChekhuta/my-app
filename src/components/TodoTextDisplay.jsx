import formatDateTime from "../helpers/dateUtils";
import { useLocalization } from "../hooks/useLocalization";
import { useTaskTranslation } from "../hooks/useTaskTranslation";
import Button from "./ui/Button";
import StatusPill from "./ui/StatusPill";

const TodoTextDisplay = ({ todo, setIsEditing, mobileActions = null }) => {
  const { locale, t } = useLocalization();
  const {
    displayText,
    isTranslated,
    toggleLabel,
    toggleTranslation,
    translationBadgeLabel,
  } = useTaskTranslation(todo.text);
  const isOverdue =
    Boolean(todo.deadline) &&
    !todo.completed &&
    new Date(todo.deadline) < new Date();

  return (
    <div
      className="min-w-0 w-full flex-1 cursor-pointer"
      onDoubleClick={() => setIsEditing(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsEditing(true);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span
        className={`block break-words text-[0.98rem] font-medium leading-6 transition sm:text-[1.05rem] ${
          todo.completed
            ? "text-slate-400 line-through dark:text-slate-500"
            : "text-slate-900 dark:text-slate-100"
        }`}
      >
        {displayText}
      </span>

      <div className="mt-2.5 flex flex-wrap items-start gap-1.5 text-xs sm:mt-3 sm:gap-2">
        <span className="max-w-full break-words rounded-full border border-slate-200 bg-white/90 px-3 py-1 leading-5 text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
          {t("common.created")}: {formatDateTime(todo.createdAt, locale)}
        </span>

        {todo.deadline && (
          <span
            className={`max-w-full break-words rounded-full border px-3 py-1 leading-5 ${
              todo.completed
                ? "border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500"
                : isOverdue
                  ? "border-[rgba(181,38,54,0.18)] bg-[rgba(181,38,54,0.08)] text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]"
                  : "border-[rgba(229,122,74,0.18)] bg-[rgba(229,122,74,0.08)] text-[#a74f28] dark:border-[rgba(255,173,139,0.24)] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]"
            }`}
          >
            {isOverdue ? t("common.overdue") : t("common.deadline")}:{" "}
            {formatDateTime(todo.deadline, locale)}
          </span>
        )}

        <span className="hidden rounded-full border border-transparent bg-slate-100 px-3 py-1 text-slate-500 dark:bg-slate-900/80 dark:text-slate-400 sm:inline-flex">
          {t("task.editHint")}
        </span>

        {isTranslated ? (
          <>
            <StatusPill tone="accent" className="max-w-full">
              {translationBadgeLabel}
            </StatusPill>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                toggleTranslation();
              }}
              onKeyDown={(event) => event.stopPropagation()}
              variant="secondary"
              size="sm"
              className="min-h-8 max-w-full rounded-full px-3 py-1 text-left text-xs whitespace-normal"
            >
              {toggleLabel}
            </Button>
          </>
        ) : null}

        {mobileActions ? (
          <div className="ml-auto flex items-center gap-2 sm:hidden">
            {mobileActions}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TodoTextDisplay;
