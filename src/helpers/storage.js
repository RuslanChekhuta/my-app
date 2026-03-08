import { LOCAL_STORAGE_KEY } from "../constants/todos";

export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Не удалось прочитать localStorage:", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return [];
  }
};

export const saveToLocalStorage = (todos) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};
