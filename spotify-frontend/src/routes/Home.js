import { Link } from "react-router-dom";
import { makeLogoutGETRequest } from "../utils/serverHelpers";
import { useState, useEffect } from "react";
import SingleSongBox from "../components/shared/SingleSongBox";
import LoggedInContainer from "../containers/LoggedInContainer";
import ErrorMsg from "../components/shared/ErrorMsg";
import Loading from "../components/shared/Loading";
import NewHome from "./NewHome";

const Home = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeLogoutGETRequest("/song/get/logout/allsong");
        setSongData(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const closeErrorSuccess = () => {
    setError("");
  };

  return (
    // <LoggedInContainer curActiveScreen="home">
    <NewHome>

      {loading ? (
        <Loading />
        ) : error ? (
          <ErrorMsg errText={error} reload={true} closeError={closeErrorSuccess} />
          ) : (
            <div className="py-5 grid gap-2 grid-cols-1 sm:grid-cols-4 overflow-auto ">
          {songData.length &&
            songData.map((item, ind) => (
              <Link to={"/login"} key={ind}>
                <SingleSongBox info={item} ListKey={ind} />
              </Link>
            ))}
        </div>
      )}
      </NewHome>
    // </LoggedInContainer>
  );
};

export default Home;
