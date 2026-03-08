import { useState } from "react";
import Header from "./Header";
import { AddTodo } from "./AddTodo";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import PendingActionsBadge from "./PendingActionsBadge";

const MainContent = ({
  onAdd,
  todos,
  handleUpdate,
  toggleComplete,
  setDeletingId,
  onReorder,
  pendingActionsCount,
  isSyncingPending,
}) => {
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });
  return (
    <div className="flex flex-col gap-3 mx-auto">
      <Header />
      <PendingActionsBadge
        pendingActionsCount={pendingActionsCount}
        isSyncingPending={isSyncingPending}
      />
      <AddTodo onAdd={onAdd} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        handleUpdate={handleUpdate}
        toggleComplete={toggleComplete}
        setDeletingId={setDeletingId}
        onReorder={onReorder}
      />
    </div>
  );
};

export default MainContent;
