const Button = ({ label = "Нажми меня", customStyle, onClick }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <button className="btn" style={customStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
