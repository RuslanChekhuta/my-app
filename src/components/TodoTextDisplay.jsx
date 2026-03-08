import formatDateTime from "../helpers/dateUtils";

const TodoTextDisplay = ({ todo, setIsEditing }) => {
  const isOverdue =
    Boolean(todo.deadline) &&
    !todo.completed &&
    new Date(todo.deadline) < new Date();

  return (
    <div
      className="min-w-0 flex-1 cursor-pointer"
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
        className={`block text-base font-medium leading-6 transition sm:text-[1.05rem] ${
          todo.completed
            ? "text-slate-400 line-through dark:text-slate-500"
            : "text-slate-900 dark:text-slate-100"
        }`}
      >
        {todo.text}
      </span>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
          Создано: {formatDateTime(todo.createdAt)}
        </span>

        {todo.deadline && (
          <span
            className={`rounded-full border px-3 py-1 ${
              todo.completed
                ? "border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500"
                : isOverdue
                  ? "border-[rgba(181,38,54,0.18)] bg-[rgba(181,38,54,0.08)] text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]"
                  : "border-[rgba(229,122,74,0.18)] bg-[rgba(229,122,74,0.08)] text-[#a74f28] dark:border-[rgba(255,173,139,0.24)] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]"
            }`}
          >
            {isOverdue ? "Просрочено" : "Дедлайн"}: {formatDateTime(todo.deadline)}
          </span>
        )}

        <span className="rounded-full border border-transparent bg-slate-100 px-3 py-1 text-slate-500 dark:bg-slate-900/80 dark:text-slate-400">
          Двойной клик для редактирования
        </span>
      </div>
    </div>
  );
};

export default TodoTextDisplay;
