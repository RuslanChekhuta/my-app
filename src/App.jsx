import { useState } from "react";
import ToggleTheme from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./hooks/useTodoManagement";
import DeleteCompletedButton from "./components/DeleteCompletedButton";
import MainContent from "./components/MainContent";

function App() {
  const [theme, setTheme] = useState(getInitialTheme());

  const {
    todos,
    onAdd,
    handleUpdata,
    toggleComplete,
    handleDelete,
    hasCompletedTodos,
    handleDeletingCompleted,
    confirmDeletingCompleted,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
  } = useTodoManagement();

  return (
    <div
      data-theme={theme}
      className="flex flex-col justify-center items-center bg-page-light dark:bg-page-dark p-6 min-h-screen"
    >
      <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />

      <MainContent
        onAdd={onAdd}
        todos={todos}
        setDeletingId={setDeletingId}
        toggleComplete={toggleComplete}
        handleUpdata={handleUpdata}
      />

      <DeleteConfirmModal
        onCancel={() => setDeletingId(null)}
        onConfirm={() => {
          handleDelete(deletingId);
          setDeletingId(null);
        }}
        message="Вы уверены что хотите удалить эту задачу?"
        deletingId={deletingId}
      />

      <DeleteConfirmModal
        onCancel={() => setIsDeletingCompleted(false)}
        onConfirm={confirmDeletingCompleted}
        message={`Вы уверены что хотите удалить все выполненные задачи ${todos.filter((todo) => todo.completed).length}?`}
        isDeletingCompleted={isDeletingCompleted}
      />

      <DeleteCompletedButton
        onClick={handleDeletingCompleted}
        hasCompletedTodos={hasCompletedTodos}
      />
    </div>
  );
}

export default App;
