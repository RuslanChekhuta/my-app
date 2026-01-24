import { useState } from "react";
import "./App.css";
import Greeting from "./components/Greeting";
import Notification from "./components/Notification";
import TodoList from "./components/TodoList";
import UserProfile from "./components/UserProfile";
import WelcomeMessage from "./components/WelcomeMessage";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [messages, setMessages] = useState([]);

  const userData = { name: "Ivan", age: 25 };

  const handleToggleAuth = () => {
    setIsAuth((prev) => !prev);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  const handleAddMessage = () => {
    setMessages((prev) => [...prev, "Новое сообщение"]);
  };

  return (
    <div>
      <div className="card">
        <button className="btn" onClick={handleToggleAuth}>
          Переключить авторизацию
        </button>
        <WelcomeMessage isAuth={isAuth} />
        <Greeting isLoggedIn={isAuth} />
      </div>

      <div className="card">
        <button className="btn" onClick={handleAddMessage}>
          Добавить
        </button>
        <button className="btn" onClick={handleClearMessages}>
          Очистить
        </button>
        <Notification messages={messages} />
      </div>

      <div className="card">
        <UserProfile user={userData} />
      </div>

      <div className="card">
        <UserProfile user={null} />
      </div>

      <div className="card">
        <TodoList task="Сделать домашку" isCompleted={true} />
      </div>

      <div className="card">
        <TodoList task="Прочитать конспект" isCompleted={false} />
      </div>
    </div>
  );
};

export default App;
