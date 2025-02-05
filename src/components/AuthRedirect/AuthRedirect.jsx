import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthRedirect = ({ children }) => {
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
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img src="./logo.png" className="h-10 w-auto animate-spinLoader" />
      </div>
    );
  }

  return user ? <Navigate to="/" /> : children;
};

export default AuthRedirect;
