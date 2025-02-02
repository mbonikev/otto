import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/status", { withCredentials: true })
      .then((response) => {
        console.log("User Status Response:", response.data);
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

  const { displayName, email, picture } = user;

  return (
    <Outlet
      context={{
        username: displayName,
        userEmail: email,
        profilePicture: picture,
      }}
    />
  );
};

export default ProtectedRoutes;
