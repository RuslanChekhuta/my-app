import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../helpers/storage.js";

export const useLocalStorage = () => {
  return { loadFromLocalStorage, saveToLocalStorage };
};
