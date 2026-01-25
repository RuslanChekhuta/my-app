import "./App.css";
import withCounter from "./hocs/withCounter";
import ClickButton from "./components/ClickButton";
import HoverDiv from "./components/HoverDiv";

// Создаем усиленные версии компонентов
const EnhancedButton = withCounter(ClickButton);
const EnhancedDiv = withCounter(HoverDiv);

function App() {
  return (
    <div className="container">
      {/* Теперь у них независимые счетчики */}
      <EnhancedButton label="Клики" />
      <EnhancedDiv />
    </div>
  );
}

export default App;
