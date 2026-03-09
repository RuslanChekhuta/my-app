import { useState } from "react";
import Header from "./Header";
import { AddTodo } from "./AddTodo";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import PendingActionsBadge from "./PendingActionsBadge";
import PendingActionsPanel from "./PendingActionsPanel";
import EyebrowChip from "./ui/EyebrowChip";
import GlassPanel from "./ui/GlassPanel";
import { useLocalization } from "../hooks/useLocalization";

const MainContent = ({
  onAdd,
  todos,
  handleUpdate,
  toggleComplete,
  setDeletingId,
  onReorder,
  pendingActionsCount,
  isSyncingPending,
  pendingActions,
  conflictStrategy,
  setConflictStrategy,
}) => {
  const { t } = useLocalization();
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 lg:gap-6">
      <Header
        todos={todos}
        pendingActionsCount={pendingActionsCount}
        isSyncingPending={isSyncingPending}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(18rem,22rem)] xl:items-start">
        <section className="min-w-0 space-y-5">
          <AddTodo onAdd={onAdd} />

          <GlassPanel className="motion-fade-up motion-delay-2 p-4 shadow-[0_30px_100px_rgba(17,35,46,0.09)] sm:p-5">
            <div className="mb-5 space-y-4">
              <div className="min-w-0 max-w-3xl">
                <EyebrowChip tone="neutral">{t("main.eyebrow")}</EyebrowChip>
                <h2 className="display-font mt-2 text-[1.7rem] font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
                  {t("main.title")}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t("main.description")}
                </p>
              </div>

              <div className="min-w-0">
                <TodoFilter filter={filter} setFilter={setFilter} todos={todos} />
              </div>
            </div>

            <TodoList
              todos={filteredTodos}
              handleUpdate={handleUpdate}
              toggleComplete={toggleComplete}
              setDeletingId={setDeletingId}
              onReorder={onReorder}
              filter={filter}
            />
          </GlassPanel>
        </section>

        <aside className="min-w-0 space-y-4 xl:sticky xl:top-5">
          <PendingActionsBadge
            pendingActionsCount={pendingActionsCount}
            isSyncingPending={isSyncingPending}
          />
          <PendingActionsPanel
            pendingActions={pendingActions}
            isSyncingPending={isSyncingPending}
            conflictStrategy={conflictStrategy}
            setConflictStrategy={setConflictStrategy}
          />
        </aside>
      </div>
    </div>
  );
};

export default MainContent;
