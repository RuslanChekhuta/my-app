import { useContext, useEffect, useRef } from "react";
import { UserContext } from "./context/UserContext";
import { PlayerContext } from "./context/PlayerContext";

const UserDetails = () => {
  const { user } = useContext(UserContext);
  const player = useContext(PlayerContext);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (player.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [player.isPlaying]);

  return (
    <>
      <div>
        <h3>Детали пользователя:</h3>
        <p>Имя: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div>
        <h4>Плеер</h4>
        <p>Состояние: {player.isPlaying ? "проигрывается" : "на паузе"}</p>
        <audio
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          ref={audioRef}
          controls
        />
      </div>
    </>
  );
};

export default UserDetails;
