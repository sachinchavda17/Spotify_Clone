
// AudioContext.js
import React, { createContext, useContext, useState, useRef } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
    return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(new Audio());

    const play = (track) => {
        if (currentTrack !== track) {
            audioRef.current.src = track;
            audioRef.current.play();
            setCurrentTrack(track);
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

    return (
        <AudioContext.Provider value={{ currentTrack, isPlaying, play, pause, togglePlayPause, setAudioVolume }}>
            {children}
        </AudioContext.Provider>
    );
};