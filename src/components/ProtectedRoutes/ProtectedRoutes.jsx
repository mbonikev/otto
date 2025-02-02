import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_API;
        const response = await axios.get(`${apiUrl}/auth/status`, {
          withCredentials: true,
        });

        setUser(response.data.user || null);
      } catch (error) {
        console.error("Error fetching user status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus()
  }, []);

  if (loading) {
    return (
      <div className="w-full h-svh flex items-center justify-center">
        <img
          src="./logo.png"
          className="h-8 opacity-35 w-auto animate-spinLoader saturate-0"
        />
      </div>
    );
  }

  if (user === null) {
    return <Navigate to="/login" />;
  }

  // Safely handle user data
  const { displayName, email, photo } = user;

  return (
    <Outlet
      context={{
        username: displayName,
        userEmail: email,
        picture: photo,
      }}
    />
  );
};

export default ProtectedRoutes;
