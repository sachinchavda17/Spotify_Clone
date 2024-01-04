import { createContext } from "react";

const loggedInUser = createContext({
  user: null,
  setUser: (user) => {},
  myMusic: null,
  setMyMusic: (myMusic) => {},
  userFirstName: null,
  setUserFirstName: (userEmail) => {},
});

export default loggedInUser;
