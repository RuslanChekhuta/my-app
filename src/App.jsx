import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";

const App = () => {
  const [clicks, setClicks] = useState(0);

  const [isDark, setIsDark] = useState(false);

  const [userName, setUserName] = useState("Гость");

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      <Header userName={userName} clicks={clicks} />
      <main>
        <ThemeToggle toggleTheme={toggleTheme} />
        <HomePage setClicks={setClicks} />
      </main>
      <Footer setUserName={setUserName} userName={userName} isDark={isDark} />
    </div>
  );
};

export default App;
