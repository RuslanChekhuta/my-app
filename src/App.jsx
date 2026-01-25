import "./App.css";
import ProductList from "./components/ProductList";
import SimpleList from "./components/SimpleList";
import TaskBoard from "./components/TaskBoard";
import UserList from "./components/UserList";

const App = () => {
  // TODO: Реализуйте логику здесь.
  return (
    <div className="container">
      <h2>Simple List</h2>
      <SimpleList />

      <h2>User List</h2>
      <UserList />

      <h2>Product List</h2>
      <ProductList />

      <h2>Task Board</h2>
      <TaskBoard />
    </div>
  );
};

export default App;
