# Памятка: Урок 3.1. React: маршрутизация и роутеры

## 1) Что видно по текущему коду

Сейчас проект находится в очень раннем состоянии:

- в [package.json](D:/Ruslan/Projects/Web-garage/tasks/my-app/package.json) уже установлен `react-router` версии `^7.13.1`;
- в [main.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/main.jsx) приложение рендерится напрямую как `<App />`;
- в [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx) пока обычный стартовый шаблон Vite со счетчиком;
- в проекте нет `Routes`, `Route`, `Link`, `NavLink`, `Outlet`, `useNavigate`, `useParams`.

Вывод:

роутер в зависимостях уже есть, но маршрутизация в приложении еще не настроена вообще.

Это хороший момент для темы урока, потому что можно спокойно понять основу без лишней логики поверх.

## 2) Что такое маршрутизация в React

Маршрутизация - это механизм, который связывает URL в адресной строке с нужным экраном приложения.

Примеры:

- `/` -> главная страница
- `/about` -> страница "О проекте"
- `/todos/42` -> конкретная задача с `id = 42`

Без роутера React-приложение чаще всего живет как один экран.
С роутером приложение начинает работать как набор страниц, но без полной перезагрузки браузера.

## 3) Что такое роутер

Роутер - это библиотека и набор компонентов/хуков, которые:

- читают текущий URL;
- определяют, какой компонент надо показать;
- позволяют переходить между страницами;
- умеют работать с вложенными маршрутами;
- дают доступ к параметрам маршрута и навигации.

В вашем проекте эту роль будет выполнять `React Router`.

## 4) Что важно понять именно по React Router v7

В текущем проекте установлен именно `react-router`, а не `react-router-dom`.

Это важный момент, потому что в старых уроках и статьях очень часто встречается синтаксис через `react-router-dom`.
Но в вашем проекте уже используется актуальный пакет `react-router`, и для веб-маршрутизации в `v7` можно импортировать основные API прямо из него.

То есть для этого проекта ориентироваться нужно именно на такой стиль:

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router";
```

А не автоматически копировать старые примеры без проверки версии.

## 5) Базовые сущности, которые надо знать

### BrowserRouter

`BrowserRouter` подключает маршрутизацию на базе History API браузера.

Именно он делает так, чтобы:

- URL менялся без полной перезагрузки;
- React Router отслеживал адрес;
- приложение понимало, какой маршрут сейчас открыт.

### Routes

`Routes` - это контейнер для набора маршрутов.

Он смотрит на текущий URL и выбирает подходящий `Route`.

### Route

`Route` описывает правило:

- какой `path` должен совпасть;
- какой компонент надо показать.

Пример:

```jsx
<Route path="/about" element={<AboutPage />} />
```

### Link

`Link` - это безопасная навигация внутри React-приложения.

Он нужен вместо обычного `<a>`, когда вы переходите между внутренними страницами.

### NavLink

`NavLink` делает то же самое, что `Link`, но еще умеет показывать активное состояние текущего пункта меню.

### Outlet

`Outlet` нужен для вложенных маршрутов.

Это место внутри layout-компонента, куда React Router вставляет дочернюю страницу.

### useNavigate

`useNavigate` позволяет переходить по маршрутам из кода:

- после отправки формы;
- после логина;
- после удаления записи;
- по кнопке "Назад".

### useParams

`useParams` дает доступ к динамическим параметрам URL.

Пример:

- маршрут `/todos/:id`
- на адресе `/todos/42`
- `useParams()` вернет `id = "42"`

## 6) Какие режимы есть в React Router

По текущей документации React Router есть несколько режимов работы.
Для базового старта полезно понимать два:

### 1. Declarative mode

Это классический и самый понятный старт:

- `BrowserRouter`
- `Routes`
- `Route`

Подходит, чтобы быстро понять базовую маршрутизацию.

### 2. Data mode

Это более продвинутый подход:

- `createBrowserRouter`
- `RouterProvider`

Он удобен, когда нужны:

- `loader`;
- `action`;
- `errorElement`;
- более явная конфигурация маршрутов.

Для урока `3.1` логично сначала усвоить declarative routing, а уже потом смотреть на data routers.

## 7) Что конкретно не хватает текущему проекту

Сейчас в проекте отсутствуют три ключевых слоя:

### 1. Нет страниц

Пока есть только один [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx), который показывает demo-счетчик.

Обычно нужно выделить:

- `HomePage`
- `AboutPage`
- `NotFoundPage`

### 2. Нет router wrapper

В [main.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/main.jsx) приложение не обернуто в `BrowserRouter`.

Из-за этого любые `Routes`, `Route`, `Link`, `useNavigate` работать не будут.

### 3. Нет схемы маршрутов

Внутри [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx) пока нет таблицы маршрутов:

- `/`
- `/about`
- `*`

А значит приложение пока не делится на страницы.

## 8) Как выглядит минимальный старт для этого проекта

### Шаг 1. Обернуть приложение в BrowserRouter

[main.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/main.jsx):

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Шаг 2. Добавить маршруты в App

[App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx):

```jsx
import { Routes, Route, NavLink } from "react-router";

function HomePage() {
  return <h2>Главная</h2>;
}

function AboutPage() {
  return <h2>О проекте</h2>;
}

function NotFoundPage() {
  return <h2>Страница не найдена</h2>;
}

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/about">О проекте</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
```

Это самый понятный первый рабочий уровень маршрутизации.

## 9) Как это будет развиваться дальше

После базового старта маршрутизация обычно усложняется так:

### Вложенные маршруты

Например:

- `/`
- `/todos`
- `/todos/:id`

Тогда появляется layout и `Outlet`.

### Динамические параметры

Например:

```jsx
<Route path="/todos/:id" element={<TodoDetailsPage />} />
```

И в компоненте:

```jsx
import { useParams } from "react-router";

function TodoDetailsPage() {
  const { id } = useParams();
  return <div>Задача: {id}</div>;
}
```

### Программная навигация

Например:

```jsx
import { useNavigate } from "react-router";

function BackButton() {
  const navigate = useNavigate();

  return <button onClick={() => navigate(-1)}>Назад</button>;
}
```

## 10) Какие ошибки делают чаще всего

### Используют `<a>` вместо `Link`

Это приводит к полной перезагрузке страницы, хотя в SPA так делать не нужно.

### Забывают BrowserRouter

Если не обернуть приложение в `BrowserRouter`, роутинг просто не заработает.

### Путают версию библиотеки

Это особенно актуально в вашем проекте.

Сейчас у вас:

- `react-router` `^7.13.1`

А во многих старых уроках показывают:

- `react-router-dom`
- старый синтаксис
- старые подходы к конфигурации

Поэтому примеры из интернета надо всегда сверять с версией пакета в [package.json](D:/Ruslan/Projects/Web-garage/tasks/my-app/package.json).

### Не делают маршрут `*`

Без fallback-маршрута пользователь при неверном URL получит плохой UX.

## 11) Как связать это с вашим текущим проектом

Сейчас у вас пока не TODO-приложение, а стартовый Vite-шаблон.

Но именно на таком этапе маршрутизация обычно и добавляется первой:

- сначала выделяются страницы;
- потом добавляется меню;
- потом настраиваются маршруты;
- потом появляются вложенные layout-страницы;
- потом уже можно переносить туда реальную бизнес-логику.

То есть урок `3.1` здесь очень уместен:
он объясняет, как из "одного экрана" сделать структуру настоящего SPA.

## 12) Что запомнить как итог

- Маршрутизация связывает URL и экран.
- Роутер управляет переходами и выбором компонента по адресу.
- В текущем проекте `react-router` уже установлен, но еще не используется.
- Для первого шага достаточно понять `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`.
- Для вложенных экранов нужен `Outlet`.
- Для переходов из кода нужен `useNavigate`.
- Для URL-параметров нужен `useParams`.
- Важнее всего не копировать старые примеры слепо, а смотреть на текущую версию пакета.

## 13) Чеклист по уроку 3.1

- [x] Понять, что такое маршрутизация.
- [x] Понять, что такое роутер.
- [x] Найти в проекте, установлен ли React Router.
- [x] Проверить, что роутер пока не подключен.
- [x] Понять роль `BrowserRouter`.
- [x] Понять роль `Routes` и `Route`.
- [x] Понять различие `Link` и обычного `<a>`.
- [x] Понять, зачем нужны `NavLink`, `Outlet`, `useNavigate`, `useParams`.
- [x] Понять, какой минимальный следующий шаг нужен именно этому проекту.

## 14) Полезные официальные ссылки

- React Router Modes: https://reactrouter.com/start/modes
- Declarative Routing: https://reactrouter.com/start/declarative/routing
- BrowserRouter API: https://reactrouter.com/api/declarative-routers/BrowserRouter
- Link API: https://reactrouter.com/api/components/Link

---

Промежуточный итог: в проекте уже подготовлена зависимость для маршрутизации, но сама маршрутизация еще не включена. Значит, урок `3.1` для вас сейчас не про рефакторинг существующего роутера, а про правильную первую настройку структуры SPA на базе `React Router v7`.
