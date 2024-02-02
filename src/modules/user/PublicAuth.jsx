import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "./service";

const PublicRoutes = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) {
          setIsUserAuthenticated(false);
          return;
        }
        await validateToken(token);
        setIsUserAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("authorization");
        setIsUserAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);
  return isUserAuthenticated ? <Navigate to="/list" /> : <Outlet />;
};

export default PublicRoutes;
