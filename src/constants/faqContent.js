export const FAQ_CONTENT = {
  ru: {
    eyebrow: "FAQ",
    title: "Как пользоваться приложением",
    description:
      "Короткие ответы по добавлению задач, сортировке, переводу, голосовому вводу, офлайн-режиму и установке приложения.",
    backToTasks: "Вернуться к задачам",
    quickTipsTitle: "Быстрый старт",
    quickTips: [
      {
        title: "Добавление",
        text: "Введите текст задачи или используйте микрофон, затем нажмите «Создать».",
      },
      {
        title: "Порядок",
        text: "Менять порядок задач можно перетаскиванием в фильтре «Все».",
      },
      {
        title: "Офлайн",
        text: "Если сеть пропадёт, изменения сохранятся локально и уйдут на сервер позже.",
      },
    ],
    sections: [
      {
        id: "basics",
        title: "Основные действия",
        description: "Базовые сценарии работы со списком задач.",
        items: [
          {
            id: "add-task",
            question: "Как добавить новую задачу?",
            answer:
              "В верхней форме введите текст задачи. При необходимости прикрепите дедлайн и нажмите кнопку создания. Новая задача сразу появится вверху списка.",
          },
          {
            id: "edit-task",
            question: "Как изменить, завершить или удалить задачу?",
            answer:
              "Задачу можно открыть на редактирование двойным кликом по тексту или кнопкой редактирования. Статус меняется чекбоксом слева, удаление доступно отдельной кнопкой справа.",
          },
          {
            id: "filters",
            question: "Как работают фильтры?",
            answer:
              "Фильтры переключают список между всеми задачами, активными и завершёнными. В каждом фильтре счётчик показывает текущее количество элементов.",
          },
        ],
      },
      {
        id: "organization",
        title: "Организация и интерфейс",
        description: "Функции для удобной работы с задачами.",
        items: [
          {
            id: "drag-drop",
            question: "Как изменить порядок задач?",
            answer:
              "Переключитесь на фильтр «Все» и перетащите задачу за ручку слева. Новый порядок сохранится и будет использован при следующем открытии приложения.",
          },
          {
            id: "deadlines",
            question: "Как работают дедлайны?",
            answer:
              "При создании или редактировании задачи можно назначить дату и время. Просроченные дедлайны подсвечиваются отдельно, чтобы их было проще заметить.",
          },
          {
            id: "translation",
            question: "Как работает перевод задач?",
            answer:
              "Если язык текста задачи отличается от выбранного языка интерфейса, приложение пытается показать автоматический перевод. Рядом появится кнопка, которая позволяет переключаться между переводом и оригиналом.",
          },
        ],
      },
      {
        id: "sync-mobile",
        title: "Синхронизация и мобильное использование",
        description: "Что важно знать при работе на телефоне и без сети.",
        items: [
          {
            id: "offline-sync",
            question: "Что происходит без интернета?",
            answer:
              "Приложение продолжает работать с локальными данными. Все изменения попадают в очередь синхронизации и отправляются на сервер после восстановления сети.",
          },
          {
            id: "voice-input",
            question: "Как использовать голосовой ввод?",
            answer:
              "Нажмите кнопку микрофона рядом с полем ввода. Для работы нужен поддерживаемый браузер и HTTPS либо localhost. На мобильных устройствах браузер также должен получить доступ к микрофону.",
          },
          {
            id: "install-app",
            question: "Как установить приложение на телефон или планшет?",
            answer:
              "На Android установка работает только через доверенный HTTPS или localhost. Если страница открыта с предупреждением о сертификате, браузер не предложит установить приложение. На iPhone и iPad обычно нужно открыть меню «Поделиться» и выбрать «На экран Домой».",
          },
        ],
      },
    ],
  },
  uk: {
    eyebrow: "FAQ",
    title: "Як користуватися застосунком",
    description:
      "Короткі відповіді про додавання завдань, сортування, переклад, голосове введення, офлайн-режим та встановлення застосунку.",
    backToTasks: "Повернутися до завдань",
    quickTipsTitle: "Швидкий старт",
    quickTips: [
      {
        title: "Додавання",
        text: "Введіть текст завдання або скористайтеся мікрофоном, а потім натисніть «Створити».",
      },
      {
        title: "Порядок",
        text: "Змінювати порядок завдань можна перетягуванням у фільтрі «Усі».",
      },
      {
        title: "Офлайн",
        text: "Якщо мережа зникне, зміни збережуться локально й підуть на сервер пізніше.",
      },
    ],
    sections: [
      {
        id: "basics",
        title: "Основні дії",
        description: "Базові сценарії роботи зі списком завдань.",
        items: [
          {
            id: "add-task",
            question: "Як додати нове завдання?",
            answer:
              "У верхній формі введіть текст завдання. За потреби прикріпіть дедлайн і натисніть кнопку створення. Нове завдання одразу з’явиться вгорі списку.",
          },
          {
            id: "edit-task",
            question: "Як змінити, завершити або видалити завдання?",
            answer:
              "Завдання можна відкрити на редагування подвійним кліком по тексту або кнопкою редагування. Статус змінюється чекбоксом ліворуч, а видалення доступне окремою кнопкою праворуч.",
          },
          {
            id: "filters",
            question: "Як працюють фільтри?",
            answer:
              "Фільтри перемикають список між усіма завданнями, активними та завершеними. У кожному фільтрі лічильник показує поточну кількість елементів.",
          },
        ],
      },
      {
        id: "organization",
        title: "Організація та інтерфейс",
        description: "Функції для зручної роботи із завданнями.",
        items: [
          {
            id: "drag-drop",
            question: "Як змінити порядок завдань?",
            answer:
              "Перемкніться на фільтр «Усі» та перетягніть завдання за ручку ліворуч. Новий порядок збережеться і буде використаний при наступному відкритті застосунку.",
          },
          {
            id: "deadlines",
            question: "Як працюють дедлайни?",
            answer:
              "Під час створення або редагування завдання можна призначити дату й час. Прострочені дедлайни підсвічуються окремо, щоб їх було легше помітити.",
          },
          {
            id: "translation",
            question: "Як працює переклад завдань?",
            answer:
              "Якщо мова тексту завдання відрізняється від вибраної мови інтерфейсу, застосунок намагається показати автоматичний переклад. Поруч з’явиться кнопка для перемикання між перекладом і оригіналом.",
          },
        ],
      },
      {
        id: "sync-mobile",
        title: "Синхронізація та мобільне використання",
        description: "Що важливо знати під час роботи на телефоні та без мережі.",
        items: [
          {
            id: "offline-sync",
            question: "Що відбувається без інтернету?",
            answer:
              "Застосунок продовжує працювати з локальними даними. Усі зміни потрапляють у чергу синхронізації та надсилаються на сервер після відновлення мережі.",
          },
          {
            id: "voice-input",
            question: "Як використовувати голосове введення?",
            answer:
              "Натисніть кнопку мікрофона поруч із полем введення. Для роботи потрібен підтримуваний браузер і HTTPS або localhost. На мобільних пристроях браузер також має отримати доступ до мікрофона.",
          },
          {
            id: "install-app",
            question: "Як встановити застосунок на телефон або планшет?",
            answer:
              "На Android встановлення працює лише через довірений HTTPS або localhost. Якщо сторінка відкрита з попередженням про сертифікат, браузер не запропонує встановити застосунок. На iPhone та iPad зазвичай потрібно відкрити меню «Поділитися» й вибрати «На екран Додому».",
          },
        ],
      },
    ],
  },
  en: {
    eyebrow: "FAQ",
    title: "How to use the app",
    description:
      "Short answers about adding tasks, sorting, translation, voice input, offline mode, and installing the app.",
    backToTasks: "Back to tasks",
    quickTipsTitle: "Quick start",
    quickTips: [
      {
        title: "Adding",
        text: "Enter the task text or use the microphone, then press Create.",
      },
      {
        title: "Order",
        text: "You can reorder tasks by dragging them in the All filter.",
      },
      {
        title: "Offline",
        text: "If the network disappears, changes stay local and sync later.",
      },
    ],
    sections: [
      {
        id: "basics",
        title: "Core actions",
        description: "Basic flows for working with the task list.",
        items: [
          {
            id: "add-task",
            question: "How do I add a new task?",
            answer:
              "Use the form at the top of the screen. Enter the task text, optionally attach a deadline, and press Create. The new task appears at the top of the list.",
          },
          {
            id: "edit-task",
            question: "How do I edit, complete, or delete a task?",
            answer:
              "You can open editing by double-clicking the task text or pressing the edit button. Change the status with the checkbox on the left, and remove a task with the delete button on the right.",
          },
          {
            id: "filters",
            question: "How do filters work?",
            answer:
              "Filters switch the list between all tasks, active tasks, and completed tasks. Each filter also shows the current item count.",
          },
        ],
      },
      {
        id: "organization",
        title: "Organization and interface",
        description: "Features that make task work more comfortable.",
        items: [
          {
            id: "drag-drop",
            question: "How do I reorder tasks?",
            answer:
              "Switch to the All filter and drag a task using the handle on the left. The new order is saved and used the next time you open the app.",
          },
          {
            id: "deadlines",
            question: "How do deadlines work?",
            answer:
              "You can assign a date and time while creating or editing a task. Overdue deadlines are highlighted separately so they are easier to notice.",
          },
          {
            id: "translation",
            question: "How does task translation work?",
            answer:
              "If a task text is written in a different language than the current interface language, the app tries to show an automatic translation. A button appears next to let you switch between the translation and the original text.",
          },
        ],
      },
      {
        id: "sync-mobile",
        title: "Sync and mobile usage",
        description: "Important details for phones and offline work.",
        items: [
          {
            id: "offline-sync",
            question: "What happens without internet?",
            answer:
              "The app keeps working with local data. All changes are placed into the sync queue and sent to the server after the connection returns.",
          },
          {
            id: "voice-input",
            question: "How do I use voice input?",
            answer:
              "Press the microphone button near the input field. You need a supported browser and HTTPS or localhost. On mobile devices, the browser must also have microphone permission.",
          },
          {
            id: "install-app",
            question: "How do I install the app on a phone or tablet?",
            answer:
              "On Android, installation works only through trusted HTTPS or localhost. If the page is opened with a certificate warning, the browser will not offer app installation. On iPhone and iPad, you usually need to open the Share menu and choose Add to Home Screen.",
          },
        ],
      },
    ],
  },
  pl: {
    eyebrow: "FAQ",
    title: "Jak korzystac z aplikacji",
    description:
      "Krotkie odpowiedzi o dodawaniu zadan, sortowaniu, tlumaczeniu, wprowadzaniu glosowym, trybie offline i instalacji aplikacji.",
    backToTasks: "Wroc do zadan",
    quickTipsTitle: "Szybki start",
    quickTips: [
      {
        title: "Dodawanie",
        text: "Wpisz tekst zadania albo uzyj mikrofonu, a potem nacisnij Utworz.",
      },
      {
        title: "Kolejnosc",
        text: "Kolejnosc zadan zmienisz przeciaganiem w filtrze Wszystkie.",
      },
      {
        title: "Offline",
        text: "Jesli siec zniknie, zmiany zostana lokalnie i zsynchronizuja sie pozniej.",
      },
    ],
    sections: [
      {
        id: "basics",
        title: "Podstawowe dzialania",
        description: "Podstawowe scenariusze pracy z lista zadan.",
        items: [
          {
            id: "add-task",
            question: "Jak dodac nowe zadanie?",
            answer:
              "Uzyj formularza u gory ekranu. Wpisz tekst zadania, opcjonalnie dodaj termin i nacisnij Utworz. Nowe zadanie pojawi sie na gorze listy.",
          },
          {
            id: "edit-task",
            question: "Jak edytowac, ukonczyc albo usunac zadanie?",
            answer:
              "Mozesz otworzyc edycje podwojnym kliknieciem tekstu albo przyciskiem edycji. Status zmienisz checkboxem po lewej, a usuwanie jest dostepne osobnym przyciskiem po prawej.",
          },
          {
            id: "filters",
            question: "Jak dzialaja filtry?",
            answer:
              "Filtry przelaczaja liste miedzy wszystkimi zadaniami, aktywnymi i ukonczonymi. Kazdy filtr pokazuje tez aktualna liczbe elementow.",
          },
        ],
      },
      {
        id: "organization",
        title: "Organizacja i interfejs",
        description: "Funkcje ulatwiajace prace z zadaniami.",
        items: [
          {
            id: "drag-drop",
            question: "Jak zmienic kolejnosc zadan?",
            answer:
              "Przelacz filtr na Wszystkie i przeciagnij zadanie za uchwyt po lewej stronie. Nowa kolejnosc zostanie zapisana i uzyta przy kolejnym otwarciu aplikacji.",
          },
          {
            id: "deadlines",
            question: "Jak dzialaja terminy?",
            answer:
              "Podczas tworzenia albo edycji zadania mozna ustawic date i godzine. Zalegle terminy sa podswietlane osobno, zeby latwiej bylo je zauwazyc.",
          },
          {
            id: "translation",
            question: "Jak dziala tlumaczenie zadan?",
            answer:
              "Jesli tekst zadania jest w innym jezyku niz aktualny jezyk interfejsu, aplikacja probuje pokazac automatyczne tlumaczenie. Obok pojawi sie przycisk do przelaczania miedzy tlumaczeniem a oryginalem.",
          },
        ],
      },
      {
        id: "sync-mobile",
        title: "Synchronizacja i uzycie mobilne",
        description: "Wazne informacje o telefonach i pracy bez sieci.",
        items: [
          {
            id: "offline-sync",
            question: "Co dzieje sie bez internetu?",
            answer:
              "Aplikacja nadal pracuje na danych lokalnych. Wszystkie zmiany trafiaja do kolejki synchronizacji i zostaja wyslane na serwer po powrocie polaczenia.",
          },
          {
            id: "voice-input",
            question: "Jak uzyc wprowadzania glosowego?",
            answer:
              "Nacisnij przycisk mikrofonu obok pola wprowadzania. Potrzebna jest obslugiwana przegladarka oraz HTTPS albo localhost. Na urzadzeniach mobilnych przegladarka musi tez miec dostep do mikrofonu.",
          },
          {
            id: "install-app",
            question: "Jak zainstalowac aplikacje na telefonie lub tablecie?",
            answer:
              "Na Androidzie instalacja dziala tylko przez zaufany HTTPS albo localhost. Jesli strona jest otwarta z ostrzezeniem o certyfikacie, przegladarka nie zaproponuje instalacji aplikacji. Na iPhonie i iPadzie zwykle trzeba otworzyc menu Udostepnij i wybrac Dodaj do ekranu poczatkowego.",
          },
        ],
      },
    ],
  },
};

export const getFaqContent = (language) => {
  return FAQ_CONTENT[language] ?? FAQ_CONTENT.ru;
};
