import { lazy, Suspense, useState } from "react";
import ToggleTheme from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./hooks/useTodoManagement";
import DeleteCompletedButton from "./components/DeleteCompletedButton";
import Loader from "./components/Loader";
import Notification from "./components/Notification";

const MainContent = lazy(() => import("./components/MainContent"));

function App() {
  const [theme, setTheme] = useState(getInitialTheme());

  const {
    todos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    onAdd,
    handleUpdate,
    toggleComplete,
    handleDelete,
    handleDeleteCompleted,
    confirmDeleteCompleted,
    hasCompletedTodos,
    onReorder,
    pendingActions,
    isSyncingPending,
    conflictStrategy,
    setConflictStrategy,
  } = useTodoManagement();

  return (
    <div
      data-theme={theme}
      className="relative min-h-screen overflow-hidden bg-page-light text-txt-light dark:bg-page-dark dark:text-txt-dark"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-5rem] h-72 w-72 rounded-full bg-[rgba(229,122,74,0.22)] blur-3xl"></div>
        <div className="absolute top-1/3 left-[-6rem] h-80 w-80 rounded-full bg-[rgba(21,119,128,0.16)] blur-3xl"></div>
        <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-[rgba(255,255,255,0.1)] blur-3xl dark:bg-[rgba(26,140,148,0.12)]"></div>
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-10">
        <div className="mb-4 flex justify-end sm:mb-6">
          <ToggleTheme
            toggleTheme={() => toggleTheme(setTheme)}
            theme={theme}
          />
        </div>

        <Notification />

        <Suspense fallback={<Loader />}>
          <MainContent
            onAdd={onAdd}
            todos={todos}
            handleUpdate={handleUpdate}
            toggleComplete={toggleComplete}
            setDeletingId={setDeletingId}
            onReorder={onReorder}
            pendingActionsCount={pendingActions.length}
            isSyncingPending={isSyncingPending}
            pendingActions={pendingActions}
            conflictStrategy={conflictStrategy}
            setConflictStrategy={setConflictStrategy}
          />
        </Suspense>

        <DeleteCompletedButton
          onClick={handleDeleteCompleted}
          hasCompletedTodos={hasCompletedTodos}
        />
      </div>

      <DeleteConfirmModal
        isOpen={Boolean(deletingId)}
        onCancel={() => setDeletingId(null)}
        onConfirm={() => {
          handleDelete(deletingId);
          setDeletingId(null);
        }}
        message="Вы уверены, что хотите удалить эту задачу?"
      />

      <DeleteConfirmModal
        isOpen={isDeletingCompleted}
        onCancel={() => setIsDeletingCompleted(false)}
        onConfirm={confirmDeleteCompleted}
        message={`Вы уверены, что хотите удалить все выполненные задачи (${
          todos.filter((todo) => todo.completed).length
        })?`}
      />
    </div>
  );
}

export default App;
