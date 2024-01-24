import { useContext } from "react";
import songContext from "../../contexts/songContext";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const SingleSongBox = ({ info, playSound, ListKey, edit }) => {
  const { setCurrentSong } = useContext(songContext);
  const songId = info._id;
  return (
    <div
      className="flex p-1 sm:p-2 rounded-sm w-full justify-between space-x-4  "
      onClick={() => {
        if (!edit) {
          setCurrentSong(info);
        }
      }}
      key={ListKey}
    >
      <div className="bg-black bg-opacity-40 w-full   rounded-lg hover:bg-gray-400 hover:bg-opacity-20">
        <div className="overflow-hidden">
          <img
            className="h-34 sm:w-full sm:h-56  transform scale-100 hover:scale-110 transition-transform duration-10 "
            src={info.thumbnail}
            alt="label"
          />
        </div>
        <div className="px-4 py-3">
          <div className="text-white text-sm sm:text-base font-semibold py-1">
            {info.name}
          </div>
          <div className="text-gray-500  text-xs sm:text-sm py-1">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
          {edit && (
            <Link to={`/edit/${songId}`}>
              <div className="bg-green-600 border border-gray-900 rounded-lg p-2 w-full text-center cursor-pointer flex justify-center space-x-2 ">
                <span>Edit</span>
                <Icon
                  icon={"bitcoin-icons:edit-filled"}
                  className={`text-gray-700 hover:text-black`}
                  fontSize={25}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleSongBox;
