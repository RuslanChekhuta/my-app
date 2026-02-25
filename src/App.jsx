import { ProductList } from "./ProductList";

function App() {
  const products = [];

  // Шаг 1: Сгенерируй 1000 продуктов через for (i от 0 до 999)
  for (let i = 0; i <= 999; i += 1) {
    // Шаг 2: products.push({ id: i + 1, name: `Продукт ${i + 1}` })
    products.push({ id: i + 1, name: `Продукт ${i + 1}` });
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default App;
