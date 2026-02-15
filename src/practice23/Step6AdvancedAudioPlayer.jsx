import { useCallback, useEffect, useRef, useState } from "react";

const TRACKS = [
  {
    id: 1,
    title: "Track 1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Track 2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Track 3",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

function Step6AdvancedAudioPlayer() {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = TRACKS[currentTrackIndex];

  const resetPlaybackUi = useCallback(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, []);

  const handleNextTrack = () => {
    resetPlaybackUi();
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrevTrack = () => {
    resetPlaybackUi();
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handlePlayPause = async () => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }

    if (audioElement.paused) {
      try {
        await audioElement.play();
        setIsPlaying(true);
      } catch (error) {
        console.error(error);
      }
      return;
    }

    audioElement.pause();
    setIsPlaying(false);
  };

  const handleVolumeChange = (event) => {
    const nextVolume = parseFloat(event.target.value);
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = nextVolume;
    }
    setVolume(nextVolume);
  };

  const handleSeek = (event) => {
    const nextTime = parseFloat(event.target.value);
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime = nextTime;
    }
    setCurrentTime(nextTime);
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return undefined;
    }

    audioElement.volume = volume;
    return undefined;
  }, [volume, currentTrackIndex]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return undefined;
    }

    const syncTime = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const syncDuration = () => {
      setDuration(audioElement.duration || 0);
    };

    audioElement.addEventListener("timeupdate", syncTime);
    audioElement.addEventListener("loadedmetadata", syncDuration);
    audioElement.addEventListener("durationchange", syncDuration);

    return () => {
      audioElement.removeEventListener("timeupdate", syncTime);
      audioElement.removeEventListener("loadedmetadata", syncDuration);
      audioElement.removeEventListener("durationchange", syncDuration);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    // TODO Шаг 6:
    // 1) создай handleEnded, который вызывает handleNextTrack()
    // 2) подпишись через audioElement.addEventListener("ended", handleEnded)
    // 3) добавь cleanup с removeEventListener("ended", handleEnded)
    // 4) сохрани audioRef.current в локальную переменную внутри эффекта
    //    и используй именно ее в cleanup

    const audioElement = audioRef.current;
    if (!audioElement) return undefined;

    const handleEnded = () => {
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    };

    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]);

  return (
    <div>
      <p className="hint">
        Цель: научиться вручную управлять DOM-событиями через ref и cleanup.
      </p>
      <div className="demo-box stack">
        <p>Текущий трек: {currentTrack.title}</p>
        <audio ref={audioRef} src={currentTrack.src} preload="metadata" />

        <div className="controls">
          <button onClick={handlePrevTrack}>Предыдущий</button>
          <button onClick={handlePlayPause}>
            {isPlaying ? "Пауза" : "Плей"}
          </button>
          <button onClick={handleNextTrack}>Следующий</button>
        </div>

        <label>
          Перемотка:
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={Math.min(currentTime, duration || 0)}
            onChange={handleSeek}
            style={{ width: 280, marginLeft: 8 }}
          />
        </label>
        <p>
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>

        <label>
          Громкость:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{ width: 180, marginLeft: 8 }}
          />
        </label>
      </div>
    </div>
  );
}

export default Step6AdvancedAudioPlayer;
