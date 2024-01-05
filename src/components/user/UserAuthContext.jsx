import React, { useState, createContext } from "react";

export const UserAuth = createContext();
const UserAuthContext = ({ children }) => {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <UserAuth.Provider value={{ login, setLogin }}>
        {children}
      </UserAuth.Provider>
    </div>
  );
};

export default UserAuthContext;
