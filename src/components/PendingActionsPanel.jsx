import { CONFLICT_STRATEGIES } from "../constants/todos";

const ACTION_LABELS = {
  create: "Создание",
  update: "Обновление",
  delete: "Удаление",
};

const getPendingItemTitle = (action) => {
  if (action.todo?.text) {
    return action.todo.text;
  }

  if (action.type === "delete") {
    return `Задача #${action.todoId}`;
  }

  return "Без названия";
};

const PendingActionsPanel = ({
  pendingActions,
  isSyncingPending,
  conflictStrategy,
  setConflictStrategy,
}) => {
  if (pendingActions.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Очередь синхронизации
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {isSyncingPending
              ? "Первое изменение из очереди сейчас синхронизируется."
              : "Локальные изменения ждут отправки на сервер."}
          </p>
        </div>

        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-200">
          <span>Стратегия конфликтов</span>
          <select
            value={conflictStrategy}
            onChange={(event) => setConflictStrategy(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800"
          >
            <option value={CONFLICT_STRATEGIES.LOCAL_WINS}>
              Локальная версия
            </option>
            <option value={CONFLICT_STRATEGIES.SERVER_WINS}>
              Серверная версия
            </option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3">
        {pendingActions.map((action, index) => (
          <div
            key={`${action.type}-${action.todoId}-${index}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/80"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {ACTION_LABELS[action.type] ?? action.type}:{" "}
                  {getPendingItemTitle(action)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {action.baseTodoSnapshot
                    ? "Есть снимок серверной версии для проверки конфликта."
                    : "Снимок серверной версии не требуется."}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                  isSyncingPending && index === 0
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-200"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200"
                }`}
              >
                {isSyncingPending && index === 0
                  ? "Синхронизируется"
                  : "Ожидает отправки"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PendingActionsPanel;
