const ChildComponent = ({ id, value, onIncrement }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <div className="counter-box">
      <h4>#{id}</h4>
      <p>Count: {value}</p>
      <button className="btn" onClick={onIncrement}>
        +1
      </button>
    </div>
  );
};

export default ChildComponent;
