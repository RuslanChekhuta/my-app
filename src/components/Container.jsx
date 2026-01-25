const Container = ({ children }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px",
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
