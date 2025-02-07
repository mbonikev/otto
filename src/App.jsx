import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Chat from "./pages/Chat";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect"; // Import AuthRedirect

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [animateLoginModal, setAnimateLoginModal] = useState(false);
  const handleOpenLoginModal = () => {
    setLoginModal(true);
    setTimeout(() => setAnimateLoginModal(true), 50);
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

      <HashRouter>
        <Routes>
          {/* Protected Routes for Logged-In Users */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home handleOpenLoginModal={handleOpenLoginModal} />} />
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
                <Chat />
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
