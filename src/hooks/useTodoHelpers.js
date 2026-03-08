import {
  createNewTodo,
  getNextTodoOrder,
  sortedSavedTodos,
  toggleTodoCompletion,
  updateTodoData,
} from "../helpers/todoHelpers.js";

export const useTodoHelpers = () => {
  return {
    createNewTodo,
    getNextTodoOrder,
    sortedSavedTodos,
    updateTodoData,
    toggleTodoCompletion,
  };
};
