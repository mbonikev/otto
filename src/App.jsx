import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Chat from "./pages/Chat";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect"; // Import AuthRedirect
import LoginModal from "./components/LoginModal/LoginModal";

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [animateLoginModal, setAnimateLoginModal] = useState(false);
  const handleOpenLoginModal = () => {
    setLoginModal(true);
    setTimeout(() => setAnimateLoginModal(true), 0);
  };
  const handleCloseLoginModal = () => {
    setAnimateLoginModal(false);
    setTimeout(() => setLoginModal(false), 0);
  };

  const hasHash = window.location.hash.includes("#");
  if (!hasHash && window.location.pathname !== "/") {
    return <NotFound />;
  }

  return (
    <>
      {/* Overlay */}
      {loginModal && (
        <div
          onClick={handleCloseLoginModal}
          className={`fixed top-0 left-0 w-full h-svh bg-black/20 dark:bg-black/40 z-30 transition-opacity duration-200 ${
            animateLoginModal ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* login Modal */}
      {loginModal && (
        <div
          className={`w-fit h-fit fixed top-0 left-0 right-0 bottom-0 m-auto transition-all duration-200 ease-in-out z-30
                ${
                  animateLoginModal
                    ? "opacity-100"
                    : "opacity-0 translate-y-6 scale-90"
                }`}
        >
          <LoginModal />
        </div>
      )}

      <HashRouter>
        <Routes>
          {/* Protected Routes for Logged-In Users */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Prevent Logged-In Users from Accessing Login & Chat */}
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/chat"
            element={
              <AuthRedirect>
                <Chat handleOpenLoginModal={handleOpenLoginModal} />
              </AuthRedirect>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
