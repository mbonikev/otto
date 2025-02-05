import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesLoggedIn = () => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/c/0" />;
  }
  
  return <Outlet context={{}} />;
};

export default ProtectedRoutesLoggedIn;
