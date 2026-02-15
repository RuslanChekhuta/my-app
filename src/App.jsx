import "./App.css";
import Parent from "./components/Parent";
import TitleUpdater from "./components/TitleUpdater";
import UserList from "./components/UserList";

function App() {
  return (
    <div>
      <h2>Задача 1: Список пользователей</h2>
      <UserList />

      <h2>Задача 2: Обновление заголовка</h2>
      <TitleUpdater />

      <h2>Задача 3: Сброс инпута</h2>
      <Parent />
    </div>
  );
}

export default App;
