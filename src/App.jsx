import "./App.css";
import ControlledForm from "./components/ControlledForm";
import MixedForm from "./components/MixedForm";
import UncontrolledForm from "./components/UncontrolledForm";

const App = () => {
  return (
    <div>
      <ControlledForm />
      <UncontrolledForm />
      <MixedForm />
    </div>
  );
};

export default App;
