import React, { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";
export const UserAuth = createContext();
const UserAuthContext = ({ children }) => {
  const [login, setLogin] = useState(true);
  const isAuthenticated = () => localStorage.getItem("authorization") !== null;
  const contextValue = useMemo(
    () => ({ login, setLogin, isAuthenticated }),
    [login]
  );
  return (
    <div>
      <UserAuth.Provider value={contextValue}>{children}</UserAuth.Provider>
    </div>
  );
};

UserAuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserAuthContext;
