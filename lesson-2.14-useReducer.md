# Урок 2.14. Хук `useReducer` (памятка)

## 1) Что делает `useReducer`
`useReducer` управляет состоянием через:
- `state` (текущее состояние)
- `dispatch(action)` (отправка действия)
- `reducer(state, action)` (функция, которая решает, как обновить состояние)

Сигнатура:
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## 2) Как это реализовано в вашем проекте

### `Counter` (`src/components/Counter.jsx` + `src/reducers/counterReducer.js`)
- Состояние: `{ count: 0 }`
- Действия:
  - `INCREMENT` -> `count + 1`
  - `DECREMENT` -> `count - 1`
  - `RESET` -> `0`
  - `SET_VALUE` -> установка числа из input

Плюс: логика переходов состояния централизована в одном месте (в reducer), компонент становится проще.

### `Todo` (`src/components/Todo.jsx` + `src/reducers/todoReducer.js`)
- Состояние: `{ todos: [] }`
- Действия:
  - `ADD_TODO` -> добавить новую задачу
  - `TOGGLE_TODO` -> переключить `completed`

Плюс: удобно масштабировать (добавить `DELETE_TODO`, `EDIT_TODO`, фильтры и т.д.).

## 3) Поток данных (как думать про `useReducer`)
1. Пользователь вызывает событие (клик, submit).
2. Компонент делает `dispatch({ type, payload })`.
3. `reducer` получает текущий `state` и `action`.
4. `reducer` возвращает новый `state`.
5. React рендерит UI заново.

## 4) Главные правила для reducer
- Не мутировать старый `state`.
- Всегда возвращать новый объект/массив.
- В `default` возвращать текущий `state`.
- Reducer должен быть предсказуемым и без побочных эффектов.

## 5) Когда брать `useReducer`, а когда `useState`
Используйте `useReducer`, если:
- состояние сложное (объект, массив, много полей),
- много связанных обновлений,
- нужны явные сценарии через `action.type`.

`useState` лучше, если:
- состояние простое,
- логика обновления элементарная.

## 6) Что можно улучшить в вашем коде
- Удалить `console.log` из reducer в production.
- В `parseInt(inputValue)` явно указать основание: `parseInt(inputValue, 10)`.
- Для id в todo лучше `crypto.randomUUID()` (надежнее, чем `Date.now()` при частых добавлениях).
- Вынести `action.type` в константы, чтобы избежать опечаток.

## 7) Быстрая шпаргалка по dispatch
```jsx
dispatch({ type: "INCREMENT" });
dispatch({ type: "DECREMENT" });
dispatch({ type: "RESET" });
dispatch({ type: "SET_VALUE", payload: 42 });

dispatch({ type: "ADD_TODO", payload: "Купить молоко" });
dispatch({ type: "TOGGLE_TODO", payload: todoId });
```

## 8) Частые ошибки
- Изменение state напрямую (`state.count++`, `state.todos.push(...)`).
- Отсутствие `default` в `switch`.
- Слишком много логики в компоненте вместо reducer.
- Нестабильные/неуникальные id для списков.
