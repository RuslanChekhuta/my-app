import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { useTodoApi } from "./useTodoApi.js";
import { useTodoHelpers } from "./useTodoHelpers.js";
import { useTodoActions } from "./useTodoActions.js";
import { useNetworkStatus } from "./useNetworkStatus.js";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);
  const { loadFromLocalStorage, saveToLocalStorage } = useLocalStorage();
  const { fetchTodos, createTodo, updateTodo, deleteTodo } = useTodoApi();
  const {
    createNewTodo,
    getNextTodoOrder,
    sortedSavedTodos,
    toggleTodoCompletion,
    updateTodoData,
  } = useTodoHelpers();
  const { isOnline, showOfflineMessage, showRequestError } =
    useNetworkStatus();

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = sortedSavedTodos(loadFromLocalStorage());

      setTodos(savedTodos);

      if (!isOnline) {
        return;
      }

      try {
        const serverTodos = await fetchTodos();
        const sortedServerTodos = sortedSavedTodos(serverTodos);
        setTodos(sortedServerTodos);
        saveToLocalStorage(sortedServerTodos);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        showRequestError("Не удалось загрузить задачи с сервера.");
      }
    };

    loadInitialData();
  }, [
    fetchTodos,
    isOnline,
    loadFromLocalStorage,
    saveToLocalStorage,
    showRequestError,
    sortedSavedTodos,
  ]);

  const actions = useTodoActions({
    todos,
    setTodos,
    createNewTodo,
    getNextTodoOrder,
    createTodo,
    saveToLocalStorage,
    updateTodo,
    updateTodoData,
    toggleTodoCompletion,
    deleteTodo,
    setIsDeletingCompleted,
    isOnline,
    showOfflineMessage,
    showRequestError,
  });

  return {
    todos,
    setTodos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    ...actions,
  };
};
