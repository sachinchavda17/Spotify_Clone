import React, { useContext } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useAudio } from "../contexts/AudioContext";
import { formatDate } from "../containers/functionContainer";
const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
const {currentSong} = useAudio()

  const date = new Date().toDateString();

  return (
    <LoggedInContainer>
      <div
        className={` ${
          currentSong ? "mb-20" : ""
        } rounded p-5 sm:p-10 bg-app-black h-full w-full text-white`}
      >
        <h1
          className={`text-3xl sm:text-4xl font-bold text-center py-3 border-b border-darkGray-light`}
        >
          {user.firstName}'s Profile
        </h1>
        <div className=" py-5 pt-7  sm:py-7 flex items-center flex-col sm:flex-row justify-around">
          <div className="left flex sm:w-1/4  space-x-2 items-center  sm:flex-col sm:space-y-5   ">
            <div
              className={`w-32 flex mb-5 sm:mb-0 justify-center items-center text-6xl h-32 ${
                user?.profileBackground
                  ? user?.profileBackground
                  : "bg-blue-500"
              } ${user?.profileText}  rounded-full `}
            >
              {user.firstName[0] + user.lastName[0]}
            </div>
          </div>
          <div className="right h-full sm:w-1/2 flex items-center flex-col ">
            <div className="profile-info flex flex-col gap-3 ">
              <div className="w-full text-center bg-darkGray py-2 px-5 rounded-xl ">
                <span className="font-semibold ">Name : </span>
                <span>{user.firstName + " " + user.lastName}</span>
              </div>
              <div className="w-full text-center bg-darkGray py-2 px-5 rounded-xl ">
                <span className="font-semibold">Username : </span>
                <span>{user.username}</span>
              </div>

              <div className="w-full text-center bg-darkGray py-2 px-5 rounded-xl ">
                <span className="font-semibold">Email : </span>
                <span>{user.email}</span>
              </div>
              <div className="w-full text-center bg-darkGray py-2 px-5 rounded-xl">
                <span className="font-semibold">UserId : </span>
                <span>#{user._id}</span>
              </div>
              <div className="w-full text-center bg-darkGray py-2 px-5 rounded-xl ">
                <span className="font-semibold">Join Date : </span>
                <span>{user.joinDate ? formatDate(user.joinDate) : date}</span>
              </div>
              <div className="w-full text-center bg-darkGray py-2 px-5 rounded-xl ">
                <span className="font-semibold">Is Artist : </span>
                <span>{JSON.parse(user.isArtist) ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default UserProfile;
