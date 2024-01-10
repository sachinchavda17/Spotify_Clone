import { useContext, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Icon } from "@iconify/react";
import songContext from "../../contexts/songContext";
import { Link, Navigate } from "react-router-dom";
import LoggedInContainer from "../../containers/LoggedInContainer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const currentSong = [
//   {
//     name: "Khalasi",
//     thumbnail:
//       "https://pagalworld.cool/siteuploads/thumb/sft3/1212_resize2x_250x250.webp",
//     track:
//       "https://res.cloudinary.com/dbm00gxt1/video/upload/v1704719849/ewnafut1qavnib33n59t.mp3",
//     artist: {
//       firstName: "Sachin",
//       password: "sachin",
//       lastName: "Chavda",
//       email: "sachin@gmail.com",
//       username: "sachin_chavda",
//       likedSongs: "",
//       likedPlaylists: "",
//       subscribedArtists: "",
//     },
//   },
//   {
//     name: "Khalasi",
//     thumbnail:
//       "https://pagalworld.cool/siteuploads/thumb/sft3/1212_resize2x_250x250.webp",
//     track:
//       "https://res.cloudinary.com/dbm00gxt1/video/upload/v1704719849/ewnafut1qavnib33n59t.mp3",
//     artist: {
//       firstName: "Sachin",
//       password: "sachin",
//       lastName: "Chavda",
//       email: "sachin@gmail.com",
//       username: "sachin_chavda",
//       likedSongs: "",
//       likedPlaylists: "",
//       subscribedArtists: "",
//     },
//   },
// ];

export default function SongDetails() {
  const {
    isPaused,
    setIsPaused,
    volume,
    setVolume,
    seek,
    setSeek,
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
  } = useContext(songContext);
  return (
    <LoggedInContainer>
      <div className="bg-black p-8 rounded text-white min-h-screen">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row h-full">
          <div className="lg:py-8 lg:order-1  ">
            <div className="aspect-w-4 aspect-h-5 lg:aspect-w-1 lg:aspect-h-1">
              <img
                src={currentSong.thumbnail}
                alt={currentSong.name}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </div>

          <div className="lg:w-1/2 lg:p-8 lg:order-2 flex flex-col items-start  ">
            <h1 className="text-3xl font-bold text-gray-200 mb-2">
              {currentSong.name}
            </h1>
            <p className="text-sm text-gray-400">
              {currentSong.artist.firstName} {currentSong.artist.lastName}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              <a
                href={currentSong.track}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300"
              >
                Listen on Spotify
              </a>
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                to="/"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 mt-4 lg:mt-8">
          <p>&copy; Sachin Chavda</p>
        </div>
      </div>
    </LoggedInContainer>
  );
}

// return (
//   <div className="bg-black text-white w-full h-full sm:min-h-screen flex items-center justify-center">
//     <div className="max-w-md p-6 rounded-lg bg-gray-800">
//       <div className="aspect-w-16 aspect-h-9 mb-6">
//         <img
//           src={currentSong.thumbnail}
//           alt={currentSong.name}
//           className="h-full w-full object-cover rounded-md"
//         />
//       </div>

//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-200 mb-2">
//           {currentSong.name}
//         </h1>
//         <p className="text-sm text-gray-400">
//           {currentSong.artist.firstName} {currentSong.artist.lastName}
//         </p>
//         <p className="text-sm text-gray-400">
//           <a
//             href={currentSong.track}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="underline hover:text-gray-300"
//           >
//             Listen on Spotify
//           </a>
//         </p>
//       </div>

//       <div className="mt-8 flex justify-center">
//         <Link
//           to="/"
//           className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
//         >
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   </div>
// );
