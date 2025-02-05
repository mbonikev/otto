import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesLoggedIn = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const tokenCheck = Cookies.get("token");
    if (tokenCheck) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, []);
  if (token === null) {
    return <></>;
  }
  return token ? <Navigate to={"/c/123"} /> : <Outlet />;
};
export default ProtectedRoutesLoggedIn;
