import { useContext, useEffect, useRef, useState } from "react";
import songContext from "../../contexts/songContext";
import { Howl } from "howler";
import { secondsToHms } from "../../containers/functionContainer";

const SingleSongCard = ({ info, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const music = new Howl({
      src: [info.track],
      html5: true,
      onload: () => {},
    });
    return () => {
      music.unload();
      setDuration(music.duration());
    };
  }, [info.track]);
  console.log(duration);

  return (
    <div
      className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm  rounded border-gray-500 "
      onClick={() => {
        setCurrentSong(info);
      }}
    >
      <div
        className="w-12 h-12 bg-cover bg-center"
        style={{
          backgroundImage: `url("${info.thumbnail}")`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
          <div>
            <span className="cursor-pointer hover:underline">{info.name}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 cursor-pointer hover:underline">
              {info.artist.firstName + " " + info.artist.lastName}
            </span>
          </div>
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <div>{secondsToHms(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
