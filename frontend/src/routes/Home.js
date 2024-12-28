import { Link } from "react-router-dom";
import { makeGETRequest } from "../utils/serverHelpers";
import { useState, useEffect } from "react";
import SingleSongBox from "../components/SingleSongBox";
import LoggedInContainer from "../containers/LoggedInContainer";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import SongNotAvailable from "../components/SongNotAvailable";

const Home = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeGETRequest("/song/get/logout/allsong");
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
      ) : songData.length === 0 ? (
        <SongNotAvailable />
      ) : (
        <div className="py-5 grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 overflow-auto max-lg:grid-cols-3 max-md:grid-cols-2">
          {songData.map((item, ind) => (
            <Link to={"/login"} key={ind}>
              <SingleSongBox item={item} ListKey={ind} />
            </Link>
          ))}
        </div>
      )}
    </LoggedInContainer>
  );
};

export default Home;
