import React, { useState, createContext } from "react";

export const UserAuth = createContext();
const UserAuthContext = ({ children }) => {
  const [login, setLogin] = useState(true);
  const isAuthenticated = () => {
    if (localStorage.getItem("authorization")) return true;
    return false;
  };
  return (
    <div>
      <UserAuth.Provider value={{ login, setLogin, isAuthenticated }}>
        {children}
      </UserAuth.Provider>
    </div>
  );
};

export default UserAuthContext;
