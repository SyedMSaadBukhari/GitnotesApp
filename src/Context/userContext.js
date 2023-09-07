import { createContext, useState, useEffect } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedAccessToken = localStorage.getItem("accessToken");
  const storedUserData = localStorage.getItem("userData");
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(
    storedUserData ? JSON.parse(storedUserData) : {}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedAccessToken);
  // console.log(userData);
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);
  return (
    <UserContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        storedAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
