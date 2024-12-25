import "./App.css";
import { useState } from "react";
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
import MusicFooter from "./components/MusicFooter";
import SongDetails from "./routes/SongDetails";
import Userprofile from "./routes/UserProfile";
import EditPage from "./routes/EditPage";
import EditSongPage from "./components/EditSong";
import LikedSongs from "./routes/LikedSongs";
import { ToastContainer } from "react-toastify";
import { AudioProvider } from "./contexts/AudioContext";
import AudioPlayer from "./routes/AudioPlayer";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [seek, setSeek] = useState(0);
  const [cookie] = useCookies(["token"]);

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
            <AudioProvider>
              <Routes>
                <Route path="/" element={<LoggedInHomeComponent />} />
                <Route path="/uploadSong" element={<UploadSong />} />
                <Route path="/myMusic" element={<MyMusic />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<Userprofile />} />
                <Route path="/music" element={<MusicFooter />} />
                <Route path="/playedsong" element={<SongDetails />} />
                <Route path="/edit" element={<EditPage />} />
                <Route path="/edit/:songId" element={<EditSongPage />} />
                <Route path="/profileedit/:userId" element={<EditSongPage />} />
                <Route path="/likedsong" element={<LikedSongs />} />
                <Route path="/audio" element={<AudioPlayer />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AudioProvider>
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
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
