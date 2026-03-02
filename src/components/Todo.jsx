import React, { useReducer, useState } from "react";
import { todoReducer, initialState } from "../reducers/todoReducer";

function Todo() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", payload: text });
      setText("");
    }
  };

  return (
    <div>
      <h1>Список задач</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите задачу"
        />
        <button type="submit">Добавить</button>
      </form>

      <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
