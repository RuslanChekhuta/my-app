export const LANGUAGE_STORAGE_KEY = "ui-language";
export const TASK_TRANSLATION_CACHE_KEY = "task-translation-cache";
export const DEFAULT_LANGUAGE = "ru";

const getPluralIndex = (count, language) => {
  const absoluteCount = Math.abs(count);
  const mod10 = absoluteCount % 10;
  const mod100 = absoluteCount % 100;

  if (language === "en") {
    return absoluteCount === 1 ? 0 : 1;
  }

  if (language === "pl") {
    if (absoluteCount === 1) {
      return 0;
    }

    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      return 1;
    }

    return 2;
  }

  if (mod10 === 1 && mod100 !== 11) {
    return 0;
  }

  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return 1;
  }

  return 2;
};

const createPendingLabel = (language) => {
  return ({ count }) => {
    const pluralIndex = getPluralIndex(count, language);

    if (language === "uk") {
      const variants = [
        "локальна зміна",
        "локальні зміни",
        "локальних змін",
      ];
      return `${count} ${variants[pluralIndex]}`;
    }

    if (language === "en") {
      return `${count} ${count === 1 ? "local change" : "local changes"}`;
    }

    if (language === "pl") {
      const variants = ["lokalna zmiana", "lokalne zmiany", "lokalnych zmian"];
      return `${count} ${variants[pluralIndex]}`;
    }

    const variants = [
      "локальное изменение",
      "локальных изменения",
      "локальных изменений",
    ];
    return `${count} ${variants[pluralIndex]}`;
  };
};

export const SUPPORTED_LANGUAGES = [
  {
    code: "ru",
    shortLabel: "RU",
    nativeLabel: "Русский",
    locale: "ru-RU",
    speechLocale: "ru-RU",
    translateCode: "ru",
  },
  {
    code: "uk",
    shortLabel: "UA",
    nativeLabel: "Українська",
    locale: "uk-UA",
    speechLocale: "uk-UA",
    translateCode: "uk",
  },
  {
    code: "en",
    shortLabel: "EN",
    nativeLabel: "English",
    locale: "en-US",
    speechLocale: "en-US",
    translateCode: "en",
  },
  {
    code: "pl",
    shortLabel: "PL",
    nativeLabel: "Polski",
    locale: "pl-PL",
    speechLocale: "pl-PL",
    translateCode: "pl",
  },
];

const LANGUAGE_NAMES = {
  ru: {
    ru: "русский",
    uk: "украинский",
    en: "английский",
    pl: "польский",
  },
  uk: {
    ru: "російська",
    uk: "українська",
    en: "англійська",
    pl: "польська",
  },
  en: {
    ru: "Russian",
    uk: "Ukrainian",
    en: "English",
    pl: "Polish",
  },
  pl: {
    ru: "rosyjski",
    uk: "ukrainski",
    en: "angielski",
    pl: "polski",
  },
};

export const getSupportedLanguageCode = (input) => {
  if (!input) {
    return null;
  }

  const normalizedInput = String(input).toLowerCase();
  const exactMatch = SUPPORTED_LANGUAGES.find(
    (language) => language.code === normalizedInput
  );

  if (exactMatch) {
    return exactMatch.code;
  }

  const partialMatch = SUPPORTED_LANGUAGES.find((language) =>
    normalizedInput.startsWith(`${language.code}-`)
  );

  return partialMatch?.code ?? null;
};

export const resolveLanguageFromInput = (input) => {
  return getSupportedLanguageCode(input) ?? DEFAULT_LANGUAGE;
};

export const getLanguageConfig = (languageCode) => {
  return (
    SUPPORTED_LANGUAGES.find((language) => language.code === languageCode) ??
    SUPPORTED_LANGUAGES.find((language) => language.code === DEFAULT_LANGUAGE)
  );
};

export const getLanguageDisplayName = (
  languageCode,
  interfaceLanguage = DEFAULT_LANGUAGE
) => {
  if (!languageCode) {
    return "";
  }

  const normalizedLanguage = resolveLanguageFromInput(interfaceLanguage);
  const normalizedTarget = getSupportedLanguageCode(languageCode);

  if (!normalizedTarget) {
    return String(languageCode).toUpperCase();
  }

  return (
    LANGUAGE_NAMES[normalizedLanguage]?.[normalizedTarget] ??
    getLanguageConfig(normalizedTarget)?.nativeLabel ??
    String(languageCode).toUpperCase()
  );
};

export const translations = {
  ru: {
    "language.label": "Язык интерфейса",
    "nav.tasks": "Задачи",
    "nav.faq": "FAQ",
    "common.appName": "Signal Tasks",
    "common.created": "Создано",
    "common.deadline": "Дедлайн",
    "common.overdue": "Просрочено",
    "common.cancel": "Отмена",
    "common.delete": "Удалить",
    "common.save": "Сохранить",
    "common.untitledTask": "Без названия",
    "theme.interface": "Интерфейс",
    "theme.light": "Дневной режим",
    "theme.dark": "Ночной режим",
    "theme.toggle": "Переключить тему",
    "install.install": "Установить",
    "install.howTo": "Как установить",
    "install.androidSecureHint":
      "Android не покажет установку, пока страница открыта через недоверенный HTTPS. Используйте доверенный сертификат для локальной сети или опубликованный HTTPS-домен.",
    "install.androidMenuHint":
      "Если страница уже открыта через доверенный HTTPS, откройте меню браузера и выберите «Установить приложение» или «Добавить на главный экран».",
    "install.iosHint":
      "На iPhone и iPad автоматическая установка обычно не показывается. Откройте меню «Поделиться» и выберите «На экран Домой».",
    "app.deleteTaskMessage": "Вы уверены, что хотите удалить эту задачу?",
    "app.deleteCompletedMessage": ({ count }) =>
      `Вы уверены, что хотите удалить все выполненные задачи (${count})?`,
    "header.eyebrow":
      "Голосовой ввод. Работа офлайн. Контроль конфликтов.",
    "header.titleTop": "Управляйте фокусом,",
    "header.titleBottom": "а не хаосом.",
    "header.description":
      "Современный центр задач для быстрых заметок, голосового ввода и аккуратной синхронизации даже на нестабильной сети.",
    "header.metrics.active": "Активные",
    "header.metrics.completed": "Готово",
    "header.metrics.sync": "Синхронизация",
    "header.sync.inProgress": "Идёт обмен",
    "header.sync.queue": ({ count }) => `${count} в очереди`,
    "header.sync.clean": "Все чисто",
    "main.eyebrow": "Рабочий поток",
    "main.title": "Сфокусированная рабочая лента",
    "main.description":
      "Добавляйте, сортируйте и редактируйте задачи в одном пространстве. Интерфейс подстраивается под мобильный и широкий экран без отдельной логики.",
    "add.eyebrow": "Быстрый ввод",
    "add.title": "Добавьте следующую важную задачу",
    "add.description":
      "Печатайте или диктуйте. Дедлайн можно прикрепить сразу, а синхронизация сама догонит сервер при возвращении сети.",
    "add.voiceInput": "Голосовой ввод",
    "add.localQueue": "Локальная очередь",
    "add.inputLabel": "Текст новой задачи",
    "add.defaultPlaceholder":
      "Например: подготовить обзор недели и созвон с командой",
    "add.emptyPlaceholder": "Введите текст задачи.",
    "add.voiceUnavailable": "Голосовой ввод недоступен",
    "add.stopRecording": "Остановить запись",
    "add.startVoice": "Начать запись голоса",
    "add.startRecording": "Начать запись",
    "add.recordingShort": "Запись",
    "add.voiceShort": "Голос",
    "add.create": "Создать",
    "add.recordingHint":
      "Идет запись. Нажмите на кнопку микрофона для остановки.",
    "deadline.clear": "Очистить",
    "deadline.hide": "Скрыть",
    "deadline.add": "Добавить дедлайн",
    "deadline.value": ({ date }) => `Дедлайн: ${date}`,
    "deleteCompleted.clear": "Очистить завершённые задачи",
    "deleteConfirm.eyebrow": "Подтверждение",
    "deleteConfirm.title": "Подтверждение удаления",
    "filter.all": "Все",
    "filter.active": "В работе",
    "filter.completed": "Готово",
    "list.emptyTitle": "Пустая сцена",
    "list.empty.completed": "Здесь появятся завершённые задачи.",
    "list.empty.active":
      "Все текущие задачи завершены или список пока пуст.",
    "list.empty.all": "Начните с первой задачи, и лента оживёт.",
    "list.reorderHint":
      "Переключитесь на фильтр «Все», чтобы менять порядок задач перетаскиванием.",
    "task.editHint": "Двойной клик или кнопка редактирования",
    "task.showOriginal": "Показать оригинал",
    "task.showTranslation": "Показать перевод",
    "task.autoTranslated": ({ language }) =>
      language ? `Автоперевод: ${language}` : "Автоперевод",
    "task.drag": "Перетащить задачу",
    "task.dragUnavailable": 'Сортировка доступна в фильтре "Все"',
    "task.edit": "Редактировать задачу",
    "task.delete": "Удалить задачу",
    "task.markCompleted": "Отметить как выполненную",
    "task.markActive": "Отметить как невыполненную",
    "pending.badge.idle": "Все изменения синхронизированы",
    "pending.badge.syncing": ({ countLabel }) =>
      `Синхронизация: ${countLabel}`,
    "pending.badge.waiting": ({ countLabel }) =>
      `Ожидает синхронизации: ${countLabel}`,
    "pending.localChangesLabel": createPendingLabel("ru"),
    "pending.centerEyebrow": "Центр синхронизации",
    "pending.queueTitle": "Очередь синхронизации",
    "pending.description.idle":
      "Изменения уже на сервере. Можно спокойно продолжать работу.",
    "pending.description.syncing":
      "Первое изменение из очереди сейчас синхронизируется.",
    "pending.description.waiting":
      "Локальные изменения ждут отправки на сервер.",
    "pending.metric.queue": "Очередь",
    "pending.metric.status": "Статус",
    "pending.metric.strategy": "Стратегия",
    "pending.status.syncing": "Идёт синхронизация",
    "pending.status.waiting": "Ожидание",
    "pending.strategy.local": "Локальная версия",
    "pending.strategy.server": "Серверная версия",
    "pending.strategy.select": "Стратегия конфликтов",
    "pending.empty":
      "Очередь пуста. Приложение синхронизировано и готово к новым задачам.",
    "pending.action.create": "Создание",
    "pending.action.update": "Обновление",
    "pending.action.delete": "Удаление",
    "pending.fallbackTitle": ({ id }) => `Задача #${id}`,
    "pending.snapshot.present":
      "Есть снимок серверной версии для проверки конфликта.",
    "pending.snapshot.absent": "Снимок серверной версии не требуется.",
    "pending.item.syncing": "Синхронизируется",
    "pending.item.waiting": "Ждёт отправки",
    "loader.loading": "Загружаем рабочее пространство",
    "network.offline": "Нет подключения к интернету. Показаны локальные данные.",
    "network.requestError": "Не удалось выполнить запрос. Попробуйте ещё раз.",
    "network.onlineRestored": "Соединение восстановлено",
    "todoAction.savedOffline": ({ action }) =>
      `${action} сохранено локально и будет синхронизировано после восстановления сети.`,
    "todoAction.queued": ({ action }) =>
      `${action} добавлено в очередь синхронизации.`,
    "todoAction.label.newTask": "Новая задача",
    "todoAction.label.taskChange": "Изменение задачи",
    "todoAction.label.taskStatus": "Статус задачи",
    "todoAction.label.taskDelete": "Удаление задачи",
    "todoAction.label.completedDelete": "Удаление выполненных задач",
    "todoAction.label.reorder": "Новый порядок задач",
    "todoAction.addFailed": "Не удалось добавить задачу.",
    "todoAction.updateFailed": "Не удалось сохранить изменения задачи.",
    "todoAction.toggleFailed": "Не удалось обновить статус задачи.",
    "todoAction.deleteFailed": "Не удалось удалить задачу.",
    "todoAction.deleteCompletedPartial":
      "Не удалось удалить часть выполненных задач.",
    "todoAction.reorderFailed": "Не удалось сохранить новый порядок задач.",
    "todoManagement.loadFailed": "Не удалось загрузить задачи с сервера.",
    "todoManagement.serverWinsMissing":
      "Задача уже отсутствует на сервере. Принята серверная версия.",
    "todoManagement.localRecreated":
      "Задача была удалена на сервере. Локальная версия создана заново.",
    "todoManagement.conflictServer":
      "Обнаружен конфликт версии задачи. Принята серверная версия.",
    "todoManagement.conflictLocal":
      "Обнаружен конфликт версии задачи. Применена локальная версия.",
    "todoManagement.conflictSyncedLocal":
      "Синхронизация конфликта завершена по стратегии локальной версии.",
    "todoManagement.deleteConflictServer":
      "Удаление отменено: при конфликте принята серверная версия.",
    "todoManagement.deleteConflictLocal":
      "Обнаружен конфликт перед удалением. Выбрано локальное удаление.",
    "todoManagement.deleteMissingServer":
      "Задача уже отсутствует на сервере. Удаление завершено серверной версией.",
    "todoManagement.deleteMissingLocal":
      "Задача уже отсутствует на сервере. Локальное удаление подтверждено.",
    "todoManagement.synced": "Локальные изменения синхронизированы.",
    "todoManagement.syncFailed":
      "Не удалось синхронизировать локальные изменения. Повторим позже.",
    "speech.permissionDenied":
      "Доступ к микрофону запрещён. Проверьте разрешения браузера.",
    "speech.network": "Ошибка сети во время распознавания речи.",
    "speech.audioCapture":
      "Браузер не получил доступ к микрофону. Проверьте устройство и разрешения.",
    "speech.noSpeech":
      "Речь не распознана. Попробуйте сказать задачу ещё раз.",
    "speech.generic": "Не удалось распознать речь. Попробуйте ещё раз.",
    "speech.unsupported": "Голосовой ввод не поддерживается в этом браузере.",
    "speech.requiresSecure":
      "Для голосового ввода откройте приложение по HTTPS или localhost.",
    "speech.requiresSecureMobile":
      "На мобильном устройстве голосовой ввод работает только по HTTPS или localhost.",
    "speech.restartFailed":
      "Не удалось перезапустить запись. Попробуйте ещё раз.",
    "speech.startFailed": "Не удалось запустить запись. Попробуйте ещё раз.",
    "speech.startFailedMobile":
      "Не удалось запустить запись на мобильном устройстве. Проверьте HTTPS и разрешение на микрофон.",
  },
  uk: {
    "language.label": "Мова інтерфейсу",
    "nav.tasks": "Завдання",
    "nav.faq": "FAQ",
    "common.appName": "Signal Tasks",
    "common.created": "Створено",
    "common.deadline": "Дедлайн",
    "common.overdue": "Прострочено",
    "common.cancel": "Скасувати",
    "common.delete": "Видалити",
    "common.save": "Зберегти",
    "common.untitledTask": "Без назви",
    "theme.interface": "Інтерфейс",
    "theme.light": "Світлий режим",
    "theme.dark": "Нічний режим",
    "theme.toggle": "Перемкнути тему",
    "install.install": "Встановити",
    "install.howTo": "Як встановити",
    "install.androidSecureHint":
      "Android не покаже встановлення, доки сторінка відкрита через недовірений HTTPS. Використовуйте довірений сертифікат для локальної мережі або опублікований HTTPS-домен.",
    "install.androidMenuHint":
      "Якщо сторінка вже відкрита через довірений HTTPS, відкрийте меню браузера та виберіть «Встановити застосунок» або «Додати на головний екран».",
    "install.iosHint":
      "На iPhone та iPad автоматичне встановлення зазвичай не показується. Відкрийте меню «Поділитися» та виберіть «На екран Додому».",
    "app.deleteTaskMessage": "Ви впевнені, що хочете видалити це завдання?",
    "app.deleteCompletedMessage": ({ count }) =>
      `Ви впевнені, що хочете видалити всі виконані завдання (${count})?`,
    "header.eyebrow":
      "Голосове введення. Робота офлайн. Контроль конфліктів.",
    "header.titleTop": "Керуйте фокусом,",
    "header.titleBottom": "а не хаосом.",
    "header.description":
      "Сучасний центр завдань для швидких нотаток, голосового введення та акуратної синхронізації навіть у нестабільній мережі.",
    "header.metrics.active": "Активні",
    "header.metrics.completed": "Готово",
    "header.metrics.sync": "Синхронізація",
    "header.sync.inProgress": "Йде обмін",
    "header.sync.queue": ({ count }) => `${count} у черзі`,
    "header.sync.clean": "Все чисто",
    "main.eyebrow": "Робочий потік",
    "main.title": "Сфокусована робоча стрічка",
    "main.description":
      "Додавайте, сортуйте та редагуйте завдання в одному просторі. Інтерфейс підлаштовується під мобільний і широкий екран без окремої логіки.",
    "add.eyebrow": "Швидке введення",
    "add.title": "Додайте наступне важливе завдання",
    "add.description":
      "Друкуйте або диктуйте. Дедлайн можна прикріпити одразу, а синхронізація сама наздожене сервер після повернення мережі.",
    "add.voiceInput": "Голосове введення",
    "add.localQueue": "Локальна черга",
    "add.inputLabel": "Текст нового завдання",
    "add.defaultPlaceholder":
      "Наприклад: підготувати огляд тижня і дзвінок з командою",
    "add.emptyPlaceholder": "Введіть текст завдання.",
    "add.voiceUnavailable": "Голосове введення недоступне",
    "add.stopRecording": "Зупинити запис",
    "add.startVoice": "Почати запис голосу",
    "add.startRecording": "Почати запис",
    "add.recordingShort": "Запис",
    "add.voiceShort": "Голос",
    "add.create": "Створити",
    "add.recordingHint":
      "Триває запис. Натисніть кнопку мікрофона, щоб зупинити.",
    "deadline.clear": "Очистити",
    "deadline.hide": "Сховати",
    "deadline.add": "Додати дедлайн",
    "deadline.value": ({ date }) => `Дедлайн: ${date}`,
    "deleteCompleted.clear": "Очистити завершені завдання",
    "deleteConfirm.eyebrow": "Підтвердження",
    "deleteConfirm.title": "Підтвердження видалення",
    "filter.all": "Усі",
    "filter.active": "У роботі",
    "filter.completed": "Готово",
    "list.emptyTitle": "Порожня сцена",
    "list.empty.completed": "Тут з'являться завершені завдання.",
    "list.empty.active":
      "Усі поточні завдання завершені або список поки порожній.",
    "list.empty.all": "Почніть із першого завдання, і стрічка оживе.",
    "list.reorderHint":
      "Перемкніться на фільтр «Усі», щоб змінювати порядок завдань перетягуванням.",
    "task.editHint": "Подвійний клік або кнопка редагування",
    "task.showOriginal": "Показати оригінал",
    "task.showTranslation": "Показати переклад",
    "task.autoTranslated": ({ language }) =>
      language ? `Автопереклад: ${language}` : "Автопереклад",
    "task.drag": "Перетягнути завдання",
    "task.dragUnavailable": 'Сортування доступне у фільтрі "Усі"',
    "task.edit": "Редагувати завдання",
    "task.delete": "Видалити завдання",
    "task.markCompleted": "Позначити як виконане",
    "task.markActive": "Позначити як невиконане",
    "pending.badge.idle": "Усі зміни синхронізовано",
    "pending.badge.syncing": ({ countLabel }) => `Синхронізація: ${countLabel}`,
    "pending.badge.waiting": ({ countLabel }) =>
      `Очікує синхронізації: ${countLabel}`,
    "pending.localChangesLabel": createPendingLabel("uk"),
    "pending.centerEyebrow": "Центр синхронізації",
    "pending.queueTitle": "Черга синхронізації",
    "pending.description.idle":
      "Зміни вже на сервері. Можна спокійно продовжувати роботу.",
    "pending.description.syncing":
      "Перша зміна з черги зараз синхронізується.",
    "pending.description.waiting":
      "Локальні зміни чекають на відправлення на сервер.",
    "pending.metric.queue": "Черга",
    "pending.metric.status": "Статус",
    "pending.metric.strategy": "Стратегія",
    "pending.status.syncing": "Йде синхронізація",
    "pending.status.waiting": "Очікування",
    "pending.strategy.local": "Локальна версія",
    "pending.strategy.server": "Серверна версія",
    "pending.strategy.select": "Стратегія конфліктів",
    "pending.empty":
      "Черга порожня. Застосунок синхронізовано й готовий до нових завдань.",
    "pending.action.create": "Створення",
    "pending.action.update": "Оновлення",
    "pending.action.delete": "Видалення",
    "pending.fallbackTitle": ({ id }) => `Завдання #${id}`,
    "pending.snapshot.present":
      "Є знімок серверної версії для перевірки конфлікту.",
    "pending.snapshot.absent": "Знімок серверної версії не потрібен.",
    "pending.item.syncing": "Синхронізується",
    "pending.item.waiting": "Очікує відправлення",
    "loader.loading": "Завантажуємо робочий простір",
    "network.offline":
      "Немає підключення до інтернету. Показані локальні дані.",
    "network.requestError": "Не вдалося виконати запит. Спробуйте ще раз.",
    "network.onlineRestored": "З'єднання відновлено",
    "todoAction.savedOffline": ({ action }) =>
      `${action} збережено локально і буде синхронізовано після відновлення мережі.`,
    "todoAction.queued": ({ action }) =>
      `${action} додано до черги синхронізації.`,
    "todoAction.label.newTask": "Нове завдання",
    "todoAction.label.taskChange": "Зміна завдання",
    "todoAction.label.taskStatus": "Статус завдання",
    "todoAction.label.taskDelete": "Видалення завдання",
    "todoAction.label.completedDelete": "Видалення виконаних завдань",
    "todoAction.label.reorder": "Новий порядок завдань",
    "todoAction.addFailed": "Не вдалося додати завдання.",
    "todoAction.updateFailed": "Не вдалося зберегти зміни завдання.",
    "todoAction.toggleFailed": "Не вдалося оновити статус завдання.",
    "todoAction.deleteFailed": "Не вдалося видалити завдання.",
    "todoAction.deleteCompletedPartial":
      "Не вдалося видалити частину виконаних завдань.",
    "todoAction.reorderFailed": "Не вдалося зберегти новий порядок завдань.",
    "todoManagement.loadFailed": "Не вдалося завантажити завдання з сервера.",
    "todoManagement.serverWinsMissing":
      "Завдання вже відсутнє на сервері. Прийнято серверну версію.",
    "todoManagement.localRecreated":
      "Завдання було видалене на сервері. Локальну версію створено знову.",
    "todoManagement.conflictServer":
      "Виявлено конфлікт версії завдання. Прийнято серверну версію.",
    "todoManagement.conflictLocal":
      "Виявлено конфлікт версії завдання. Застосовано локальну версію.",
    "todoManagement.conflictSyncedLocal":
      "Синхронізацію конфлікту завершено за стратегією локальної версії.",
    "todoManagement.deleteConflictServer":
      "Видалення скасовано: у конфлікті прийнято серверну версію.",
    "todoManagement.deleteConflictLocal":
      "Виявлено конфлікт перед видаленням. Обрано локальне видалення.",
    "todoManagement.deleteMissingServer":
      "Завдання вже відсутнє на сервері. Видалення завершено серверною версією.",
    "todoManagement.deleteMissingLocal":
      "Завдання вже відсутнє на сервері. Локальне видалення підтверджено.",
    "todoManagement.synced": "Локальні зміни синхронізовано.",
    "todoManagement.syncFailed":
      "Не вдалося синхронізувати локальні зміни. Повторимо пізніше.",
    "speech.permissionDenied":
      "Доступ до мікрофона заборонено. Перевірте дозволи браузера.",
    "speech.network": "Помилка мережі під час розпізнавання мовлення.",
    "speech.audioCapture":
      "Браузер не отримав доступ до мікрофона. Перевірте пристрій і дозволи.",
    "speech.noSpeech":
      "Мовлення не розпізнано. Спробуйте сказати завдання ще раз.",
    "speech.generic": "Не вдалося розпізнати мовлення. Спробуйте ще раз.",
    "speech.unsupported": "Голосове введення не підтримується в цьому браузері.",
    "speech.requiresSecure":
      "Для голосового введення відкрийте застосунок через HTTPS або localhost.",
    "speech.requiresSecureMobile":
      "На мобільному пристрої голосове введення працює лише через HTTPS або localhost.",
    "speech.restartFailed":
      "Не вдалося перезапустити запис. Спробуйте ще раз.",
    "speech.startFailed": "Не вдалося запустити запис. Спробуйте ще раз.",
    "speech.startFailedMobile":
      "Не вдалося запустити запис на мобільному пристрої. Перевірте HTTPS і дозвіл на мікрофон.",
  },
  en: {
    "language.label": "Interface language",
    "nav.tasks": "Tasks",
    "nav.faq": "FAQ",
    "common.appName": "Signal Tasks",
    "common.created": "Created",
    "common.deadline": "Deadline",
    "common.overdue": "Overdue",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.save": "Save",
    "common.untitledTask": "Untitled",
    "theme.interface": "Interface",
    "theme.light": "Light mode",
    "theme.dark": "Night mode",
    "theme.toggle": "Toggle theme",
    "install.install": "Install",
    "install.howTo": "How to install",
    "install.androidSecureHint":
      "Android will not offer installation while the page is opened through untrusted HTTPS. Use a trusted certificate for your local network or a published HTTPS domain.",
    "install.androidMenuHint":
      "If the page is already opened through trusted HTTPS, open the browser menu and choose Install app or Add to Home screen.",
    "install.iosHint":
      "On iPhone and iPad the automatic install prompt usually does not appear. Open the Share menu and choose Add to Home Screen.",
    "app.deleteTaskMessage": "Are you sure you want to delete this task?",
    "app.deleteCompletedMessage": ({ count }) =>
      `Are you sure you want to delete all completed tasks (${count})?`,
    "header.eyebrow": "Voice input. Offline work. Conflict control.",
    "header.titleTop": "Manage focus,",
    "header.titleBottom": "not chaos.",
    "header.description":
      "A modern task hub for quick notes, voice input, and clean synchronization even on unstable networks.",
    "header.metrics.active": "Active",
    "header.metrics.completed": "Done",
    "header.metrics.sync": "Sync",
    "header.sync.inProgress": "Syncing",
    "header.sync.queue": ({ count }) => `${count} queued`,
    "header.sync.clean": "All clear",
    "main.eyebrow": "Workflow",
    "main.title": "Focused task stream",
    "main.description":
      "Add, sort, and edit tasks in one space. The interface adapts to mobile and wide screens without separate logic.",
    "add.eyebrow": "Quick input",
    "add.title": "Add the next important task",
    "add.description":
      "Type or dictate. You can attach a deadline right away, and sync will catch up with the server when the network comes back.",
    "add.voiceInput": "Voice input",
    "add.localQueue": "Local queue",
    "add.inputLabel": "New task text",
    "add.defaultPlaceholder":
      "For example: prepare the weekly review and team call",
    "add.emptyPlaceholder": "Enter task text.",
    "add.voiceUnavailable": "Voice input is unavailable",
    "add.stopRecording": "Stop recording",
    "add.startVoice": "Start voice recording",
    "add.startRecording": "Start recording",
    "add.recordingShort": "Recording",
    "add.voiceShort": "Voice",
    "add.create": "Create",
    "add.recordingHint":
      "Recording in progress. Press the microphone button to stop.",
    "deadline.clear": "Clear",
    "deadline.hide": "Hide",
    "deadline.add": "Add deadline",
    "deadline.value": ({ date }) => `Deadline: ${date}`,
    "deleteCompleted.clear": "Clear completed tasks",
    "deleteConfirm.eyebrow": "Confirmation",
    "deleteConfirm.title": "Delete confirmation",
    "filter.all": "All",
    "filter.active": "In progress",
    "filter.completed": "Done",
    "list.emptyTitle": "Empty stage",
    "list.empty.completed": "Completed tasks will appear here.",
    "list.empty.active": "All current tasks are done or the list is empty.",
    "list.empty.all": "Start with the first task and the stream will come alive.",
    "list.reorderHint":
      "Switch to the All filter to reorder tasks by dragging.",
    "task.editHint": "Double-click or use the edit button",
    "task.showOriginal": "Show original",
    "task.showTranslation": "Show translation",
    "task.autoTranslated": ({ language }) =>
      language ? `Auto-translated from ${language}` : "Auto-translated",
    "task.drag": "Drag task",
    "task.dragUnavailable": 'Sorting is available in the "All" filter',
    "task.edit": "Edit task",
    "task.delete": "Delete task",
    "task.markCompleted": "Mark as completed",
    "task.markActive": "Mark as not completed",
    "pending.badge.idle": "All changes are synced",
    "pending.badge.syncing": ({ countLabel }) => `Syncing: ${countLabel}`,
    "pending.badge.waiting": ({ countLabel }) =>
      `Waiting to sync: ${countLabel}`,
    "pending.localChangesLabel": createPendingLabel("en"),
    "pending.centerEyebrow": "Sync center",
    "pending.queueTitle": "Sync queue",
    "pending.description.idle":
      "Changes are already on the server. You can keep working.",
    "pending.description.syncing":
      "The first queued change is syncing right now.",
    "pending.description.waiting":
      "Local changes are waiting to be sent to the server.",
    "pending.metric.queue": "Queue",
    "pending.metric.status": "Status",
    "pending.metric.strategy": "Strategy",
    "pending.status.syncing": "Sync in progress",
    "pending.status.waiting": "Waiting",
    "pending.strategy.local": "Local version",
    "pending.strategy.server": "Server version",
    "pending.strategy.select": "Conflict strategy",
    "pending.empty":
      "The queue is empty. The app is synced and ready for new tasks.",
    "pending.action.create": "Create",
    "pending.action.update": "Update",
    "pending.action.delete": "Delete",
    "pending.fallbackTitle": ({ id }) => `Task #${id}`,
    "pending.snapshot.present":
      "A server snapshot is available for conflict checks.",
    "pending.snapshot.absent": "A server snapshot is not required.",
    "pending.item.syncing": "Syncing",
    "pending.item.waiting": "Waiting to send",
    "loader.loading": "Loading workspace",
    "network.offline": "No internet connection. Showing local data.",
    "network.requestError": "Request failed. Please try again.",
    "network.onlineRestored": "Connection restored",
    "todoAction.savedOffline": ({ action }) =>
      `${action} was saved locally and will sync after the network is restored.`,
    "todoAction.queued": ({ action }) =>
      `${action} was added to the sync queue.`,
    "todoAction.label.newTask": "New task",
    "todoAction.label.taskChange": "Task update",
    "todoAction.label.taskStatus": "Task status",
    "todoAction.label.taskDelete": "Task deletion",
    "todoAction.label.completedDelete": "Completed task deletion",
    "todoAction.label.reorder": "New task order",
    "todoAction.addFailed": "Failed to add task.",
    "todoAction.updateFailed": "Failed to save task changes.",
    "todoAction.toggleFailed": "Failed to update task status.",
    "todoAction.deleteFailed": "Failed to delete task.",
    "todoAction.deleteCompletedPartial":
      "Failed to delete some completed tasks.",
    "todoAction.reorderFailed": "Failed to save the new task order.",
    "todoManagement.loadFailed": "Failed to load tasks from the server.",
    "todoManagement.serverWinsMissing":
      "The task is already missing on the server. The server version was kept.",
    "todoManagement.localRecreated":
      "The task was deleted on the server. The local version was recreated.",
    "todoManagement.conflictServer":
      "A task version conflict was detected. The server version was kept.",
    "todoManagement.conflictLocal":
      "A task version conflict was detected. The local version was applied.",
    "todoManagement.conflictSyncedLocal":
      "Conflict sync finished using the local-version strategy.",
    "todoManagement.deleteConflictServer":
      "Deletion was canceled because the server version won the conflict.",
    "todoManagement.deleteConflictLocal":
      "A conflict was detected before deletion. Local deletion was chosen.",
    "todoManagement.deleteMissingServer":
      "The task is already missing on the server. Deletion finished with the server version.",
    "todoManagement.deleteMissingLocal":
      "The task is already missing on the server. Local deletion was confirmed.",
    "todoManagement.synced": "Local changes have been synced.",
    "todoManagement.syncFailed":
      "Failed to sync local changes. We will retry later.",
    "speech.permissionDenied":
      "Microphone access is blocked. Check your browser permissions.",
    "speech.network": "Network error during speech recognition.",
    "speech.audioCapture":
      "The browser could not access the microphone. Check the device and permissions.",
    "speech.noSpeech":
      "Speech was not recognized. Try saying the task again.",
    "speech.generic": "Speech recognition failed. Please try again.",
    "speech.unsupported": "Voice input is not supported in this browser.",
    "speech.requiresSecure":
      "Open the app over HTTPS or localhost to use voice input.",
    "speech.requiresSecureMobile":
      "On mobile devices, voice input works only over HTTPS or localhost.",
    "speech.restartFailed":
      "Could not restart recording. Please try again.",
    "speech.startFailed": "Could not start recording. Please try again.",
    "speech.startFailedMobile":
      "Could not start recording on the mobile device. Check HTTPS and microphone permission.",
  },
  pl: {
    "language.label": "Jezyk interfejsu",
    "nav.tasks": "Zadania",
    "nav.faq": "FAQ",
    "common.appName": "Signal Tasks",
    "common.created": "Utworzono",
    "common.deadline": "Termin",
    "common.overdue": "Po terminie",
    "common.cancel": "Anuluj",
    "common.delete": "Usun",
    "common.save": "Zapisz",
    "common.untitledTask": "Bez nazwy",
    "theme.interface": "Interfejs",
    "theme.light": "Tryb dzienny",
    "theme.dark": "Tryb nocny",
    "theme.toggle": "Przelacz motyw",
    "install.install": "Zainstaluj",
    "install.howTo": "Jak zainstalowac",
    "install.androidSecureHint":
      "Android nie pokaze instalacji, dopoki strona jest otwarta przez niezaufany HTTPS. Uzyj zaufanego certyfikatu dla sieci lokalnej albo opublikowanej domeny HTTPS.",
    "install.androidMenuHint":
      "Jesli strona jest juz otwarta przez zaufany HTTPS, otworz menu przegladarki i wybierz Zainstaluj aplikacje albo Dodaj do ekranu glównego.",
    "install.iosHint":
      "Na iPhonie i iPadzie automatyczna propozycja instalacji zwykle sie nie pojawia. Otworz menu Udostepnij i wybierz Dodaj do ekranu poczatkowego.",
    "app.deleteTaskMessage": "Czy na pewno chcesz usunac to zadanie?",
    "app.deleteCompletedMessage": ({ count }) =>
      `Czy na pewno chcesz usunac wszystkie wykonane zadania (${count})?`,
    "header.eyebrow":
      "Wprowadzanie glosowe. Praca offline. Kontrola konfliktow.",
    "header.titleTop": "Zarzadzaj skupieniem,",
    "header.titleBottom": "a nie chaosem.",
    "header.description":
      "Nowoczesne centrum zadan do szybkich notatek, dyktowania i uporzadkowanej synchronizacji nawet przy niestabilnym polaczeniu.",
    "header.metrics.active": "Aktywne",
    "header.metrics.completed": "Gotowe",
    "header.metrics.sync": "Synchronizacja",
    "header.sync.inProgress": "Trwa synchronizacja",
    "header.sync.queue": ({ count }) => `${count} w kolejce`,
    "header.sync.clean": "Wszystko czyste",
    "main.eyebrow": "Przeplyw pracy",
    "main.title": "Skupiony strumien zadan",
    "main.description":
      "Dodawaj, sortuj i edytuj zadania w jednej przestrzeni. Interfejs dopasowuje sie do malego i szerokiego ekranu bez osobnej logiki.",
    "add.eyebrow": "Szybkie dodawanie",
    "add.title": "Dodaj kolejne wazne zadanie",
    "add.description":
      "Pisz albo dyktuj. Termin mozna dodac od razu, a synchronizacja nadrobi po powrocie sieci.",
    "add.voiceInput": "Wprowadzanie glosowe",
    "add.localQueue": "Kolejka lokalna",
    "add.inputLabel": "Tekst nowego zadania",
    "add.defaultPlaceholder":
      "Na przyklad: przygotowac podsumowanie tygodnia i rozmowe z zespolem",
    "add.emptyPlaceholder": "Wpisz tekst zadania.",
    "add.voiceUnavailable": "Wprowadzanie glosowe jest niedostepne",
    "add.stopRecording": "Zatrzymaj nagrywanie",
    "add.startVoice": "Rozpocznij nagrywanie glosu",
    "add.startRecording": "Rozpocznij nagrywanie",
    "add.recordingShort": "Nagrywanie",
    "add.voiceShort": "Glos",
    "add.create": "Utworz",
    "add.recordingHint":
      "Nagrywanie trwa. Nacisnij przycisk mikrofonu, aby zatrzymac.",
    "deadline.clear": "Wyczysc",
    "deadline.hide": "Ukryj",
    "deadline.add": "Dodaj termin",
    "deadline.value": ({ date }) => `Termin: ${date}`,
    "deleteCompleted.clear": "Wyczysc ukonczone zadania",
    "deleteConfirm.eyebrow": "Potwierdzenie",
    "deleteConfirm.title": "Potwierdzenie usuniecia",
    "filter.all": "Wszystkie",
    "filter.active": "W trakcie",
    "filter.completed": "Gotowe",
    "list.emptyTitle": "Pusto",
    "list.empty.completed": "Tutaj pojawia sie ukonczone zadania.",
    "list.empty.active":
      "Wszystkie biezace zadania sa gotowe albo lista jest pusta.",
    "list.empty.all": "Zacznij od pierwszego zadania, a lista ozyje.",
    "list.reorderHint":
      "Przelacz filtr Wszystkie, aby zmieniac kolejnosc zadan przeciagnieciem.",
    "task.editHint": "Podwojne klikniecie lub przycisk edycji",
    "task.showOriginal": "Pokaz oryginal",
    "task.showTranslation": "Pokaz tlumaczenie",
    "task.autoTranslated": ({ language }) =>
      language
        ? `Automatyczne tlumaczenie z: ${language}`
        : "Automatyczne tlumaczenie",
    "task.drag": "Przeciagnij zadanie",
    "task.dragUnavailable": 'Sortowanie jest dostepne w filtrze "Wszystkie"',
    "task.edit": "Edytuj zadanie",
    "task.delete": "Usun zadanie",
    "task.markCompleted": "Oznacz jako wykonane",
    "task.markActive": "Oznacz jako niewykonane",
    "pending.badge.idle": "Wszystkie zmiany sa zsynchronizowane",
    "pending.badge.syncing": ({ countLabel }) =>
      `Synchronizacja: ${countLabel}`,
    "pending.badge.waiting": ({ countLabel }) =>
      `Oczekuje na synchronizacje: ${countLabel}`,
    "pending.localChangesLabel": createPendingLabel("pl"),
    "pending.centerEyebrow": "Centrum synchronizacji",
    "pending.queueTitle": "Kolejka synchronizacji",
    "pending.description.idle":
      "Zmiany sa juz na serwerze. Mozesz spokojnie pracowac dalej.",
    "pending.description.syncing":
      "Pierwsza zmiana z kolejki jest teraz synchronizowana.",
    "pending.description.waiting":
      "Lokalne zmiany czekaja na wyslanie na serwer.",
    "pending.metric.queue": "Kolejka",
    "pending.metric.status": "Status",
    "pending.metric.strategy": "Strategia",
    "pending.status.syncing": "Trwa synchronizacja",
    "pending.status.waiting": "Oczekiwanie",
    "pending.strategy.local": "Wersja lokalna",
    "pending.strategy.server": "Wersja serwerowa",
    "pending.strategy.select": "Strategia konfliktow",
    "pending.empty":
      "Kolejka jest pusta. Aplikacja jest zsynchronizowana i gotowa na nowe zadania.",
    "pending.action.create": "Tworzenie",
    "pending.action.update": "Aktualizacja",
    "pending.action.delete": "Usuwanie",
    "pending.fallbackTitle": ({ id }) => `Zadanie #${id}`,
    "pending.snapshot.present":
      "Jest migawka wersji serwerowej do sprawdzenia konfliktu.",
    "pending.snapshot.absent":
      "Migawka wersji serwerowej nie jest wymagana.",
    "pending.item.syncing": "Synchronizuje sie",
    "pending.item.waiting": "Czeka na wyslanie",
    "loader.loading": "Ladowanie przestrzeni roboczej",
    "network.offline": "Brak polaczenia z internetem. Pokazano dane lokalne.",
    "network.requestError": "Nie udalo sie wykonac zadania. Sprobuj ponownie.",
    "network.onlineRestored": "Polaczenie przywrocone",
    "todoAction.savedOffline": ({ action }) =>
      `${action} zapisano lokalnie i zostanie zsynchronizowane po przywroceniu sieci.`,
    "todoAction.queued": ({ action }) =>
      `${action} dodano do kolejki synchronizacji.`,
    "todoAction.label.newTask": "Nowe zadanie",
    "todoAction.label.taskChange": "Zmiana zadania",
    "todoAction.label.taskStatus": "Status zadania",
    "todoAction.label.taskDelete": "Usuniecie zadania",
    "todoAction.label.completedDelete": "Usuniecie wykonanych zadan",
    "todoAction.label.reorder": "Nowa kolejnosc zadan",
    "todoAction.addFailed": "Nie udalo sie dodac zadania.",
    "todoAction.updateFailed": "Nie udalo sie zapisac zmian zadania.",
    "todoAction.toggleFailed": "Nie udalo sie zaktualizowac statusu zadania.",
    "todoAction.deleteFailed": "Nie udalo sie usunac zadania.",
    "todoAction.deleteCompletedPartial":
      "Nie udalo sie usunac czesci wykonanych zadan.",
    "todoAction.reorderFailed":
      "Nie udalo sie zapisac nowej kolejnosci zadan.",
    "todoManagement.loadFailed":
      "Nie udalo sie pobrac zadan z serwera.",
    "todoManagement.serverWinsMissing":
      "Zadania nie ma juz na serwerze. Przyjeto wersje serwerowa.",
    "todoManagement.localRecreated":
      "Zadanie zostalo usuniete na serwerze. Wersje lokalna utworzono ponownie.",
    "todoManagement.conflictServer":
      "Wykryto konflikt wersji zadania. Przyjeto wersje serwerowa.",
    "todoManagement.conflictLocal":
      "Wykryto konflikt wersji zadania. Zastosowano wersje lokalna.",
    "todoManagement.conflictSyncedLocal":
      "Synchronizacje konfliktu zakonczono wedlug strategii wersji lokalnej.",
    "todoManagement.deleteConflictServer":
      "Usuwanie anulowano: w konflikcie wybrano wersje serwerowa.",
    "todoManagement.deleteConflictLocal":
      "Przed usunieciem wykryto konflikt. Wybrano usuniecie lokalne.",
    "todoManagement.deleteMissingServer":
      "Zadania nie ma juz na serwerze. Usuwanie zakonczono wersja serwerowa.",
    "todoManagement.deleteMissingLocal":
      "Zadania nie ma juz na serwerze. Potwierdzono lokalne usuniecie.",
    "todoManagement.synced": "Lokalne zmiany zostaly zsynchronizowane.",
    "todoManagement.syncFailed":
      "Nie udalo sie zsynchronizowac zmian lokalnych. Sprobujemy pozniej.",
    "speech.permissionDenied":
      "Dostep do mikrofonu jest zablokowany. Sprawdz uprawnienia przegladarki.",
    "speech.network": "Blad sieci podczas rozpoznawania mowy.",
    "speech.audioCapture":
      "Przegladarka nie uzyskala dostepu do mikrofonu. Sprawdz urzadzenie i uprawnienia.",
    "speech.noSpeech":
      "Mowa nie zostala rozpoznana. Sprobuj powiedziec zadanie jeszcze raz.",
    "speech.generic":
      "Nie udalo sie rozpoznac mowy. Sprobuj ponownie.",
    "speech.unsupported":
      "Wprowadzanie glosowe nie jest obslugiwane w tej przegladarce.",
    "speech.requiresSecure":
      "Otworz aplikacje przez HTTPS lub localhost, aby uzyc wprowadzania glosowego.",
    "speech.requiresSecureMobile":
      "Na urzadzeniu mobilnym wprowadzanie glosowe dziala tylko przez HTTPS lub localhost.",
    "speech.restartFailed":
      "Nie udalo sie ponownie uruchomic nagrywania. Sprobuj ponownie.",
    "speech.startFailed":
      "Nie udalo sie uruchomic nagrywania. Sprobuj ponownie.",
    "speech.startFailedMobile":
      "Nie udalo sie uruchomic nagrywania na urzadzeniu mobilnym. Sprawdz HTTPS i zgode na mikrofon.",
  },
};
