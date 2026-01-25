const Card = ({ title }) => {
  return (
    <div className="p-6 bg-white shadow-xl rounded-xl rotate-[3deg] border-2 border-gray-200">
      <h2>{title}</h2>
    </div>
  );
};

export default Card;
