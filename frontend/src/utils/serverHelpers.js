import { backendUrl } from "./config";

export const makePOSTRequest = async (route, body) => {
  const token = getToken();
  const response = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeGETRequest = async (route) => {
  const token = getToken();
  const response = await fetch(backendUrl + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};


const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};

// const getToken = () => {
//   const userDataString = localStorage.getItem("currentUser");
//   if (!userDataString) {
//     return "User data not found in localStorage";
//   }

//   try {
//     const userData = JSON.parse(userDataString);

//     if (!userData || !userData.token) {
//       return "Token not found in user data";
//     }
//     const accessToken = userData.token;

//     return accessToken;
//   } catch (error) {
//     return "Error parsing user data JSON:", error;
//   }
// };
