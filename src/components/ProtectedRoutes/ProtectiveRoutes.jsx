import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/auth/status", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
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
