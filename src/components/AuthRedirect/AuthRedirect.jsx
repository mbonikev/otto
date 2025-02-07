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
        {/* <img src="./logo.png" className="h-10 w-auto animate-spinLoader" /> */}
        <span class="loader"></span>
      </div>
    );
  }

  return user ? (
    <Navigate to="/" />
  ) : (
    <>
      {/* Overlay */}
      {loginModal && (
        <div
          onClick={handleCloseModal}
          className={`fixed top-0 left-0 w-full h-svh bg-black/15 dark:bg-black/30 z-50 transition-opacity duration-300 ${
            animateLoginModal ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* login Modal */}
      {loginModal && (
        <div
          className={`w-fit h-svh fixed top-0 left-0 transition-transform duration-300 ease-in-out z-30
                ${
                  animateLoginModal ? "translate-x-0" : "-translate-x-[300px]"
                }`}
        >
          <ChatHistory convs={convs} loadingConvs={loadingConvs} />
        </div>
      )}
      {children}
    </>
  );
};

export default AuthRedirect;
