import { Link } from "react-router-dom";
import { makeLogoutGETRequest } from "../utils/serverHelpers";
import { useState, useEffect } from "react";
import SingleSongBox from "../components/shared/SingleSongBox";
import LoggedInContainer from "../containers/LoggedInContainer";

const Home = () => {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeLogoutGETRequest("/song/get/logout/allsong");
      setSongData(response.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer curActiveScreen="home">
      <div className="py-5 grid gap-2 grid-cols-4 overflow-auto">
        {songData ? (
          songData.map((item, ind) => {
            return (
              <Link to={"/login"}>
                <SingleSongBox
                  info={item}
                  ListKey={ind}
                  key={ind}
                  playSound={() => {}}
                />
              </Link>
            );
          })
        ) : (
          <div className="text-white">No data found! </div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default Home;
