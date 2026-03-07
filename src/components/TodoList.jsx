import React from "react";
import { TodoItem } from "./TodoItem";

const TodoList = ({ todos, setDeletingId, toggleComplete, handleUpdata }) => {
  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => setDeletingId(todo.id)}
          onToggleComplete={toggleComplete}
          onUpdata={handleUpdata}
        />
      ))}
    </div>
  );
};

export default TodoList;
