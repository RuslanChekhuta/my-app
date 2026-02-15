import { useEffect, useState } from "react";

const ChildInput = ({ resetTrigger }) => {
  // TODO: Реализуйте очистку инпута при изменении resetTrigger.
  const [text, setText] = useState("");

  useEffect(() => {
    // TODO: setText("");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText("");
  }, [resetTrigger]);

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Введите текст"
    />
  );
};

export default ChildInput;
