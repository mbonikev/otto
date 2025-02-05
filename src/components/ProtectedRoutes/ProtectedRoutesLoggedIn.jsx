import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesLoggedIn = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const token = Cookies.get("token"); // Get the token from cookies

  useEffect(() => {
    if (token) {
      // If token exists, consider the user logged in
      setUser({}); // This can be expanded to hold actual user data if necessary
    } else {
      // If no token, user is not logged in
      setUser(null);
    }
    setLoading(false); // Set loading to false after the check
  }, [token]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img src="./logo.png" className="h-10 w-auto animate-spinLoader" />
      </div>
    );
  }

  // If the user is logged in (i.e., token is present), redirect them to the chat page (or any other page you prefer)
  if (user) {
    return <Navigate to="/c/0" />;
  }

  // If the user is not logged in, render the content inside <Outlet>
  return <Outlet context={{}} />;
};

export default ProtectedRoutesLoggedIn;
