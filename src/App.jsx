import "./App.css";
import Clicker from "./components/Clicker";
import SimpleForm from "./components/SimpleForm";
import InteractiveBox from "./components/InteractiveBox";
import SmartImage from "./components/SmartImage";

const App = () => {
  const handleAppClick = () => {
    console.log("Click from Parent");
  };

  return (
    <div className="container">
      <div className="section">
        <Clicker onParentClick={handleAppClick} />
      </div>

      <div className="section">
        <SimpleForm />
      </div>

      <div className="section">
        <InteractiveBox />
      </div>

      <div className="section">
        <SmartImage />
      </div>
    </div>
  );
};

export default App;
