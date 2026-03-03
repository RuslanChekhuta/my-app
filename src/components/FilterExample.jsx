import { useState, useTransition } from "react";

const data = Array.from({ length: 10000 }, (_, i) => `Элемент ${i + 1}`);

export function FilterExample() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFilteredData(data);
      return;
    }

    startTransition(() => {
      const normalizedQuery = value.toLowerCase();
      setFilteredData(
        data.filter((item) => item.toLowerCase().includes(normalizedQuery)),
      );
    });
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Поиск..."
      />
      {isPending ? (
        <div>Поиск...</div>
      ) : (
        <ul>
          {filteredData.slice(0, 20).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
