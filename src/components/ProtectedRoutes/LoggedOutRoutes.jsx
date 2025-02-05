import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const LoggedOutRoutes = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/status`, {
          withCredentials: true,
        });
        setUser(response.data.user || null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader component
  }

  // If user is logged in, redirect to chat or home page
  if (user) {
    return <Navigate to={`/c/${user._id}`} />;
  }

  return <Outlet />;
};

export default LoggedOutRoutes;
