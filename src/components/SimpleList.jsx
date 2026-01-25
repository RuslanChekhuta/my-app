const SimpleList = () => {
  const arr = ["HTML", "CSS", "JavaScript", "React"];

  // TODO: Реализуйте логику здесь.
  return (
    <div className="card">
      <ul>
        {arr.map((e) => (
          <li className="list-item" key={e}>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleList;
