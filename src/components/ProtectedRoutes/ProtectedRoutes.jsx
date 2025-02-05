import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Install via `npm install js-cookie`

const ProtectedRoutes = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);
  const location = useLocation();  // To get the current route

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/status`, {
          withCredentials: true,
        });

        setUser(response.data.user || null);
        console.log(response.data.user)
        // ✅ Set the default model cookie if not set
        if (!Cookies.get("selectedModel")) {
          Cookies.set("selectedModel", "llama3-8b-8192", {
            expires: 7,
            path: "/",
          });
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
        setUser(null);
      } finally {
        setLoading(false);
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

  // Redirect logged-in users from `/` and `/login` to `/c/:id`
  if (user && (location.pathname === "/" || location.pathname === "/login")) {
    return <Navigate to={`/c/${user._id}`} />;
  }

  return user ? (
    <Outlet context={{ user, models }} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
