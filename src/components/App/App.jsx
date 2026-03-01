import AddUser from "../AddUser";
import DeleteUser from "../DeleteUser";
import UpdataUser from "../UpdataUser";
import UserList from "../UserList";
import "./App.css";

function App() {
  return (
    <>
      <UserList />
      <AddUser />
      <UpdataUser />
      <DeleteUser />
    </>
  );
}

export default App;
