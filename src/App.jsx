import { UserProvider } from "./context/UserProvider";
import { PlayerProvider } from "./context/PlayerProvider";

import Header from "./Header";

function App() {
  return (
    <UserProvider>
      <PlayerProvider>
        <Header />
      </PlayerProvider>
    </UserProvider>
  );
}

export default App;
