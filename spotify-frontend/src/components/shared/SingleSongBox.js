import { useContext } from "react";
import songContext from "../../contexts/songContext";

const SingleSongCard = ({ info, playSound, ListKey }) => {
  const { setCurrentSong } = useContext(songContext);

  return (
    <div
      className="flex p-2 rounded-sm w-full justify-between space-x-4"
      onClick={() => {
        setCurrentSong(info);
      }}
      key={ListKey}
    >
      <div className="bg-black bg-opacity-40 w-full  rounded-lg hover:bg-gray-400 hover:bg-opacity-20">
        <div className="overflow-hidden">
          <img
            className="w-full h-56  transform scale-100 hover:scale-110 transition-transform duration-10 "
            src={info.thumbnail}
            alt="label"
          />
        </div>
        <div className="px-4 py-3">
          <div className="text-white font-semibold py-1">{info.name}</div>
          <div className="text-gray-500 text-sm py-1">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
