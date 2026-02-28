import { useState } from "react";

const useCounter = (initialValue, addedSum) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prev) => prev + addedSum);
  };
  const decrement = () => {
    setCount((prev) => prev - addedSum);
  };
  const reset = () => {
    setCount(initialValue);
  };

  return [count, increment, decrement, reset];
};

export default useCounter;
