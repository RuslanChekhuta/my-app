import ProfileCard from "./components/ProfileCard";
import FragmentList from "./components/FragmentList";
import SimpleCounter from "./components/SimpleCounter";
import { userData, glossary } from "./data/mockData";
import "./App.css";

const App = () => {
  return (
    <>
      <ProfileCard {...userData} />
      <FragmentList items={glossary} />
      <SimpleCounter />
    </>
  );
};

export default App;
