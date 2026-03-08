import {
  CONFLICT_STRATEGIES,
  CONFLICT_STRATEGY_KEY,
} from "../constants/todos";

export const loadConflictStrategy = () => {
  const savedStrategy = localStorage.getItem(CONFLICT_STRATEGY_KEY);

  if (
    savedStrategy === CONFLICT_STRATEGIES.LOCAL_WINS ||
    savedStrategy === CONFLICT_STRATEGIES.SERVER_WINS
  ) {
    return savedStrategy;
  }

  return CONFLICT_STRATEGIES.LOCAL_WINS;
};

export const saveConflictStrategy = (strategy) => {
  localStorage.setItem(CONFLICT_STRATEGY_KEY, strategy);
};
