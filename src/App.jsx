import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="container" data-theme={theme}>
      <Header toggleTheme={toggleTheme} />
      <main>
        <h2>Добро пожаловать!</h2>
        <p>
          Этот проект демонстрирует работу с CSS Modules, объединение стилей
          через composes и создание динамической темы с использованием
          переменных.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
