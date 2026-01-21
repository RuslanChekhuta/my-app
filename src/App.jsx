import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>

      <Footer />
    </>
  );
};

export default App;
