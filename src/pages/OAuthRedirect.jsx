import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const hash = window.location.hash;
    const query = hash.split("?")[1];
    const params = new URLSearchParams(query);

    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .post(
        `${apiUrl}/auth/save-token`,
        { token },
        { withCredentials: true }
      )
      .then(() => {
        setTimeout(() => navigate("/"), 300);
      })
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="w-full h-svh flex items-center justify-center">
      <span className="loader"></span>
    </div>
  );
};

export default OAuthRedirect;
