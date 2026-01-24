const Clicker = ({ onParentClick }) => {
  // TODO: Реализуйте логику здесь.

  const handleClick = () => {
    console.log("Button clicked!");
  };

  const fn = (agr) => {
    console.log(agr);
  };

  return (
    <div className="section">
      <button onClick={handleClick}>кнопка 1</button>
      <button onClick={() => fn("Hello React")}>кнопка 2</button>
      <button onClick={onParentClick}>Parent click</button>
    </div>
  );
};

export default Clicker;
