import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

const App = () => {
  // TODO: Реализуйте логику здесь.
  return (
    <div className="container">
      <Header title="React DevTools Practice" />
      <UserProfile
        name="Alex"
        age={25}
        job="Frontend Developer"
        status="Active"
      />
      <Footer year={2024} />
    </div>
  );
};

export default App;
