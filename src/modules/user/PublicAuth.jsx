import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PublicRoutes = () => {
  const isUserAuthenticated = localStorage.getItem("authorization");
  return isUserAuthenticated ? <Navigate to="/hfdj" /> : <Outlet />;
};
export default PublicRoutes;
