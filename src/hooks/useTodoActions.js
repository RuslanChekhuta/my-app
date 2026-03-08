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
  showOfflineMessage,
  showRequestError,
}) => {
  const ensureOnline = (message) => {
    if (isOnline) {
      return true;
    }

    showOfflineMessage(message);
    return false;
  };

  const onAdd = async (text, deadline) => {
    if (
      !ensureOnline("Нет подключения к интернету. Добавление задачи недоступно.")
    ) {
      return false;
    }

    const previousTodos = todos;
    const newTodo = createNewTodo(text, deadline, getNextTodoOrder(todos));
    const updatedTodos = [...previousTodos, newTodo];
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
    if (
      !ensureOnline(
        "Нет подключения к интернету. Редактирование задачи недоступно."
      )
    ) {
      return;
    }

    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) return;

    const updatedTodo = updateTodoData(todoToUpdate, newText, newDeadline);

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

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
    if (
      !ensureOnline(
        "Нет подключения к интернету. Изменение статуса задачи недоступно."
      )
    ) {
      return;
    }

    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) return;

    const updatedTodo = toggleTodoCompletion(todoToUpdate);

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

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
    if (
      !ensureOnline("Нет подключения к интернету. Удаление задачи недоступно.")
    ) {
      return;
    }

    const previousTodos = todos;
    const updatedTodos = todos.filter((todo) => todo.id !== id);
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
    if (
      !ensureOnline(
        "Нет подключения к интернету. Удаление выполненных задач недоступно."
      )
    ) {
      return;
    }

    if (!todos.some((todo) => todo.completed)) return;
    setIsDeletingCompleted(true);
  };

  const confirmDeleteCompleted = async () => {
    if (
      !ensureOnline(
        "Нет подключения к интернету. Удаление выполненных задач недоступно."
      )
    ) {
      setIsDeletingCompleted(false);
      return;
    }

    const originalTodos = [...todos];

    const completedIds = originalTodos
      .filter((t) => t.completed)
      .map((t) => t.id);

    const updatedTodos = originalTodos.filter((todo) => !todo.completed);
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

    if (
      !ensureOnline(
        "Нет подключения к интернету. Смена порядка задач недоступна."
      )
    ) {
      return;
    }

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

      setTodos(updatedTodos);

      await Promise.all(
        updatedTodos.map((todo) => updateTodo(todo.id, { order: todo.order }))
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
