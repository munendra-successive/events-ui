import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
  const isUserAuthenticated = localStorage.getItem("authorization");
  return isUserAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
