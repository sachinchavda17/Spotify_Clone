import { useContext, useEffect, useRef, useState } from "react";
import songContext from "../../contexts/songContext";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import {
  makeAuthenticatedGETRequest,
  makeLogoutGETRequest,
} from "../../utils/serverHelpers";
import SuccessMsg from "./SuccessMsg";
import ErrorMsg from "./ErrorMsg";

const SingleSongCard = ({ info, playSound }) => {
  const [liked, setLiked] = useState(null); // Changed to null to represent initial loading state
  const { currentSong, setCurrentSong } = useContext(songContext);
  const [duration, setDuration] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser._id;
  const songId = info._id;
  const [showModal, setShowModal] = useState(false);
  const [isLikedPopover, setIsLikedPopover] = useState("");

  const fetchLikedStatus = async () => {
    try {
      const response = await makeLogoutGETRequest(
        `/song/liked/${userId}/${songId}`
      );
      const likedStatus =
        response && response.liked !== undefined ? response.liked : false;
      setLiked(likedStatus);
    } catch (err) {
      setLiked(false);
    }
  };
  useEffect(() => {
    fetchLikedStatus();
  }, [liked]);

  const likeToggleFetch = async () => {
    try {
      const response = await makeLogoutGETRequest(
        `/song/like/${userId}/${songId}`
      );
      setLiked(response.msg);
    } catch (err) {
      setLiked("Error toggling like");
    }
  };

  useEffect(() => {
    fetchLikedStatus();
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

  return (
    <>
      <div
        className={` flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm  rounded border-gray-500 `}
      >
        <div
          onClick={() => {
            setCurrentSong(info);
          }}
          className="w-12 h-12 bg-cover bg-center"
          style={{
            backgroundImage: `url("${info.thumbnail}")`,
          }}
        ></div>
        <div className="flex w-full">
          <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
            <div>
              <span className="cursor-pointer hover:underline">
                {info.name}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 cursor-pointer hover:underline">
                {info.artist.firstName + " " + info.artist.lastName}
              </span>
            </div>
          </div>

          <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
            <div className="relative">
              <Icon
                onMouseEnter={() => setIsLikedPopover(true)}
                onMouseLeave={() => setIsLikedPopover(false)}
                icon={`${!liked ? "ph:heart-bold" : "ph:heart-fill"}`}
                fontSize={25}
                className={`cursor-pointer    ${
                  !liked ? "text-gray-500 hover:text-white" : " text-green-500"
                } `}
                onClick={() => likeToggleFetch()}
              />
              {isLikedPopover && (
                <div className="absolute z-10 bottom-0 right-0 mb-4 mr-6 text-sm  transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 text-gray-400 border-gray-600 bg-gray-800">
                  <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg border-gray-600 bg-gray-700">
                    <h3 className="font-semibold text-gray-200">
                      {liked ? "Like" : "Dislike"}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleSongCard;
