// AudioPlayer.js
import React, { useEffect, useState } from "react";
import { useAudio } from "../contexts/AudioContext";
import { makeGETRequest } from "../utils/serverHelpers";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AudioPlayer = () => {
  const { currentTrack, isPlaying, togglePlayPause, setAudioVolume, play } =
    useAudio();
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeGETRequest("/song/get/logout/allsong");
        setSongData(response.data);
        console.log(songData)
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="audio-player bg-white">
      <div>
        <Link to={"/"} >Home</Link>
        <ul>
          {songData.map((song) => (
            <li key={song._id}>
              <span>{song.name}</span>
              <button onClick={() => play(song.track)}>{" "}Play</button>
            </li>
          ))}
        </ul>
      </div>
      {currentTrack && (
        <>
          <h3>Now Playing: {currentTrack}</h3>
          <button onClick={togglePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => setAudioVolume(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
