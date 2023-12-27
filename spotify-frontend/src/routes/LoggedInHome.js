import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import spotify_logo from "../images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongBox from "../components/shared/SingleSongBox";
import { useState, useEffect } from "react";


const Home = () => {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/allsong");
      setSongData(response.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer curActiveScreen="home">
      <div className="py-5 grid gap-2 grid-cols-4 overflow-auto">
        {songData.map((item) => {
          return <SingleSongBox info={item} playSound={() => {}} key={JSON.stringify(item)} />;
        })}
      </div>
    </LoggedInContainer>
  );
};

export default Home;
