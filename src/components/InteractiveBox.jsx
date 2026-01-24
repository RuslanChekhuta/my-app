import { useState } from "react";

const InteractiveBox = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="section">
      <div
        className={isActive ? "box active" : "box"}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        Hover me
      </div>

      <div
        className="scroll-box"
        onScroll={(e) => {
          console.log(e.target.scrollTop);
        }}
      >
        <p>Длинный текст 1</p>
        <p>Длинный текст 2</p>
        <p>Длинный текст 3</p>
        <p>Длинный текст 4</p>
        <p>Длинный текст 5</p>
        <p>Длинный текст 6</p>
      </div>
    </div>
  );
};

export default InteractiveBox;
