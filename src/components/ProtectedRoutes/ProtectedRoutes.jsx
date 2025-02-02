import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BACKEND_API;
    axios
      .get(`${apiUrl}/auth/status`, { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user status:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <Navigate to="/login" />;
  }

  // Safely handle user data
  const { displayName, emails, photos } = user;

  const userEmail = emails && emails.length > 0 ? emails[0].value : "";
  const picture = photos && photos.length > 0 ? photos[0].value : "";

  return (
    <Outlet
      context={{
        username: displayName,
        userEmail,
        picture: picture,
      }}
    />
  );
};

export default ProtectedRoutes;
