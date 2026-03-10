# Памятка: Урок 3.3. Link + NavLink: стилизация

## 1) Что видно по текущему коду

На этом этапе роутинг у вас уже не просто работает, а начинает получать визуальное оформление.

Это видно по файлам:

- [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx)
- [Navbar.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/Navbar.jsx)
- [NavbarWithNavLink.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/NavbarWithNavLink.jsx)
- [Nav.css](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/Nav.css)
- [styles.module.css](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/styles.module.css)

Главная идея урока `3.3` в вашем проекте такая:

- `Link` нужен для обычной навигации;
- `NavLink` нужен, когда ссылка должна знать, активна она сейчас или нет;
- стилизовать `Link` и `NavLink` можно несколькими способами.

Причем у вас в коде уже показаны почти все самые популярные варианты:

- `styled-components`;
- inline styles;
- `className` через функцию;
- render props через `children`;
- обычный CSS;
- CSS Modules;
- utility-классы.

## 2) В чем разница между `Link` и `NavLink`

### `Link`

`Link` просто делает переход по маршруту без полной перезагрузки страницы.

Он не знает, активен ли текущий путь.

Пример из [Navbar.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/Navbar.jsx):

```jsx
<StyledLink to={"/"}>Главная</StyledLink>
```

Это обычная навигационная ссылка.

### `NavLink`

`NavLink` - это расширенная версия `Link`.

По документации React Router, `NavLink` оборачивает `Link` и дает доступ к состояниям ссылки, прежде всего:

- `isActive`
- `isPending`

В вашем проекте сейчас используется `isActive`.

Именно поэтому `NavLink` подходит для меню, где нужно подсвечивать текущий раздел.

## 3) Как стилизуется обычный `Link` у вас в проекте

В [Navbar.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/Navbar.jsx) используется `styled-components`:

```jsx
const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-right: 30px;

  &:hover {
    color: darkblue;
    text-decoration: underline;
  }
`;
```

Это хороший пример стилизации `Link`, когда:

- активное состояние не нужно;
- нужна просто красивая ссылка;
- хочется держать стили рядом с компонентом.

Что здесь важно понять:

- `Link` отлично подходит для статической стилизации;
- hover-эффект можно оформить так же, как у обычного HTML-элемента;
- но выделять текущую активную страницу через `Link` неудобно, потому что у него нет встроенного `isActive`.

## 4) Как стилизуется `NavLink` у вас в проекте

В [NavbarWithNavLink.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/NavbarWithNavLink.jsx) собрана учебная демонстрация нескольких подходов.

Это очень полезно, потому что показывает:

- `NavLink` не навязывает один способ стилизации;
- активное состояние можно использовать как угодно;
- итог зависит только от того, как вы хотите оформить UI.

## 5) Способ 1: стилизация через `style`

В [NavbarWithNavLink.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/NavbarWithNavLink.jsx):

```jsx
<NavLink
  to={"/"}
  style={({ isActive }) => ({
    color: isActive ? "green" : "blue",
    marginRight: 30,
  })}
>
  Главная
</NavLink>
```

Что здесь происходит:

- `style` получает функцию;
- React Router передает в нее `isActive`;
- в зависимости от этого меняется цвет.

Плюсы:

- быстро;
- понятно;
- удобно для маленьких примеров.

Минусы:

- плохо масштабируется;
- сложнее поддерживать;
- неудобно для больших интерфейсов.

## 6) Способ 2: render props через `children`

В [NavbarWithNavLink.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/NavbarWithNavLink.jsx):

```jsx
<NavLink to={"/auth"}>
  {({ isActive }) => (
    <span className={isActive ? "active" : ""}>
      {isActive ? "👉" : ""} Войти
    </span>
  )}
</NavLink>
```

Это уже более гибкий подход.

Здесь `NavLink` позволяет не только менять CSS-класс, но и вообще менять содержимое ссылки:

- добавлять иконку;
- менять текст;
- вставлять badge;
- подменять разметку.

Это важно, потому что `NavLink` можно использовать не только как "подсветить пункт меню", но и как полноценный state-aware UI-элемент.

Технический нюанс в вашем коде:

- класс `"active"` в проекте сейчас не описан ни в [Nav.css](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/Nav.css), ни в [styles.module.css](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/styles.module.css).
- сам `NavLink` по документации также автоматически получает CSS-класс `.active`, когда маршрут активен;
- но и этот встроенный механизм у вас сейчас тоже фактически не используется, потому что стиля вида `a.active { ... }` в проекте нет.

То есть на практике этот пример сейчас меняет:

- emoji `👉`;
- но не дает отдельной CSS-подсветки через класс.

## 7) Способ 3: `className` как функция + обычный CSS

В [NavbarWithNavLink.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/NavbarWithNavLink.jsx):

```jsx
<NavLink
  to={"/"}
  className={({ isActive }) => (isActive ? "nav-nav" : "")}
>
  На главную
</NavLink>
```

И в [Nav.css](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/Nav.css):

```css
a.nav-nav {
  color: red;
}
```

Это один из самых практичных вариантов.

Почему:

- логика active-state остается в компоненте;
- сами стили вынесены в CSS;
- код читается лучше, чем при длинных inline styles.

Для реального проекта это обычно удобнее, чем `style={({ isActive }) => ... }`.

## 8) Способ 4: `className` как функция + utility-классы

Еще один пример в [NavbarWithNavLink.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/NavbarWithNavLink.jsx):

```jsx
<NavLink
  to={"/about"}
  className={({ isActive }) =>
    isActive ? "text-green-500" : "text-amber-700"
  }
>
  О нас
</NavLink>
```

Это подход в духе utility-first стилизации.

У вас в проекте уже есть `tailwindcss`, так что этот путь логичен.

Когда такой способ хорош:

- если UI уже строится на utility-классах;
- если не хочется заводить отдельный CSS-файл;
- если active/inactive стили достаточно короткие.

Когда он хуже:

- если className становится слишком длинным;
- если логика вариантов начинает расползаться по JSX.

## 9) Способ 5: `className` как функция + CSS Modules

В [NavbarWithNavLink.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/NavbarWithNavLink.jsx):

```jsx
<NavLink
  to={"/about"}
  className={({ isActive }) => (isActive ? styles.link : "")}
>
  О нас
</NavLink>
```

И в [styles.module.css](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/styles.module.css):

```css
a.link {
  color: rgb(176, 38, 214);
  text-decoration: underline;
}
```

Что это дает:

- стили изолированы модулем;
- нет риска случайного конфликта имен;
- активный класс читается как часть компонента.

Это сильный компромисс между:

- глобальным CSS;
- utility-классами;
- CSS-in-JS.

## 10) В чем учебная ценность вашего текущего `NavbarWithNavLink`

С точки зрения продакшен-кода такой компонент пока избыточный:

- несколько ссылок ведут на одни и те же страницы;
- одновременно показаны сразу все способы стилизации;
- в одном navbar смешаны разные подходы к CSS.

Но для обучения это как раз полезно.

Почему:

- видно, что `NavLink` можно стилизовать не одним способом;
- легче сравнить подходы вживую;
- можно понять разницу между `style`, `className` и render props.

То есть сейчас [NavbarWithNavLink.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/NavbarWithNavLink.jsx) работает скорее как демонстрационный стенд.

## 11) Какие моменты в текущем коде уже стоит поправить

### 1. `to={"./about"}` в глобальном navbar

В одном из `NavLink` у вас стоит:

```jsx
to={"./about"}
```

Это относительный путь.

Проблема в том, что если вы находитесь, например, на `/auth`, такой переход может резолвиться не в `/about`, а в путь относительно текущего адреса.

Для глобального меню безопаснее использовать абсолютный путь:

```jsx
to={"/about"}
```

### 2. Класс `"active"` нигде не описан

В render-props примере:

```jsx
<span className={isActive ? "active" : ""}>
```

класс добавляется, но его стиль в проекте не определен.

Если вам нужна именно визуальная active-подсветка, это место сейчас не закончено.

### 3. Смешано слишком много стилевых подходов сразу

Сейчас у вас одновременно есть:

- `styled-components`;
- глобальный CSS;
- CSS Modules;
- utility-классы;
- inline styles.

Для урока это нормально.
Для реального проекта обычно лучше выбрать 1-2 основных подхода и держаться их.

### 4. `NavLink to="/auth"` будет активен и на вложенных auth-страницах

По документации React Router `NavLink` считает ссылку активной, если текущий URL начинается с ее `to`, если не используется `end`.

Это значит:

- `/auth` будет активен на `/auth`;
- `/auth` будет активен и на `/auth/login`;
- `/auth` будет активен и на `/auth/register`.

Иногда это нужно.
Иногда нет.

В вашем случае это стоит понимать осознанно.

## 12) Что важно запомнить про стилизацию `Link` и `NavLink`

### `Link`

- хорош для обычных переходов;
- удобно стилизуется как любой другой компонент;
- не знает про active-state.

### `NavLink`

- нужен для меню и навигации с подсветкой;
- дает `isActive`;
- может стилизоваться через `style`;
- может стилизоваться через `className`;
- может менять содержимое через render props.

### Практический вывод

Для маленьких примеров:

- подойдет `style`.

Для обычного проекта:

- чаще всего удобнее `className`.

Для сложной разметки ссылки:

- полезны render props.

## 13) Что уже хорошо в вашем проекте на этом этапе

- `Link` и `NavLink` используются по назначению.
- Есть отдельный пример обычного `Link` через `styled-components`.
- Есть отдельный пример `NavLink` с active-state.
- Показаны сразу несколько способов стилизации.
- Проект уже подводит к более взрослой навигации и active-menu.

## 14) Чеклист по уроку 3.3

- [x] Понять разницу между `Link` и `NavLink`.
- [x] Увидеть стилизацию `Link` через `styled-components`.
- [x] Увидеть стилизацию `NavLink` через `style`.
- [x] Увидеть стилизацию `NavLink` через `className`.
- [x] Увидеть render props через `children`.
- [x] Увидеть пример с глобальным CSS.
- [x] Увидеть пример с CSS Modules.
- [x] Увидеть пример с utility-классами.
- [x] Понять, что `isActive` - это главный источник active-стилей.
- [x] Понять, какие места в текущем коде еще сыроваты.

## 15) Полезные официальные ссылки

- Declarative Navigating: https://reactrouter.com/start/declarative/navigating
- Link API: https://reactrouter.com/api/components/Link
- NavLink API: https://reactrouter.com/api/components/NavLink

---

Промежуточный итог: урок `3.3` у вас не просто про красивые ссылки, а про переход от обычной навигации к state-aware навигации. `Link` отвечает за переход, а `NavLink` - за переход плюс знание текущего активного маршрута. Именно это и делает нормальное меню в SPA визуально понятным.
