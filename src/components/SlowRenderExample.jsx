import { useState, useTransition } from "react";

const ITEMS_COUNT = 10000;
const VISIBLE_ITEMS = 200;

export function SlowRenderExample() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;
    setInput(value);

    if (!value.trim()) {
      setList([]);
      return;
    }

    // Тяжелую часть оставляем в transition, чтобы ввод не "залипал".
    startTransition(() => {
      const items = [];
      for (let i = 0; i < ITEMS_COUNT; i++) {
        items.push(`${value} #${i + 1}`);
      }
      setList(items);
    });
  }

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      {isPending ? (
        <div>Загрузка...</div>
      ) : (
        <>
          <ul>
            {list.slice(0, VISIBLE_ITEMS).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {list.length > VISIBLE_ITEMS && (
            <p>
              Показано {VISIBLE_ITEMS} из {list.length} элементов
            </p>
          )}
        </>
      )}
    </div>
  );
}
