const StyleCard = () => {
  // TODO: Реализуйте логику здесь.
  return (
    <div className="card">
      <h3>Инлайн стили</h3>
      <div
        style={{
          backgroundColor: "#e0f7fa",
          borderRadius: "10px",
          color: "darkgreen",
        }}
      >
        Я стилизован через объект!
      </div>
    </div>
  );
};

export default StyleCard;
