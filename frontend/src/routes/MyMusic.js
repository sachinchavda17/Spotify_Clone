import { useState, useEffect, useCallback, useContext } from "react";
import SingleSongCard from "../components/SingleSongCard";
import { makeGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useAudio } from "../contexts/AudioContext";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentSong } = useAudio();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeGETRequest("/song/get/mysongs");
        setSongData(response.data);
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen="myMusic">
      {loading ? (
        <Loading />
      ) : (
        <div className={`${currentSong ? " mb-20 " : ""}`}>
          <div
            className={`  text-white text-2xl font-semibold pb-4 pl-2 sm:pt-5`}
          >
            My Songs
          </div>
          {songData.length === 0 ? (
            <div className="text-lightGray text-lg pl-2">
              You haven't upload song.
            </div>
          ) : (
            <div className="space-y-3 overflow-auto">
              {songData.map((item) => (
                <SingleSongCard
                  info={item}
                  songList={songData}
                  key={JSON.stringify(item)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </LoggedInContainer>
  );
};

export default MyMusic;
