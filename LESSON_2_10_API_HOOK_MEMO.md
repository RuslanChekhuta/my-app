# Урок 2.10. Кастомный хук для работы с API

## Зачем нужен кастомный хук
Кастомный хук (`useApi`) выносит общую логику запросов из компонентов:
- хранение `loading`, `error`, `data`
- единая точка для `get/post/put/patch/delete`
- меньше дублирования кода в формах и списках

## Что в текущем коде уже хорошо
- Вынесен общий API-слой в `src/hooks/useApi.js`.
- Компоненты (`UserList`, `AddUser`, `DeleteUser`, `UpdateUser`) не зависят от `axios` напрямую.
- Есть обработка состояния загрузки и ошибок на UI.

## Критичные моменты в текущей реализации
1. `request` проглатывает ошибку и не пробрасывает ее дальше.
   - Из-за этого `.then(...)` в компонентах может выполниться даже после неуспешного запроса.
2. `axios.create(...)` создается на каждом рендере.
   - Функции `request/get/post...` становятся нестабильными по ссылке.
3. Ошибка не сбрасывается перед новым запросом.
   - Старое сообщение об ошибке может оставаться в UI.
4. Опечатка: `error.massage` вместо `error.message` в `UserList`.

## Рекомендуемая реализация `useApi`
```jsx
import { useState, useMemo, useCallback } from "react";
import axios from "axios";

const useApi = (baseUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useMemo(
    () =>
      axios.create({
        baseURL: baseUrl,
        headers: { "Content-Type": "application/json" },
      }),
    [baseUrl],
  );

  const request = useCallback(
    async (method, endpoint, body = null, config = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response =
          method === "get" || method === "delete"
            ? await api[method](endpoint, config)
            : await api[method](endpoint, body, config);

        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  const get = useCallback((endpoint, config) => request("get", endpoint, null, config), [request]);
  const post = useCallback((endpoint, body, config) => request("post", endpoint, body, config), [request]);
  const put = useCallback((endpoint, body, config) => request("put", endpoint, body, config), [request]);
  const patch = useCallback((endpoint, body, config) => request("patch", endpoint, body, config), [request]);
  const remove = useCallback((endpoint, config) => request("delete", endpoint, null, config), [request]);

  return { data, loading, error, get, post, put, patch, remove };
};

export default useApi;
```

## Как правильно использовать в компоненте
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await post("users", { name, hasCar });
    alert("Пользователь добавлен");
  } catch {
    alert("Не удалось добавить пользователя");
  }
};
```

## Мини-чеклист перед сдачей
- `api` создается через `useMemo`.
- `request` делает `setError(null)` перед вызовом.
- Ошибка пробрасывается: `throw err`.
- Методы возвращают данные (`return response.data`).
- В UI используется `error.message`, не `error.massage`.
- Для `useEffect` зависимости указаны корректно.

