import {
  queueCreateTodoAction,
  queueDeleteTodoAction,
  queueMultipleUpdateActions,
  queueUpdateTodoAction,
} from "../helpers/offlineTodoQueue.js";
import { createTodoSyncSnapshot } from "../helpers/todoHelpers.js";
import { useLocalization } from "./useLocalization";

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
  const { t } = useLocalization();
  const shouldQueueLocally = !isOnline || pendingActions.length > 0;

  const getQueuedMessage = (actionLabel) => {
    if (!isOnline) {
      return t("todoAction.savedOffline", {
        action: actionLabel,
      });
    }

    return t("todoAction.queued", {
      action: actionLabel,
    });
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
    const updatedTodos = [newTodo, ...previousTodos];

    if (shouldQueueLocally) {
      persistQueuedChange({
        updatedTodos,
        nextPendingActions: queueCreateTodoAction(pendingActions, newTodo),
        message: getQueuedMessage(t("todoAction.label.newTask")),
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
      showRequestError(t("todoAction.addFailed"));
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
        message: getQueuedMessage(t("todoAction.label.taskChange")),
      });
      return;
    }

    setTodos(updatedTodos);

    try {
      await updateTodo(id, updatedTodo);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка обновления:", error);
      showRequestError(t("todoAction.updateFailed"));
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
        message: getQueuedMessage(t("todoAction.label.taskStatus")),
      });
      return;
    }

    setTodos(updatedTodos);

    try {
      await updateTodo(id, updatedTodo);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка обновления:", error);
      showRequestError(t("todoAction.toggleFailed"));
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
        message: getQueuedMessage(t("todoAction.label.taskDelete")),
      });
      return;
    }

    setTodos(updatedTodos);

    try {
      await deleteTodo(id);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка удаления:", error);
      showRequestError(t("todoAction.deleteFailed"));
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
        message: getQueuedMessage(t("todoAction.label.completedDelete")),
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
      showRequestError(t("todoAction.deleteCompletedPartial"));
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
      const changedTodos = updatedTodos.filter((todo) => {
        const previousTodo = previousTodos.find((item) => item.id === todo.id);
        return previousTodo?.order !== todo.order;
      });

      if (shouldQueueLocally) {
        persistQueuedChange({
          updatedTodos,
          nextPendingActions: queueMultipleUpdateActions(
            pendingActions,
            changedTodos,
            previousTodos
          ),
          message: getQueuedMessage(t("todoAction.label.reorder")),
        });
        return;
      }

      setTodos(updatedTodos);

      await Promise.all(changedTodos.map((todo) => updateTodo(todo.id, todo)));
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка изменения порядка:", error);
      showRequestError(t("todoAction.reorderFailed"));
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
