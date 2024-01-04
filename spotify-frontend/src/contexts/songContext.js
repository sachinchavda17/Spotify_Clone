import { createContext } from "react";

const songContext = createContext({
  currentSong: {
    duration: 0,
    currentTime: 0,
  },
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPaused: null,
  setIsPaused: () => {},
});

export default songContext;
