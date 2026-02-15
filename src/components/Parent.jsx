import { useState } from "react";
import ChildInput from "./ChildInput";

const Parent = () => {
  // TODO: Реализуйте resetCount и кнопку сброса.
  const [resetCount, setResetCount] = useState(0);

  return (
    <div>
      <button onClick={() => setResetCount((c) => c + 1)}>
        Сбросить настройки
      </button>
      <ChildInput resetTrigger={resetCount} />
    </div>
  );
};

export default Parent;