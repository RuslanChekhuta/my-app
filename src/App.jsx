import "./App.css";
import EmailValidator from "./components/EmailValidator";
import ExpressionPractice from "./components/ExpressionPractice";
import JsxRules from "./components/JsxRules";
import StyleCard from "./components/StyleCard";

const App = () => {
  return (
    <div>
      <JsxRules />
      <ExpressionPractice />
      <StyleCard />
      <EmailValidator />
    </div>
  );
};

export default App;
