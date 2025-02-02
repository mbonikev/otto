import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);

  if (user === null) {
    return <></>;
  }
  return user ? (
    <Outlet context={{ username, userEmail, profilePicture }} />
  ) : (
    <Navigate to={"/#/login"} />
  );
};
export default ProtectedRoutes;
