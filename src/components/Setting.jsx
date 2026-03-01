import { useLocalStorage } from "../hooks/useLocalStorage";

import React from "react";

const Setting = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [lang, setLang] = useLocalStorage("lang", "ru");

  return (
    <div>
      <h1>Настройки</h1>
      <div>
        <h2>Тема:</h2>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Светлая</option>
          <option value="dark">Темная</option>
        </select>
      </div>
      <div>
        <h2>Язык:</h2>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="ru">Русский</option>
          <option value="en">Английский</option>
        </select>
      </div>
      <p>Текущая тема: {theme}</p>
      <p>Текущий язык: {lang}</p>
    </div>
  );
};

export default Setting;
