// // AudioContext.js
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useRef,
//   useEffect,
// } from "react";

// const AudioContext = createContext();

// export const useAudio = () => {
//   return useContext(AudioContext);
// };

// export const AudioProvider = ({ children }) => {
//   const [currentSong, setcurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [progress, setProgress] = useState(0); // Track progress
//   const [duration, setDuration] = useState(0); // Track duration
//   const audioRef = useRef(new Audio());

//   const play = (song) => {
//     if (currentSong !== song.track) {
//       audioRef.current.src = song.track;
//       audioRef.current.play();
//       setcurrentSong(song.track);
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(true);
//   };

//   const pause = () => {
//     audioRef.current.pause();
//     setIsPlaying(false);
//   };

//   const togglePlayPause = () => {
//     if (isPlaying) {
//       pause();
//     } else {
//       play(currentSong);
//     }
//   };

//   const setAudioVolume = (newVolume) => {
//     audioRef.current.volume = newVolume;
//     setVolume(newVolume);
//   };

//   const seekTo = (time) => {
//     audioRef.current.currentTime = time;
//     setProgress(time);
//   };

//   useEffect(() => {
//     const updateProgress = () => {
//       setProgress(audioRef.current.currentTime);
//     };

//     const updateDuration = () => {
//       setDuration(audioRef.current.duration || 0);
//     };

//     audioRef.current.addEventListener("timeupdate", updateProgress);
//     audioRef.current.addEventListener("loadedmetadata", updateDuration);

//     return () => {
//       audioRef.current.removeEventListener("timeupdate", updateProgress);
//       audioRef.current.removeEventListener("loadedmetadata", updateDuration);
//     };
//   }, []);

//   return (
//     <AudioContext.Provider
//       value={{
//         currentSong,
//         isPlaying,
//         volume,
//         progress,
//         duration,
//         currentSong,
//         play,
//         pause,
//         togglePlayPause,
//         setAudioVolume,
//         seekTo, // Expose the seekTo function
//       }}
//     >
//       {children}
//     </AudioContext.Provider>
//   );
// };

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null); // Stores the track URL
  const [currentSong, setCurrentSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0); // Track progress
  const [duration, setDuration] = useState(0); // Track duration
  const audioRef = useRef(new Audio());

  const play = (song) => {
    if (song.track && typeof song.track === "string") {
      audioRef.current.src = song.track;
      audioRef.current.play();
      setCurrentTrack(song.track);
      setCurrentSong(song); // Only keep necessary data
    } else {
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play(currentTrack);
    }
  };

  const setAudioVolume = (newVolume) => {
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  useEffect(() => {
    const updateProgress = () => {
      setProgress(audioRef.current.currentTime);
    };

    const updateDuration = () => {
      setDuration(audioRef.current.duration || 0);
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        duration,
        currentSong,
        setCurrentSong,
        play,
        pause,
        togglePlayPause,
        setAudioVolume,
        seekTo,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
