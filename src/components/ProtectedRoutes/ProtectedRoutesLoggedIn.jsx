import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesLoggedIn = () => {
  const token = Cookies.get("token");

  // If token exists, redirect to /c/0
  if (token) {
    return <Navigate to="/c/0" replace />;
  }
  
  // If no token, allow access to the protected routes
  return <Outlet />;
};

export default ProtectedRoutesLoggedIn;
