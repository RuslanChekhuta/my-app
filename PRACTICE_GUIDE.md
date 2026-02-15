# Гайд по практике: урок 2.2

## Старт

1. Запусти `npm run dev`.
2. Открой консоль браузера.
3. Открывай шаги по порядку и реализуй только `TODO` в файлах `src/practice`.

## Шаг 0 - StrictMode

Файл: `src/practice/Step0StrictModeProbe.jsx`

1. Добавь `console.log("Probe setup")` внутри эффекта.
2. Верни cleanup с `console.log("Probe cleanup")`.
3. Сравни порядок логов при первом рендере и при скрытии блока.

Проверка:
- В development виден дополнительный цикл setup/cleanup из-за StrictMode.

## Шаг 1 - Жизненный цикл + cleanup при размонтировании

Файл: `src/practice/Step1LifecycleDemo.jsx`

1. Добавь `setInterval`.
2. Увеличивай счетчик каждую секунду.
3. Верни cleanup с `clearInterval`.
4. Добавь логи mount/unmount.

Проверка:
- Счетчик растет, пока блок видим.
- Счетчик останавливается, когда блок скрыт.

## Шаг 2 - Cleanup при изменении зависимости

Файл: `src/practice/Step2CleanupInterval.jsx`

1. Добавь интервал, который логирует `message` каждые 2 секунды.
2. Верни cleanup с `clearInterval`.
3. Оставь зависимость `[message]`.

Проверка:
- После ввода `A`, `B`, `C` старые сообщения больше не логируются.

## Шаг 3 - Безопасный асинхронный запрос

Файл: `src/practice/Step3DataFetcher.jsx`

1. Добавь флаг `isMounted`.
2. Перед запросом поставь `setLoading(true)`.
3. Запроси posts по адресу:
   `https://jsonplaceholder.typicode.com/posts?_limit=5`
4. Обновляй state только когда `isMounted === true`.
5. В cleanup установи `isMounted = false`.
6. Скрывай блок запроса во время загрузки и проверяй корректное поведение.

Проверка:
- Данные загружаются.
- После размонтирования нет попыток обновить state.

## Шаг 4 - Cleanup для событий окна

Файл: `src/practice/Step4WindowSize.jsx`

1. Оставь `addEventListener("resize", handleResize)`.
2. Добавь cleanup:
   `window.removeEventListener("resize", handleResize)`.
3. Скрывай и показывай блок resize для проверки cleanup.

Проверка:
- Размер обновляется при ресайзе окна.
- После скрытия слушатель корректно удаляется.

## Шаг 5 - Мини-практика MouseTracker

Файл: `src/practice/Step5MouseTracker.jsx`

1. Добавь `window.addEventListener("mousemove", handler)`.
2. В handler обновляй `x/y` в state и логируй координаты в консоль.
3. Верни cleanup с `window.removeEventListener("mousemove", handler)`.

Проверка:
- Пока блок видим, координаты меняются.
- После скрытия логи mousemove прекращаются.

## Вопросы для самопроверки

1. Почему в development эффекты могут выполняться по схеме setup/cleanup/setup?
2. Что произойдет с `setInterval`, если не вызвать `clearInterval`?
3. Почему нельзя писать `useEffect(async () => { ... })`?
4. В какие моменты React вызывает cleanup-функцию эффекта?
