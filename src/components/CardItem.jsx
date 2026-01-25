const CardItem = ({ title, description }) => {
  return (
    <div className="w-30 mt-22.5 p-4 rounded-4xl bg-gray-100 cursor-pointer transition-colors duration-900 hover:bg-red-400">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardItem;
