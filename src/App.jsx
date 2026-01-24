import Counter from "./components/Counter";
import "./App.css";
import UserProfile from "./components/UserProfile";
import ParentComponent from "./components/ParentComponent";

const App = () => {
  return (
    <div className="container">
      <Counter />
      <UserProfile />
      <ParentComponent />
    </div>
  );
};

export default App;
