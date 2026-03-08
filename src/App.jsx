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
      className="flex flex-col justify-center items-center bg-page-light dark:bg-page-dark p-6 min-h-screen"
    >
      <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
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

      <DeleteCompletedButton
        onClick={handleDeleteCompleted}
        hasCompletedTodos={hasCompletedTodos}
      />
    </div>
  );
}

export default App;
