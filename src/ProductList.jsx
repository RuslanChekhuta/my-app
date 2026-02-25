import { useState } from "react";
import { ProductItem } from "./ProductItem";

export const ProductList = ({ products }) => {
  const [filteredList, setFilteredList] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  // Шаг 1: Реализуй здесь фильтрацию списка products по filteredList (case-insensitive)
  // Шаг 2: Добавь console.time("filter") и console.timeEnd("filter") вокруг фильтрации
  // Шаг 3: Затем САМОСТОЯТЕЛЬНО оберни вычисление filteredProducts в useMemo
  //        и не забудь зависимости: [products, filteredList]
  const filteredProducts = [];

  return (
    <div>
      <input
        type="text"
        value={filteredList}
        onChange={(e) => setFilteredList(e.target.value)}
        placeholder="Поиск..."
      />

      <button onClick={() => setRenderCount(renderCount + 1)}>
        Рендерить - {renderCount}
      </button>

      <ul>
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product.name} />
        ))}
      </ul>
    </div>
  );
};
