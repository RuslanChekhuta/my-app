export const sortedSavedTodos = (todos) => {
  return [...todos].sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) -
      (b.order ?? Number.MAX_SAFE_INTEGER)
  );
};

export const getNextTodoOrder = (todos) => {
  return todos.reduce((maxOrder, todo) => {
    return Math.max(maxOrder, todo.order ?? 0);
  }, 0) + 1;
};

const getCurrentTimestamp = () => new Date().toISOString();

export const createTodoSyncSnapshot = (todo) => {
  if (!todo) {
    return null;
  }

  return {
    text: todo.text,
    completed: todo.completed,
    deadline: todo.deadline ?? null,
    order: todo.order ?? null,
    updatedAt: todo.updatedAt ?? null,
  };
};

export const hasTodoConflict = (serverTodo, baseSnapshot) => {
  if (!serverTodo || !baseSnapshot) {
    return false;
  }

  return (
    serverTodo.text !== baseSnapshot.text ||
    serverTodo.completed !== baseSnapshot.completed ||
    (serverTodo.deadline ?? null) !== baseSnapshot.deadline ||
    (serverTodo.order ?? null) !== baseSnapshot.order ||
    (serverTodo.updatedAt ?? null) !== baseSnapshot.updatedAt
  );
};

export const createNewTodo = (text, deadline, order) => {
  const now = getCurrentTimestamp();

  return {
    id: `temp_${Date.now()}`,
    text,
    completed: false,
    createdAt: now,
    updatedAt: now,
    deadline: deadline || null,
    order,
  };
};

export const updateTodoData = (todo, newText, newDeadline) => ({
  ...todo,
  text: newText,
  deadline: newDeadline,
  updatedAt: getCurrentTimestamp(),
});

export const toggleTodoCompletion = (todo) => ({
  ...todo,
  completed: !todo.completed,
  updatedAt: getCurrentTimestamp(),
});
