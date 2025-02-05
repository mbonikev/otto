import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutesLoggedIn = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Directly checking if the "token" cookie exists
    const tokenCheck = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setToken(tokenCheck ? true : false); // Set token to true if found, otherwise false
  }, []);

  if (token === null) {
    return <></>; // You could also add a loading spinner here while checking
  }

  return token ? <Navigate to={"/c/123"} /> : <Outlet />;
};

export default ProtectedRoutesLoggedIn;
