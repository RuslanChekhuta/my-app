import { useState, useTransition } from "react";

const tabs = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О нас (медленная)" },
  { id: "contact", label: "Контакты" },
];

export function TransitionTabsBase({ renderTab }) {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <div>
      {tabs.map((item) => (
        <button key={item.id} onClick={() => selectTab(item.id)}>
          {item.label}
        </button>
      ))}

      <hr />

      {isPending ? <div>Загрузка вкладки...</div> : <div>{renderTab(tab)}</div>}
    </div>
  );
}
