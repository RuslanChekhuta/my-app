const HoverDiv = ({ count, increment }) => {
  return (
    <div className="box" onMouseEnter={increment}>
      Наведений: {count}
    </div>
  );
};

export default HoverDiv;
