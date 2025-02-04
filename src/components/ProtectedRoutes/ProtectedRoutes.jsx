import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState()

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/status`, {
          withCredentials: true, // Sends JWT token in cookies
        });

        setUser(response.data.user || null);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching user status:", error);
        setUser(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/models`, {
          withCredentials: true, // Sends JWT token in cookies
        });

        setUser(response.data.user || null);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching user status:", error);
        setUser(null);
      }
    };

    fetchUserStatus();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img src="./logo.png" className="h-10 w-auto animate-spinLoader" />
      </div>
    );
  }

  return user ? <Outlet context={user} /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
