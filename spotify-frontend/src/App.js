import "./output.css";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/Home";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import SearchPage from "./routes/SearchPage";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContext";
import MusicFooter from "./components/shared/MusicFooter";
import SongDetails from "./components/shared/SongDetails";
import NewHome from "./routes/NewHome";
import LoggedInContainer from "./containers/LoggedInContainer";
import MusicPlayer from "./routes/Song";
import Userprofile from "./components/shared/UserProfile";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [seek, setSeek] = useState(0);
  const [cookie, setCookie] = useCookies(["token"]);
  // const [userData, setUserData] = useState(
  //   JSON.parse(localStorage.getItem("currentUser")) || null
  // );
  
  // useEffect(() => {
  //   if (currentSong) {
  //     const currentUserString = localStorage.getItem("currentUser");
  //     const currentUser = currentUserString
  //       ? JSON.parse(currentUserString)
  //       : null;
  //     if (currentUser) {
  //       currentUser.currentSong = currentSong;
  //       currentSong.soundPlayed = soundPlayed;
  //       currentSong.soundPlayed = soundPlayed;
  //       currentSong.isPaused = isPaused;
  //       currentSong.volume = volume;
  //       currentSong.seek = seek;
  //       localStorage.setItem("currentUser", JSON.stringify(currentUser));
  //     }
  //   }
  // }, [currentSong]);


  const songContextState = {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
    volume,
    setVolume,
    seek,
    setSeek,
  };
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          // logged in routes
          <songContext.Provider value={songContextState}>
            <Routes>
              <Route path="/" element={<LoggedInHomeComponent />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<Userprofile />} />
              <Route path="/music" element={<MusicFooter />} />
              <Route path="/playedsong" element={<SongDetails />} />
              <Route path="/res" element={<MusicPlayer />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          // logged out routes
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
