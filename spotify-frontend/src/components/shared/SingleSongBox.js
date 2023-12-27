import { useContext } from "react";
import songContext from "../../contexts/songContext";

const SingleSongCard = ({ info, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);

  return (
    <div
      className="flex p-2 rounded-sm w-full justify-between space-x-4"
      onClick={() => {
        setCurrentSong(info);
      }}
    >
      <div className="bg-black bg-opacity-40 w-full p-4 rounded-lg hover:bg-gray-400 hover:bg-opacity-20">
        <div className="pb-4 pt-2">
          <img
            className="w-full h-40 rounded-md" // Set the fixed height class here (e.g., h-40)
            src={info.thumbnail}
            alt="label"
          />
        </div>
        <div className="text-white font-semibold py-3">{info.name}</div>
        <div className="text-gray-500 text-sm">
          {info.artist.firstName + " " + info.artist.lastName}
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
