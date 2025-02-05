import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesLoggedIn = () => {
  const token = ('; '+document.cookie).split(`; token=`).pop().split(';')[0];
  if (token === null) {
    return <></>;
  }
  return token ? <Navigate to={"/c/123"} /> : <Outlet />;
};
export default ProtectedRoutesLoggedIn;
