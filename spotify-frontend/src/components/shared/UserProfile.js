import React from "react";
import NewHome from "../../routes/NewHome";
const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const date = new Date().toDateString();

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <NewHome>
      <div className=" rounded p-5 sm:p-10 bg-black h-full w-full text-white">
        <h1
          className={`text-3xl sm:text-4xl font-bold text-center py-3 border-b border-gray-700`}
        >
          {user.firstName}'s Profile
        </h1>
        <div className=" py-5 pt-7  sm:py-7 flex items-center flex-col sm:flex-row justify-around">
          <div className="left flex sm:w-1/4  space-x-2 items-center  sm:flex-col sm:space-y-5   ">
            <div
              className={`w-32 flex mb-5 sm:mb-0 justify-center items-center text-6xl h-32 ${getRandomColor()} rounded-full `}
            >
              {user.firstName[0] + user.lastName[0]}
            </div>
          </div>
          <div className="right h-full sm:w-1/2 flex items-center flex-col ">
            <div className="profile-info flex flex-col gap-3 ">
              <div className="w-full text-center bg-gray-800 py-2 px-5 rounded-xl ">
                <span className="font-semibold ">Name : </span>
                <span>{user.firstName + " " + user.lastName}</span>
              </div>
              <div className="w-full text-center bg-gray-800 py-2 px-5 rounded-xl ">
                <span className="font-semibold">Username : </span>
                <span>{user.username}</span>
              </div>

              <div className="w-full text-center bg-gray-800 py-2 px-5 rounded-xl ">
                <span className="font-semibold">Email : </span>
                <span>{user.email}</span>
              </div>
              <div className="w-full text-center bg-gray-800 py-2 px-5 rounded-xl">
                <span className="font-semibold">UserId : </span>
                <span>{user._id}</span>
              </div>
              <div className="w-full text-center bg-gray-800 py-2 px-5 rounded-xl ">
                <span className="font-semibold">Join Date : </span>
                <span>{user.joinDate ? user.joinDate : date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewHome>
  );
};

export default UserProfile;
