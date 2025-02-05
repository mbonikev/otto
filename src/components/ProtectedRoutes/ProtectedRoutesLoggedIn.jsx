import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Install via `npm install js-cookie`

const ProtectedRoutesLoggedIn = () => {
  const loggedIn = Cookies.get("selectedModel");

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutesLoggedIn;
