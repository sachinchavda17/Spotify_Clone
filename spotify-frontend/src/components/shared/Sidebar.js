// App.js
import React, { useState, useRef, useEffect } from 'react';
import {Howl} from 'howler';
import './Sidebar.css';
import song from './Hua_Main.mp3'

function App() {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const sound = useRef();
  const onChange = (e) => {
    const newPosition = (e.target.value / 100) * duration;
    console.log('New Position:', newPosition);
    sound.current.seek(newPosition);
    setPercentage(e.target.value);
    setCurrentTime(newPosition);
  };
console.log("currentTime: " + currentTime)  

  const play = () => {
    if (isPlaying) {
      sound.current.pause();
    } else {
      sound.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    console.log('Updating progress...');
    const position = sound.current.seek();
    console.log('Position:', position);
    const percent = (position / duration) * 100;
    console.log('Percent:', percent);
    setCurrentTime(position);
    setPercentage(percent);
  };
  
  useEffect(() => {
    sound.current = new Howl({
      src: [song],
      volume: 0.1,
      onplay: () => {
        setIsPlaying(true);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onend: () => {
        setIsPlaying(false);
        setPercentage(0);
      },
    });
  
    sound.current.on('load', () => {
      setDuration(sound.current.duration().toFixed(2));
    });
  
    sound.current.on('seek', updateProgress);
    const currentTimes = sound.current.seek();
    console.log('Current Time:', currentTimes);
  
    return () => {
      sound.current.off('load');
      sound.current.off('seek', updateProgress);
      sound.current.unload();
    };
  }, []);

    

  return (
    <div className='app-container'>
      <h1>Audio Player</h1>
      <div className='slider-container'>
        <div
          className='progress-bar-cover'
          style={{
            width: `${(duration !== 0 && (percentage / 100) * duration) || 0}px`,
          }}
        ></div>
        <div
          className='thumb'
          style={{
            left: `${percentage}%`,
            marginLeft: `${-10}px`,
          }}
        ></div>
        <input
          type='range'
          value={percentage}
          step='0.01'
          className='range'
          onChange={onChange}
          style={{ opacity: 0 }}
        />
      </div>
      <div className='control-panel'>
        <div className='timer'>{secondsToHms(currentTime)}</div>
        <div className='btn-container'>
          <div onClick={play} className={isPlaying ? 'btn-stop' : 'btn-play'}></div>
        </div>
        <div className='timer'>{secondsToHms(duration)}</div>
      </div>
    </div>
  );
}

function secondsToHms(seconds) {
    if (seconds === 0) return '00m 00s';
  
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
      return `${min}m ${sec}s`;
    }
  }
  
  

export default App;
