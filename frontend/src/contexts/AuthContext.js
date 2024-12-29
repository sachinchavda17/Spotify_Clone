import { createContext, useContext, useEffect, useState } from "react";
import { makeGETRequest } from "../utils/serverHelpers";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = document.cookie;
    if (token) setIsAuthenticated(true);
    console.log(isAuthenticated)
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
