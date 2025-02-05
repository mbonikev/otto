import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Install via `npm install js-cookie`

const ProtectedRoutesLoggedIn = () => {
  const loggedIn = Cookies.get("token");

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/c/121212" />
  );
};

export default ProtectedRoutesLoggedIn;
