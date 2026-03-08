import { PENDING_ACTIONS_KEY } from "../constants/todos";

const findLastActionIndex = (pendingActions, todoId, type) => {
  for (let index = pendingActions.length - 1; index >= 0; index -= 1) {
    const action = pendingActions[index];

    if (action.todoId === todoId && action.type === type) {
      return index;
    }
  }

  return -1;
};

export const loadPendingActions = () => {
  try {
    const data = localStorage.getItem(PENDING_ACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Не удалось прочитать очередь офлайн-действий:", error);
    localStorage.removeItem(PENDING_ACTIONS_KEY);
    return [];
  }
};

export const savePendingActions = (pendingActions) => {
  localStorage.setItem(PENDING_ACTIONS_KEY, JSON.stringify(pendingActions));
};

export const queueCreateTodoAction = (pendingActions, todo) => {
  return [
    ...pendingActions,
    {
      type: "create",
      todoId: todo.id,
      todo,
    },
  ];
};

export const queueUpdateTodoAction = (
  pendingActions,
  todo,
  baseTodoSnapshot = null
) => {
  const createIndex = findLastActionIndex(pendingActions, todo.id, "create");

  if (createIndex !== -1) {
    const nextPendingActions = [...pendingActions];
    nextPendingActions[createIndex] = {
      ...nextPendingActions[createIndex],
      todo,
    };
    return nextPendingActions;
  }

  const updateIndex = findLastActionIndex(pendingActions, todo.id, "update");

  if (updateIndex !== -1) {
    const nextPendingActions = [...pendingActions];
    nextPendingActions[updateIndex] = {
      ...nextPendingActions[updateIndex],
      todo,
    };
    return nextPendingActions;
  }

  return [
    ...pendingActions,
    {
      type: "update",
      todoId: todo.id,
      todo,
      baseTodoSnapshot,
    },
  ];
};

export const queueDeleteTodoAction = (
  pendingActions,
  todoId,
  baseTodoSnapshot = null
) => {
  const hasPendingCreate = pendingActions.some(
    (action) => action.todoId === todoId && action.type === "create"
  );
  const existingAction = pendingActions.find((action) => action.todoId === todoId);

  const filteredPendingActions = pendingActions.filter(
    (action) => action.todoId !== todoId
  );

  if (hasPendingCreate) {
    return filteredPendingActions;
  }

  return [
    ...filteredPendingActions,
    {
      type: "delete",
      todoId,
      baseTodoSnapshot: existingAction?.baseTodoSnapshot ?? baseTodoSnapshot,
    },
  ];
};

export const queueMultipleUpdateActions = (
  pendingActions,
  todos,
  previousTodos = []
) => {
  return todos.reduce((nextPendingActions, todo) => {
    const previousTodo = previousTodos.find((item) => item.id === todo.id);

    return queueUpdateTodoAction(
      nextPendingActions,
      todo,
      previousTodo ?? null
    );
  }, pendingActions);
};

export const remapPendingActionTodoId = (pendingActions, previousId, nextTodo) => {
  return pendingActions.map((action) => {
    if (action.todoId !== previousId) {
      return action;
    }

    return {
      ...action,
      todoId: nextTodo.id,
      todo: action.todo ? { ...action.todo, ...nextTodo, id: nextTodo.id } : action.todo,
    };
  });
};

export const discardPendingActionsForTodoId = (pendingActions, todoId) => {
  return pendingActions.filter((action) => action.todoId !== todoId);
};
