import { useEffect, useRef, useState } from "react";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../api/todoApi.js";
import {
  loadPendingActions,
  savePendingActions,
} from "../helpers/offlineTodoQueue.js";
import { loadFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import {
  createNewTodo,
  getNextTodoOrder,
  sortedSavedTodos,
  toggleTodoCompletion,
  updateTodoData,
} from "../helpers/todoHelpers.js";
import { useTodoActions } from "./useTodoActions.js";
import { useNetworkStatus } from "./useNetworkStatus.js";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);
  const [pendingActions, setPendingActions] = useState(loadPendingActions);
  const todosRef = useRef([]);
  const isSyncingPendingRef = useRef(false);
  const { isOnline, showInfoMessage, showRequestError, showSuccessMessage } =
    useNetworkStatus();

  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  useEffect(() => {
    savePendingActions(pendingActions);
  }, [pendingActions]);

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = sortedSavedTodos(loadFromLocalStorage());

      setTodos(savedTodos);

      if (!isOnline) {
        return;
      }

      if (pendingActions.length > 0) {
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
    isOnline,
    pendingActions.length,
    showRequestError,
  ]);

  useEffect(() => {
    if (!isOnline || pendingActions.length === 0 || isSyncingPendingRef.current) {
      return;
    }

    let isCancelled = false;

    const syncNextPendingAction = async () => {
      const [currentAction, ...remainingActions] = pendingActions;

      if (!currentAction) {
        return;
      }

      isSyncingPendingRef.current = true;

      try {
        let syncedTodos = [...todosRef.current];

        if (currentAction.type === "create") {
          const { id: temporaryId, ...todoPayload } = currentAction.todo;
          const createdTodo = await createTodo(todoPayload);

          syncedTodos = syncedTodos.map((todo) =>
            todo.id === temporaryId ? { ...currentAction.todo, ...createdTodo } : todo
          );
        }

        if (currentAction.type === "update") {
          await updateTodo(currentAction.todoId, currentAction.todo);
          syncedTodos = syncedTodos.map((todo) =>
            todo.id === currentAction.todoId ? currentAction.todo : todo
          );
        }

        if (currentAction.type === "delete") {
          await deleteTodo(currentAction.todoId);
          syncedTodos = syncedTodos.filter(
            (todo) => todo.id !== currentAction.todoId
          );
        }

        if (!isCancelled) {
          setTodos(syncedTodos);
          saveToLocalStorage(syncedTodos);
          setPendingActions(remainingActions);

          if (remainingActions.length === 0) {
            showSuccessMessage("Локальные изменения синхронизированы.");
          }
        }
      } catch (error) {
        console.error("Ошибка синхронизации локальных изменений:", error);

        if (!isCancelled) {
          showRequestError(
            "Не удалось синхронизировать локальные изменения. Повторим позже."
          );
        }
      } finally {
        isSyncingPendingRef.current = false;
      }
    };

    syncNextPendingAction();

    return () => {
      isCancelled = true;
    };
  }, [
    isOnline,
    pendingActions,
    showRequestError,
    showSuccessMessage,
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
    pendingActions,
    setPendingActions,
    showInfoMessage,
    showRequestError,
  });

  return {
    todos,
    setTodos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    pendingActions,
    ...actions,
  };
};
