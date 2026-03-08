import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../api/todoApi.js";

export const useTodoApi = () => {
  return { fetchTodos, createTodo, updateTodo, deleteTodo };
};
