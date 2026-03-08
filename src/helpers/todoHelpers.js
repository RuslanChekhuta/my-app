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

export const createNewTodo = (text, deadline, order) => ({
  id: `temp_${Date.now()}`,
  text,
  completed: false,
  createdAt: new Date().toISOString(),
  deadline: deadline || null,
  order,
});

export const updateTodoData = (todo, newText, newDeadline) => ({
  ...todo,
  text: newText,
  deadline: newDeadline,
});

export const toggleTodoCompletion = (todo) => ({
  ...todo,
  completed: !todo.completed,
});
