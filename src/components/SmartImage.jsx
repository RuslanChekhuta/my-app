const SmartImage = () => {
  const handleError = (e) => {
    e.currentTarget.onerror = null; // чтобы не зациклить
    e.currentTarget.src = "https://placehold.co/150";
  };

  return (
    <div className="section">
      <img
        className="error-img"
        src="broken.jpg"
        alt="Broken"
        onError={handleError}
      />
    </div>
  );
};

export default SmartImage;
