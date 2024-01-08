import { createContext } from "react";

const songContext = createContext({
  currentSong:null,
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPaused: null,
  setIsPaused: () => {},
  volume:0.5,
  setvalume:()=>{},
  seek:0,
  setSeek:()=>{},
  
});

export default songContext;
