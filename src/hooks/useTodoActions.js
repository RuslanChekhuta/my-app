import {
  queueCreateTodoAction,
  queueDeleteTodoAction,
  queueMultipleUpdateActions,
  queueUpdateTodoAction,
} from "../helpers/offlineTodoQueue.js";
import { createTodoSyncSnapshot } from "../helpers/todoHelpers.js";

export const useTodoActions = ({
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
}) => {
  const shouldQueueLocally = !isOnline || pendingActions.length > 0;

  const getQueuedMessage = (actionLabel) => {
    if (!isOnline) {
      return `${actionLabel} сохранено локально и будет синхронизировано после восстановления сети.`;
    }

    return `${actionLabel} добавлено в очередь синхронизации.`;
  };

  const persistQueuedChange = ({
    updatedTodos,
    nextPendingActions,
    message,
  }) => {
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
    setPendingActions(nextPendingActions);
    showInfoMessage(message);
  };

  const onAdd = async (text, deadline) => {
    const newTodo = createNewTodo(text, deadline, getNextTodoOrder(todos));
    const previousTodos = todos;
    const updatedTodos = [...previousTodos, newTodo];

    if (shouldQueueLocally) {
      persistQueuedChange({
        updatedTodos,
        nextPendingActions: queueCreateTodoAction(pendingActions, newTodo),
        message: getQueuedMessage("Новая задача"),
      });
      return true;
    }

    setTodos(updatedTodos);

    try {
      const createdTodo = await createTodo(newTodo);
      const syncedTodos = updatedTodos.map((todo) =>
        todo.id === newTodo.id ? createdTodo : todo
      );
      setTodos(syncedTodos);
      saveToLocalStorage(syncedTodos);
      return true;
    } catch (error) {
      console.error("Ошибка добавления:", error);
      showRequestError("Не удалось добавить задачу.");
      setTodos(previousTodos);
      return false;
    }
  };

  const handleUpdate = async (id, newText, newDeadline) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) return;

    const updatedTodo = updateTodoData(todoToUpdate, newText, newDeadline);

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    if (shouldQueueLocally) {
      persistQueuedChange({
        updatedTodos,
        nextPendingActions: queueUpdateTodoAction(
          pendingActions,
          updatedTodo,
          createTodoSyncSnapshot(todoToUpdate)
        ),
        message: getQueuedMessage("Изменение задачи"),
      });
      return;
    }

    setTodos(updatedTodos);

    try {
      await updateTodo(id, updatedTodo);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка обновления:", error);
      showRequestError("Не удалось сохранить изменения задачи.");
      setTodos(todos);
    }
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) return;

    const updatedTodo = toggleTodoCompletion(todoToUpdate);

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    if (shouldQueueLocally) {
      persistQueuedChange({
        updatedTodos,
        nextPendingActions: queueUpdateTodoAction(
          pendingActions,
          updatedTodo,
          createTodoSyncSnapshot(todoToUpdate)
        ),
        message: getQueuedMessage("Статус задачи"),
      });
      return;
    }

    setTodos(updatedTodos);

    try {
      await updateTodo(id, updatedTodo);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка обновления:", error);
      showRequestError("Не удалось обновить статус задачи.");
      setTodos(todos);
    }
  };

  const handleDelete = async (id) => {
    const previousTodos = todos;
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    if (shouldQueueLocally) {
      persistQueuedChange({
        updatedTodos,
        nextPendingActions: queueDeleteTodoAction(
          pendingActions,
          id,
          createTodoSyncSnapshot(previousTodos.find((todo) => todo.id === id))
        ),
        message: getQueuedMessage("Удаление задачи"),
      });
      return;
    }

    setTodos(updatedTodos);

    try {
      await deleteTodo(id);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка удаления:", error);
      showRequestError("Не удалось удалить задачу.");
      setTodos(previousTodos);
    }
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const handleDeleteCompleted = () => {
    if (!todos.some((todo) => todo.completed)) return;
    setIsDeletingCompleted(true);
  };

  const confirmDeleteCompleted = async () => {
    const originalTodos = [...todos];

    const completedIds = originalTodos
      .filter((t) => t.completed)
      .map((t) => t.id);

    const updatedTodos = originalTodos.filter((todo) => !todo.completed);

    if (shouldQueueLocally) {
      const nextPendingActions = completedIds.reduce((queue, id) => {
        return queueDeleteTodoAction(
          queue,
          id,
          createTodoSyncSnapshot(
            originalTodos.find((todo) => todo.id === id)
          )
        );
      }, pendingActions);

      persistQueuedChange({
        updatedTodos,
        nextPendingActions,
        message: getQueuedMessage("Удаление выполненных задач"),
      });
      setIsDeletingCompleted(false);
      return;
    }

    setTodos(updatedTodos);

    const results = await Promise.allSettled(
      completedIds.map((id) => deleteTodo(id))
    );

    const failedIds = results.reduce((ids, result, index) => {
      if (result.status === "rejected") {
        ids.push(completedIds[index]);
      }
      return ids;
    }, []);

    const finalTodos =
      failedIds.length > 0
        ? originalTodos.filter(
            (todo) => !todo.completed || failedIds.includes(todo.id)
          )
        : updatedTodos;

    if (failedIds.length > 0) {
      showRequestError("Не удалось удалить часть выполненных задач.");
      setTodos(finalTodos);
    }

    saveToLocalStorage(finalTodos);

    setIsDeletingCompleted(false);
  };

  const onReorder = async (activeId, overId) => {
    if (!overId) return;

    const previousTodos = todos;

    try {
      const activeIndex = todos.findIndex((todo) => todo.id === activeId);
      const overIndex = todos.findIndex((todo) => todo.id === overId);

      if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
        return;

      const newTodos = [...todos];
      const [movedTodo] = newTodos.splice(activeIndex, 1);
      newTodos.splice(overIndex, 0, movedTodo);

      const updatedTodos = newTodos.map((todo, index) => ({
        ...todo,
        order: index + 1,
      }));

      if (shouldQueueLocally) {
        persistQueuedChange({
          updatedTodos,
          nextPendingActions: queueMultipleUpdateActions(
            pendingActions,
            updatedTodos,
            previousTodos
          ),
          message: getQueuedMessage("Новый порядок задач"),
        });
        return;
      }

      setTodos(updatedTodos);

      await Promise.all(
        updatedTodos.map((todo) => updateTodo(todo.id, todo))
      );
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка изменения порядка:", error);
      showRequestError("Не удалось сохранить новый порядок задач.");
      setTodos(previousTodos);
    }
  };

  return {
    onAdd,
    handleUpdate,
    toggleComplete,
    handleDelete,
    handleDeleteCompleted,
    confirmDeleteCompleted,
    onReorder,
    hasCompletedTodos,
  };
};
