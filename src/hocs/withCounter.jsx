import { useState } from "react";

const withCounter = (WrappedComponent) => {
  // Возвращаем новый компонент
  const ComponentWithCounter = (props) => {
    const [count, setCount] = useState(0);

    const increment = () => {
      setCount((prev) => prev + 1);
    };

    // Передаем пропсы дальше + добавляем функционал счетчика
    return <WrappedComponent {...props} count={count} increment={increment} />;
  };

  ComponentWithCounter.displayName = `withCounter(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithCounter;
};

export default withCounter;
