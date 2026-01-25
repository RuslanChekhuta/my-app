import { useState } from "react";

const SimpleCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="Simple-counter">
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    </div>
  );
};

export default SimpleCounter;
