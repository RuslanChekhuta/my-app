import { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    // Атрибут data-theme активирует наш @custom-variant dark из index.css
    <div
      data-theme={theme}
      className="min-h-screen w-full flex flex-col items-center justify-center gap-8 bg-gray-100 dark:bg-slate-900 transition-colors duration-300"
    >
      <h1 className="text-5xl font-display text-gray-900 dark:text-white">
        Tailwind Demo
      </h1>

      <Card title="Стильная карточка" />

      <Button onClick={toggleTheme}>Сменить тему</Button>
    </div>
  );
};

export default App;
