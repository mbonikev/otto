import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming you're storing the token here
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/auth/status`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.user);
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

  return <Outlet context={{ username: user.name, userEmail: user.email }} />;
};

export default ProtectedRoutes;
