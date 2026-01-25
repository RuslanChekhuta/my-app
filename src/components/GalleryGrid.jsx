const GalleryGrid = ({ items }) => {
  return (
    <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Gallery item ${index}`}
          className="w-full h-auto object-cover"
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
