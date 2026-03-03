import { TransitionTabsBase } from "./TransitionTabsBase";

export function TabExample() {
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

const SlowAboutTab = function SlowAboutTab() {
  const items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return <ul>{items}</ul>;
};

function SlowPost({ index }) {
  let checksum = 0;
  for (let i = 0; i < 1500; i++) {
    checksum += Math.sqrt(i + index);
  }
  if (!checksum) return null;
  return <li>Элемент #{index + 1}</li>;
}

function ContactTab() {
  return <h2>Контакты</h2>;
}
