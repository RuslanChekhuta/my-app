const ClickButton = ({ count, increment, label }) => {
  return (
    <button className="btn" onClick={increment}>
      {label}: {count}
    </button>
  );
};

export default ClickButton;
