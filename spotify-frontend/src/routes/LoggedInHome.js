import LoggedInContainer from "../containers/LoggedInContainer";
import { makeGETRequest } from "../utils/serverHelpers";
import SingleSongBox from "../components/shared/SingleSongBox";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Loading from "../components/shared/Loading";
import songContext from "../contexts/songContext";

const LoggedInHome = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentSong } = useContext(songContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeGETRequest("/song/get/allsong");
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
    <LoggedInContainer curActiveScreen="home">
      {loading ? (
        <Loading />
      ) : (
        <div
          className={` ${
            currentSong ? "mb-20" : ""
          } py-5 grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 overflow-auto max-lg:grid-cols-3 max-md:grid-cols-2`}
        >
          {songData.map((item) => (
            <SingleSongBox
              info={item}
              playSound={() => {}}
              key={JSON.stringify(item)}
            />
          ))}
        </div>
      )}
    </LoggedInContainer>
  );
};

export default LoggedInHome;
