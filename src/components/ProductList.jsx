const ProductList = () => {
  // TODO: Реализуйте логику здесь.

  const products = [
    { id: 1, name: "Laptop", price: 1000, discount: 0.1 },
    { id: 2, name: "Mouse", price: 50, discount: 0 },
  ];

  return (
    <div className="card">
      <ul>
        {products.map(({ id, name, price, discount }) => {
          const finalPrice = price * (1 - discount);

          if (discount > 0) {
            return (
              <li key={id} className="list-item">
                {name}: <span className="old-price">${price}</span>
                <span className="price-tag">${finalPrice}</span>
              </li>
            );
          }

          return (
            <li key={id} className="list-item">
              {name}: <span className="price-tag">${price}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
