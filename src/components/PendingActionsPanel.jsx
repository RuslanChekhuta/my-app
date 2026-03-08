import {
  RiArrowUpCircleLine,
  RiCloudLine,
  RiShieldCheckLine,
} from "react-icons/ri";
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
  return (
    <section className="rounded-[1.75rem] border border-white/70 bg-white/82 p-4 shadow-[0_30px_100px_rgba(17,35,46,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/65 sm:p-5">
      <div className="flex flex-col gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,119,128,0.16)] bg-[rgba(21,119,128,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0e6971] dark:border-[rgba(84,205,208,0.18)] dark:bg-[rgba(84,205,208,0.1)] dark:text-[#8be4e6]">
            <RiCloudLine className="text-sm" />
            Sync Deck
          </div>

          <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Очередь синхронизации
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {pendingActions.length === 0
              ? "Изменения уже на сервере. Можно спокойно продолжать работу."
              : isSyncingPending
                ? "Первое изменение из очереди сейчас синхронизируется."
                : "Локальные изменения ждут отправки на сервер."}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-[rgba(248,246,242,0.8)] p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Queue
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
              {pendingActions.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[rgba(248,246,242,0.8)] p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Status
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
              {isSyncingPending ? "Сейчас идёт sync" : "Ожидание"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[rgba(248,246,242,0.8)] p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Strategy
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
              {conflictStrategy === CONFLICT_STRATEGIES.LOCAL_WINS
                ? "Local wins"
                : "Server wins"}
            </p>
          </div>
        </div>

        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-200">
          <span>Стратегия конфликтов</span>
          <select
            value={conflictStrategy}
            onChange={(event) => setConflictStrategy(event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 bg-white/85 px-4 text-sm outline-none transition focus:border-[rgba(21,119,128,0.4)] focus:ring-4 focus:ring-[rgba(21,119,128,0.12)] dark:border-slate-700 dark:bg-slate-900/75 dark:focus:border-[rgba(84,205,208,0.35)] dark:focus:ring-[rgba(84,205,208,0.12)]"
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

      <div className="mt-5 space-y-3">
        {pendingActions.length === 0 ? (
          <div className="rounded-[1.35rem] border border-dashed border-slate-300 bg-[rgba(248,246,242,0.72)] p-4 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-300">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(21,119,128,0.08)] text-[#0e6971] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6]">
              <RiShieldCheckLine className="text-lg" />
            </div>
            Очередь пуста. Приложение синхронизировано и готово к новым задачам.
          </div>
        ) : (
          pendingActions.map((action, index) => (
            <div
              key={`${action.type}-${action.todoId}-${index}`}
              className="rounded-[1.35rem] border border-slate-200 bg-[rgba(248,246,242,0.76)] p-4 dark:border-slate-800 dark:bg-slate-900/72"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300">
                      <RiArrowUpCircleLine className="text-sm" />
                      {ACTION_LABELS[action.type] ?? action.type}
                    </span>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
                      {getPendingItemTitle(action)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {action.baseTodoSnapshot
                        ? "Есть снимок серверной версии для проверки конфликта."
                        : "Снимок серверной версии не требуется."}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      isSyncingPending && index === 0
                        ? "bg-[rgba(21,119,128,0.1)] text-[#0e6971] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6]"
                        : "bg-[rgba(229,122,74,0.12)] text-[#9a4a25] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]"
                    }`}
                  >
                    {isSyncingPending && index === 0
                      ? "Синхронизируется"
                      : "Ждёт отправки"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PendingActionsPanel;
