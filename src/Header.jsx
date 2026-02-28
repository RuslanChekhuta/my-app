import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { PlayerContext } from "./context/PlayerContext";

import UserInfo from "./UserInfo";

const Header = () => {
  const user = useContext(UserContext);
  const player = useContext(PlayerContext);
  console.log(player);

  return (
    <div>
      <h1>Добро пожаловать, {user.name}</h1>
      <button onClick={player.togglePlay}>
        {player.isPlaying ? "Пауза" : "Играть"}
      </button>
      <UserInfo />
    </div>
  );
};

export default Header;
