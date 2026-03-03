import { useEffect, useState } from "react";
import { TransitionTabsBase } from "./TransitionTabsBase";

export function SyncTabExample() {
  return <TransitionTabsBase renderTab={renderTab} />;
}

function renderTab(tab) {
  if (tab === "home") return <HomeTab />;
  if (tab === "about") return <SlowAboutTab />;
  return <ContactTab />;
}

function HomeTab() {
  return <h2>Главная страница</h2>;
}

function SlowAboutTab() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isReady) return <p>Подготовка данных вкладки...</p>;

  return <h2>О нас - это медленная вкладка</h2>;
}

function ContactTab() {
  return <h2>Контакты</h2>;
}
