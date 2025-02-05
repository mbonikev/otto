import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ProtectedRoutesLoggedIn = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/status`, {
          withCredentials: true,
        });

        setUser(response.data.user || null);

        // Set the default model cookie if not set
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

    // Fetch user status and models if token is present
    if (token) {
      fetchModels();
      fetchUserStatus();
    } else {
      setLoading(false);
      setUser(null);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img src="./logo.png" className="h-10 w-auto animate-spinLoader" />
      </div>
    );
  }

  // Redirect logged-in users to the default page (e.g., `/c/1`)
  if (user !== null) {
    return <Navigate to="/c/1" />;
  }

  // Allow non-logged-in users to access the login page (by rendering Outlet)
  return <Outlet context={{ user, models }} />;
};

export default ProtectedRoutesLoggedIn;
