import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Ошибка чтения данных из localStorage", error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  const setValue = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error("Ошибка добавления в localStorage", error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Ошибка удаления из localStorage", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== key) {
        return;
      }

      try {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
      } catch (error) {
        console.error("Ошибка синхронизации данных из localStorage", error);
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};
