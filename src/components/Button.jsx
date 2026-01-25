const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition-all cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
