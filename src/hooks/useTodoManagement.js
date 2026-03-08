import { useEffect, useRef, useState } from "react";
import {
  createTodo,
  deleteTodo,
  fetchTodoById,
  fetchTodos,
  updateTodo,
} from "../api/todoApi.js";
import {
  discardPendingActionsForTodoId,
  loadPendingActions,
  remapPendingActionTodoId,
  savePendingActions,
} from "../helpers/offlineTodoQueue.js";
import {
  loadConflictStrategy,
  saveConflictStrategy,
} from "../helpers/syncPreferences.js";
import { loadFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import {
  createNewTodo,
  getNextTodoOrder,
  hasTodoConflict,
  sortedSavedTodos,
  toggleTodoCompletion,
  updateTodoData,
} from "../helpers/todoHelpers.js";
import { useTodoActions } from "./useTodoActions.js";
import { useNetworkStatus } from "./useNetworkStatus.js";
import { CONFLICT_STRATEGIES } from "../constants/todos";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);
  const [pendingActions, setPendingActions] = useState(loadPendingActions);
  const [isSyncingPending, setIsSyncingPending] = useState(false);
  const [conflictStrategy, setConflictStrategy] = useState(loadConflictStrategy);
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
    saveConflictStrategy(conflictStrategy);
  }, [conflictStrategy]);

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
      setIsSyncingPending(true);

      try {
        let syncedTodos = [...todosRef.current];
        let nextPendingActions = remainingActions;

        if (currentAction.type === "create") {
          const { id: temporaryId, ...todoPayload } = currentAction.todo;
          const createdTodo = await createTodo(todoPayload);
          const resolvedTodo = { ...currentAction.todo, ...createdTodo };

          syncedTodos = syncedTodos.map((todo) =>
            todo.id === temporaryId ? resolvedTodo : todo
          );
          nextPendingActions = remapPendingActionTodoId(
            remainingActions,
            temporaryId,
            resolvedTodo
          );
        }

        if (currentAction.type === "update") {
          const serverTodo = await fetchTodoById(currentAction.todoId);

          if (!serverTodo) {
            if (conflictStrategy === CONFLICT_STRATEGIES.SERVER_WINS) {
              syncedTodos = syncedTodos.filter(
                (todo) => todo.id !== currentAction.todoId
              );
              nextPendingActions = discardPendingActionsForTodoId(
                remainingActions,
                currentAction.todoId
              );
              showInfoMessage(
                "Задача уже отсутствует на сервере. Принята серверная версия."
              );
            } else {
              const { id: previousId, ...todoPayload } = currentAction.todo;
              const recreatedTodo = await createTodo(todoPayload);
              const resolvedTodo = {
                ...currentAction.todo,
                ...recreatedTodo,
              };

              syncedTodos = syncedTodos.map((todo) =>
                todo.id === previousId ? resolvedTodo : todo
              );
              nextPendingActions = remapPendingActionTodoId(
                remainingActions,
                previousId,
                resolvedTodo
              );
              showInfoMessage(
                "Задача была удалена на сервере. Локальная версия создана заново."
              );
            }
          } else {
            const hasConflict = hasTodoConflict(
              serverTodo,
              currentAction.baseTodoSnapshot
            );

            if (
              hasConflict &&
              conflictStrategy === CONFLICT_STRATEGIES.SERVER_WINS
            ) {
              syncedTodos = syncedTodos.map((todo) =>
                todo.id === currentAction.todoId ? serverTodo : todo
              );
              showInfoMessage(
                "Обнаружен конфликт версии задачи. Принята серверная версия."
              );
            } else {
              if (hasConflict) {
                showInfoMessage(
                  "Обнаружен конфликт версии задачи. Применена локальная версия."
                );
              }

              await updateTodo(currentAction.todoId, currentAction.todo);
              syncedTodos = syncedTodos.map((todo) =>
                todo.id === currentAction.todoId ? currentAction.todo : todo
              );
            }

            if (
              hasConflict &&
              conflictStrategy === CONFLICT_STRATEGIES.SERVER_WINS
            ) {
              nextPendingActions = remainingActions;
            } else if (hasConflict) {
              showInfoMessage(
                "Синхронизация конфликта завершена по стратегии локальной версии."
              );
            }
          }
        }

        if (currentAction.type === "delete") {
          const serverTodo = await fetchTodoById(currentAction.todoId);
          let shouldKeepServerTodo = false;

          if (serverTodo) {
            const hasConflict = hasTodoConflict(
              serverTodo,
              currentAction.baseTodoSnapshot
            );

            if (
              hasConflict &&
              conflictStrategy === CONFLICT_STRATEGIES.SERVER_WINS
            ) {
              syncedTodos = syncedTodos.map((todo) =>
                todo.id === currentAction.todoId ? serverTodo : todo
              );
              shouldKeepServerTodo = true;
              showInfoMessage(
                "Удаление отменено: при конфликте принята серверная версия."
              );
            } else {
              if (hasConflict) {
                showInfoMessage(
                  "Обнаружен конфликт перед удалением. Выбрано локальное удаление."
                );
              }

              await deleteTodo(currentAction.todoId);
              syncedTodos = syncedTodos.filter(
                (todo) => todo.id !== currentAction.todoId
              );
            }
          } else {
            if (conflictStrategy === CONFLICT_STRATEGIES.SERVER_WINS) {
              showInfoMessage(
                "Задача уже отсутствует на сервере. Удаление завершено серверной версией."
              );
            } else {
              showInfoMessage(
                "Задача уже отсутствует на сервере. Локальное удаление подтверждено."
              );
            }
          }
          syncedTodos =
            shouldKeepServerTodo
              ? syncedTodos
              : syncedTodos.filter((todo) => todo.id !== currentAction.todoId);
        }

        if (!isCancelled) {
          setTodos(syncedTodos);
          saveToLocalStorage(syncedTodos);
          setPendingActions(nextPendingActions);

          if (nextPendingActions.length === 0) {
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
        setIsSyncingPending(false);
      }
    };

    syncNextPendingAction();

    return () => {
      isCancelled = true;
    };
  }, [
    isOnline,
    pendingActions,
    conflictStrategy,
    showInfoMessage,
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
    isSyncingPending,
    conflictStrategy,
    setConflictStrategy,
    ...actions,
  };
};
