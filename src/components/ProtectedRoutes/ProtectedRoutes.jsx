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
          withCredentials: true, // Sends JWT token in cookies
        });

        setUser(response.data.user || null);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching user status:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img src="./logo.png" className="h-12 opacity-35 w-auto animate-ping" />
      </div>
    );
  }

  return user ? <Outlet context={user} /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
