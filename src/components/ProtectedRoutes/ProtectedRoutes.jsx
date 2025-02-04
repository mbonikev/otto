import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/status`, {
          withCredentials: true,
        });

        setUser(response.data.user || null);
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
          withCredentials: true,
        });
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
        setModels([]);
      }
    };

    fetchModels();
    fetchUserStatus();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img src="./logo.png" className="h-10 w-auto animate-spinLoader" />
      </div>
    );
  }

  return user ? (
    <Outlet context={{ user, models }} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
