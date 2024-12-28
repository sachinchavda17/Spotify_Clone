import { createContext, useContext, useEffect, useState } from "react";
import { makeGETRequest } from "../utils/serverHelpers";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    // Check if the user is authenticated
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/auth/verify-login",
          { credentials: true }
        );

        if (response.success) {
          setIsAuthenticated(true);
          console.log("isAuthenticated", isAuthenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
