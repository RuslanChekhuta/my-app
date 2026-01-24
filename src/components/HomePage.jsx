const HomePage = ({ setClicks }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <div>
      <button
        onClick={() => {
          setClicks((prev) => prev + 1);
        }}
      >
        Кликнуть (+1)
      </button>
      <button
        onClick={() => {
          setClicks((prev) => prev + 1);
          setClicks((prev) => prev + 1);
          setClicks((prev) => prev + 1);
        }}
      >
        Супер-клик (+3)
      </button>
    </div>
  );
};

export default HomePage;
