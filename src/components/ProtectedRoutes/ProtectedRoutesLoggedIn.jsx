// Frontend (React) - Custom Protected Route Logic:
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in by fetching user status from the backend
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/protected-route`, {
          withCredentials: true, // Include cookies for the token
        });
        setUser(response.data.user);
      } catch (error) {
        setUser(null); // User is not logged in, redirect to login
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>; // You can display a loading spinner or placeholder
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
