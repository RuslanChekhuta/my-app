import { useReducer, useState } from "react";
import { counterReducer, initialState } from "../reducers/counterReducer";

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const [inputValue, setInputValue] = useState("");

  const handleSetValue = (e) => {
    e.preventDefault();
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      //забрасываем число как состояние
      dispatch({ type: "SET_VALUE", payload: num });
    }
    setInputValue("");
  };

  const handleDecrement = () => {
    dispatch({ type: "DECREMENT" });
  };
  const handleIncrement = () => {
    dispatch({ type: "INCREMENT" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div>
      <h2>Счётчик:{state.count}</h2>
      <div>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </div>
      <button onClick={handleReset}>Сбросить</button>
      <form onSubmit={handleSetValue}>
        <input
          type="number"
          placeholder="Установить значение"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Применить</button>
      </form>
    </div>
  );
}

export default Counter;
