import { useState, useEffect, useCallback, useContext } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import { toast } from "react-toastify";
import Loading from "../components/shared/Loading";
import NewHome from "../containers/LoggedInContainer";
import songContext from "../contexts/songContext";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentSong } = useContext(songContext);
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
      )  : (
        <div className={`${currentSong ? " mb-20 " : ""}`}>
          <div className={`  text-white text-xl font-semibold pb-4 pl-2 pt-8`}>
            My Songs
          </div>
          <div className="space-y-3 overflow-auto">
            {songData.map((item) => (
              <SingleSongCard
                info={item}
                playSound={() => { }}
                key={JSON.stringify(item)}
              />
            ))}
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default MyMusic;
