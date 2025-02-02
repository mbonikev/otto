import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("upfront_user");
    const name = localStorage.getItem("upfront_user_name");
    const workspaces = JSON.parse(localStorage.getItem("upfront_ws")) || [];
    if (email) {
      setUser(true);
      setUserName(name);
      setUserEmail(email);
      setWorkspaces(workspaces);
    } else {
      setUser(false);
      setUserName(null);
      setUserEmail(null);
    }
  }, []);
  if (user === null) {
    return <></>;
  }
  return user ? (
    <Outlet context={{ username, userEmail, workspaces, setWorkspaces }} />
  ) : (
    <Navigate to={"/auth/login"} />
  );
};
export default ProtectedRoutes;
