# Гайд по практике: урок 2.3 (useRef)

## Старт

1. Запусти `npm run dev`.
2. Открой консоль браузера.
3. Проходи шаги по порядку и заполняй `TODO` в `src/practice23`.

## Шаг 1 - Ref и фокус input

Файл: `src/practice23/Step1RefFocus.jsx`

1. Реализуй `focusInput`.
2. Вызови `inputRef.current.focus()` с проверкой на `null`.
3. Добавь `console.log("Render Step1RefFocus")` в тело компонента и проверь, что ввод в неуправляемый input не триггерит ререндер.

Проверка:
- По кнопке курсор переходит в input.
- Логи рендера не сыпятся от набора текста.

## Шаг 2 - Previous value через useRef

Файл: `src/practice23/Step2NumberTracker.jsx`

1. В `useEffect` присвой `previousNumber.current = number`.
2. Перед присвоением выведи в консоль предыдущее и текущее значение.
3. Нажимай `Увеличить/Уменьшить` и проверяй логи.

Проверка:
- В консоли видно корректную пару `предыдущее -> текущее`.

## Шаг 3 - Кастомный видеоплеер

Файл: `src/practice23/Step3CustomVideoPlayer.jsx`

1. Реализуй `handlePlayPause`.
2. Управляй видео через `videoRef.current.play()` / `pause()`.
3. Обновляй `isPlaying`, чтобы кнопка меняла текст.

Проверка:
- Кнопка корректно переключает `Плей/Пауза`.
- Видео реально запускается и останавливается.

## Шаг 4 - Ref + CSS-эффект

Файл: `src/practice23/Step4RefComponentEffect.jsx`

1. Реализуй `focusInput` через ref.
2. Нажми `Ввести` и проверь, что label поднимается за счет CSS.

Проверка:
- Есть фокус в input.
- floating label анимируется.

## Шаг 5 - Previous props

Файл: `src/practice23/Step5UserGreeting.jsx`

1. В `useEffect` сравни `previousName.current` и `name`.
2. При изменении имени выведи лог в консоль.
3. В конце эффекта присвой `previousName.current = name`.

Проверка:
- В консоли есть лог изменения имени.

## Шаг 6 - AdvancedAudioPlayer и cleanup

Файл: `src/practice23/Step6AdvancedAudioPlayer.jsx`

1. В отдельном `useEffect` создай обработчик `handleEnded`.
2. Добавь `audioElement.addEventListener("ended", handleEnded)`.
3. В cleanup удаляй слушатель через `removeEventListener`.
4. Используй локальную переменную `const audioElement = audioRef.current` внутри эффекта.

Проверка:
- По завершению трека происходит переход на следующий.
- После размонтирования/смены трека нет дублирующихся срабатываний.

## Вопросы для самопроверки

1. Почему изменение `ref.current` не вызывает ререндер?
2. В какой момент `ref.current` начинает ссылаться на DOM-узел?
3. Почему `previous value` обычно сохраняют в `useEffect`, а не прямо в рендере?
