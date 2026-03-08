import { useState } from "react";
import Header from "./Header";
import { AddTodo } from "./AddTodo";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import PendingActionsBadge from "./PendingActionsBadge";
import PendingActionsPanel from "./PendingActionsPanel";

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

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(19rem,23rem)] xl:items-start">
        <section className="space-y-5">
          <AddTodo onAdd={onAdd} />

          <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 p-4 shadow-[0_30px_100px_rgba(17,35,46,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/65 sm:p-5">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Task Flow
                </p>
                <h2 className="display-font mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                  Сфокусированная рабочая лента
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Добавляйте, сортируйте и редактируйте задачи в одном
                  пространстве. Интерфейс подстраивается под мобильный экран и
                  широкий desktop без отдельной логики.
                </p>
              </div>

              <TodoFilter filter={filter} setFilter={setFilter} todos={todos} />
            </div>

            <TodoList
              todos={filteredTodos}
              handleUpdate={handleUpdate}
              toggleComplete={toggleComplete}
              setDeletingId={setDeletingId}
              onReorder={onReorder}
              filter={filter}
            />
          </div>
        </section>

        <aside className="space-y-4 xl:sticky xl:top-5">
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
