# Памятка: Урок 3.2. React Router: Routes, Route, Link

## 1) Что уже сделано в текущем проекте

На этом этапе роутинг в проекте уже реально работает:

- в [main.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/main.jsx) приложение обернуто в `BrowserRouter`;
- в [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx) используется `Routes` и несколько `Route`;
- на страницах применяются `Link`;
- маршруты частично вынесены в [AppRoutes.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/constants/AppRoutes.js).

Это уже не просто подготовка к роутингу, а первый рабочий SPA-маршрутный слой.

## 2) Что такое `Routes`

`Routes` - это контейнер, который анализирует текущий URL и выбирает, какой `Route` должен сработать.

В вашем проекте это видно в [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx):

```jsx
<Routes>
  <Route index element={<HomePage />} />
  <Route path={AppRoutes.ABOUT} element={<AboutPage />} />
  <Route path={AppRoutes.AUTH} element={<AuthLayout />} />
  <Route path={`${AppRoutes.AUTH}/${AppRoutes.LOGIN}`} element={<LoginPage />} />
  <Route path="/auth/register" element={<RegPage />} />
  <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
</Routes>
```

Что важно понять:

- `Routes` не рисует меню и не делает переходы;
- `Routes` только выбирает, какой экран показать по адресу;
- внутри него должен лежать набор `Route`.

## 3) Что такое `Route`

`Route` описывает правило: какой путь должен совпасть и какой компонент надо отрисовать.

У `Route` в вашем коде используются три важных варианта:

### `index`

```jsx
<Route index element={<HomePage />} />
```

Это маршрут по умолчанию для корня.
В вашем приложении это главная страница.

### `path`

```jsx
<Route path={AppRoutes.ABOUT} element={<AboutPage />} />
```

Здесь маршрут срабатывает, когда адрес равен `/about`.

### `*`

В [AppRoutes.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/constants/AppRoutes.js) есть:

```js
NOT_FOUND: "*"
```

И в [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx):

```jsx
<Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
```

Это fallback-маршрут.
Он нужен, чтобы показывать `404`, когда ни один другой путь не подошел.

## 4) Что такое `Link`

`Link` - это компонент для переходов внутри React-приложения без полной перезагрузки страницы.

Это ключевое отличие от обычного HTML-тега `<a>`.

По официальной документации React Router, `Link` - это улучшенная обертка над `<a href>`, которая включает client-side navigation.

В вашем проекте `Link` уже используется на разных страницах:

- [HomePage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/HomePage.jsx)
- [AboutPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/AboutPage.jsx)
- [AuthLayout.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/AuthLayout.jsx)
- [LoginPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/LoginPage.jsx)
- [RegPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/RegPage.jsx)
- [NotFoundPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/NotFoundPage.jsx)

Это значит, что навигация уже строится правильно для SPA.

## 5) Как выглядит текущая схема маршрутов

По [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx) у вас сейчас есть такая таблица:

- `/` -> [HomePage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/HomePage.jsx)
- `/about` -> [AboutPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/AboutPage.jsx)
- `/auth` -> [AuthLayout.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/AuthLayout.jsx)
- `/auth/login` -> [LoginPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/LoginPage.jsx)
- `/auth/register` -> [RegPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/RegPage.jsx)
- `*` -> [NotFoundPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/NotFoundPage.jsx)

Это уже хорошая учебная структура:

- есть главная;
- есть отдельная информационная страница;
- есть auth-раздел;
- есть страница входа;
- есть страница регистрации;
- есть `404`.

## 6) Как `Link` связывает страницы между собой

### Главная страница

В [HomePage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/HomePage.jsx):

- ссылка ведет на `/about`;
- ссылка ведет на `/auth`.

То есть `HomePage` выступает как точка входа в другие разделы.

### Страница о компании

В [AboutPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/AboutPage.jsx):

- есть `Link` обратно на `/`.

Это базовая двусторонняя навигация.

### Auth-раздел

В [AuthLayout.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/AuthLayout.jsx):

- есть переход на `/auth/login`;
- есть переход на `/auth/register`.

Это уже похоже на маленькое меню раздела аутентификации.

### Страница логина

В [LoginPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/LoginPage.jsx):

- есть ссылка на регистрацию;
- есть ссылка назад на главную.

### Страница регистрации

В [RegPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/RegPage.jsx):

- есть ссылка на логин.

### Страница 404

В [NotFoundPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/NotFoundPage.jsx):

- есть возврат на главную;
- есть переход на страницу "О компании".

Это хороший UX для fallback-страницы.

## 7) Что здесь уже сделано правильно

### `BrowserRouter` подключен в правильном месте

В [main.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/main.jsx) `BrowserRouter` оборачивает все приложение.

Это правильная база, потому что:

- весь `App` получает доступ к роутингу;
- `Link`, `Routes`, `Route` работают в одном router-context;
- маршрутизация централизована.

### В `App.jsx` есть единая точка описания маршрутов

Это тоже правильный паттерн для маленького проекта:

- структура маршрутов читается в одном месте;
- легко увидеть все страницы сразу;
- проще расширять проект.

### Есть fallback-маршрут `*`

Это важная деталь.
Многие новички забывают про `404`, но у вас он уже есть.

## 8) Что важно понять про `AuthLayout`

Название [AuthLayout.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/AuthLayout.jsx) может немного сбивать с толку.

Сейчас это еще не настоящий layout в смысле React Router.

Почему:

- в нем нет `Outlet`;
- `LoginPage` и `RegPage` не вложены в него как дочерние маршруты;
- `/auth`, `/auth/login`, `/auth/register` описаны как отдельные маршруты на одном уровне.

То есть сейчас `AuthLayout` - это просто отдельная страница со ссылками, а не layout-маршрут.

Это не ошибка для темы `Routes`, `Route`, `Link`, но важно понимать разницу.

## 9) Какие технические моменты уже стоит подтянуть

### Смешаны константы и хардкод строк

В [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx):

- часть путей идет через `AppRoutes`;
- путь регистрации задан строкой `"/auth/register"`.

В страницах тоже есть смешение:

- где-то используется `AppRoutes`;
- где-то путь захардкожен прямо в `Link`.

Лучше придерживаться одного подхода.

### Есть дублирование страницы регистрации

В папке `src/pages` у вас есть:

- [RegPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/RegPage.jsx)
- [RegisterPage.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/pages/RegisterPage.jsx)

Но в [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx) реально используется только `RegPage`.

Это создает путаницу и хуже читается.

### `Link` в основном использует абсолютные строки

Например:

```jsx
<Link to="/auth/login">Войдите</Link>
```

Это работает нормально.
Но при росте проекта удобнее будет:

- либо централизовать пути через `AppRoutes`;
- либо позже перейти к более структурированным вложенным маршрутам.

## 10) Что важно запомнить про `Routes`, `Route`, `Link`

### `Routes`

- выбирает лучший подходящий маршрут;
- сам переходы не делает;
- только управляет рендером экрана.

### `Route`

- связывает `path` и `element`;
- может быть `index`;
- может быть wildcard `*`.

### `Link`

- меняет URL без перезагрузки;
- нужен для внутренней навигации;
- заменяет обычный `<a>` внутри SPA.

## 11) Почему этот этап важен

Именно на этапе `3.2` приложение перестает быть "одним компонентом" и начинает становиться настоящим SPA.

Это дает:

- понятную структуру экранов;
- навигацию между страницами;
- основу для layout-маршрутов;
- основу для `Outlet`, `useNavigate`, `useParams` в следующих шагах.

То есть `Routes`, `Route` и `Link` - это не мелкая тема, а фундамент всей дальнейшей архитектуры роутинга.

## 12) Чеклист по вашему текущему этапу

- [x] `BrowserRouter` подключен.
- [x] `Routes` используется в корневом приложении.
- [x] `Route` описывает основные страницы.
- [x] Есть `index`-маршрут.
- [x] Есть wildcard-маршрут `*`.
- [x] `Link` используется для навигации между страницами.
- [x] Главная страница умеет вести в другие разделы.
- [x] Auth-раздел уже разбит на отдельные страницы.
- [ ] `AuthLayout` пока не является настоящим nested layout.
- [ ] Пути пока не полностью унифицированы через `AppRoutes`.
- [ ] В проекте осталось дублирование `RegPage/RegisterPage`.

## 13) Полезные официальные ссылки

- Declarative Routing Guide: https://reactrouter.com/start/declarative/routing
- Routes API: https://reactrouter.com/api/components/Routes
- Route API: https://reactrouter.com/api/components/Route
- Link API: https://reactrouter.com/api/components/Link

---

Промежуточный итог: тема `Routes`, `Route`, `Link` у вас уже реально внедрена и работает. Следующий логичный шаг после этого этапа - перейти от отдельных плоских маршрутов к вложенным маршрутам и настоящим layout-компонентам через `Outlet`.
