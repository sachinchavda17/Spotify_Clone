// MusicFooter.js
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import songContext from "../../contexts/songContext.js";

const MusicFooter = () => {
  const {
    isPaused,
    setIsPaused,
    volume,
    setVolume,
    seek,
    setSeek,
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
  } = useContext(songContext);

  setSoundPlayed(currentSong.track);
  const soundRef = useRef(null);
  const [liked, setLiked] = useState(false);

  useLayoutEffect(() => {
    // Declare sound variable using const
    const sound = new Howl({
      src: [soundPlayed],
      volume: volume,
      html5: true,
      loop: true,
      onend: () => {
        setIsPaused(true);
        console.log("Song Ended");
        // Logic for what to do when the song ends
      },
      onpause: () => {
        setIsPaused(true);
        console.log("Song Paused");
      },
      onplay: () => {
        setInterval(() => {
          setSeek(soundRef.current.seek());
        }, 10);
        setIsPaused(false);
        console.log("Song Played");
      },
      onstop: () => {
        setIsPaused(true);
        setSeek(0);
        console.log("Song Stopped");
      },
    });

    // Update soundPlayed and volume when they change
    sound.volume(volume);
    sound.play();
    soundRef.current = sound;

    return () => {
      sound.unload();
    };
  }, [soundPlayed, volume]);

  const playPauseHandler = () => {
    if (isPaused) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
    setIsPaused(!isPaused);
  };

  const nextSongHandler = () => {
    // Logic for playing the next song
    console.log("Click on Next Song");
  };

  const prevSongHandler = () => {
    // Logic for playing the previous song
    console.log("Click on Previous Song");
  };

  const muteHandler = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  const volumeChangeHandler = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const seekChangeHandler = (e) => {
    const newSeek = parseFloat(e.target.value);
    setSeek(newSeek);
    soundRef.current.seek(newSeek);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white px-4 py-1 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/4">
          <img
            src={currentSong.thumbnail}
            alt="Song Cover"
            className="w-16 h-16  mr-4"
          />
          <div>
            <p className="text-sm">{currentSong.name}</p>
            {currentSong.artist.firstName + " " + currentSong.artist.lastName}
          </div>
        </div>
        <div className="flex items-center space-x-4 flex-col w-2/3">
          <div className="flex items-center space-x-4">
            <button onClick={prevSongHandler} className="pl-5">
              <Icon
                icon="bi:skip-backward"
                fontSize={25}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </button>

            <button onClick={playPauseHandler} className="text-3xl">
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={50}
                className={`cursor-pointer text-white   `}
              />
            </button>

            <button onClick={nextSongHandler}>
              <Icon
                icon="bi:skip-forward"
                fontSize={25}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </button>
          </div>
          <div className="flex items-center justify-between space-x-4 w-2/3">
            <span className="">{secondsToHms(seek)}</span>
            <input
              type="range"
              value={seek}
              onChange={(e) => seekChangeHandler(e)}
              min="0"
              max={soundRef.current?.duration()}
              className={`w-full cursor-pointer rounded appearance-none h-2 bg-gradient-to-r from-gray-400 to-gray-400`}
            />
            <span>{secondsToHms(soundRef.current?.duration())}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 w-1/4">
          <Icon
            icon="ic:round-playlist-add"
            fontSize={30}
            className="cursor-pointer text-gray-500 hover:text-white"
          />
          <Icon
            icon={`${liked ? "ph:heart-bold" : "ph:heart-fill"}`}
            fontSize={25}
            className={`cursor-pointer    ${
              liked ? "text-gray-500 hover:text-white" : " text-green-500"
            } `}
            onClick={() => setLiked(!liked)}
          />
          <button onClick={muteHandler}>
            <Icon
              icon={volume === 0 ? "bi:volume-mute" : "bi:volume-up"}
              fontSize={25}
              className={`cursor-pointer ${
                volume === 0
                  ? "text-gray-500"
                  : volume < 5
                  ? "text-gray-300"
                  : "text-white"
              } hover:text-gray-100`}
            />
          </button>
          <input
            className="appearance-none h-2 rounded bg-gray-400"
            type="range"
            value={volume}
            onChange={(e) => volumeChangeHandler(e)}
            min="0"
            max="1"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicFooter;

function secondsToHms(seconds) {
  if (seconds === 0) return "00:00";

  let duration = seconds;
  let hours = duration / 3600;
  duration = duration % 3600;

  let min = parseInt(duration / 60);
  duration = duration % 60;

  let sec = parseInt(duration);

  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
  } else if (min === 0) {
    return `00m ${sec}s`;
  } else {
    return `${min}:${sec}`;
  }
}
