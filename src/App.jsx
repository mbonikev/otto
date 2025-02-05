import React from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Chat from "./pages/Chat";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect"; // Import AuthRedirect

function App() {
  // const hasHash = window.location.hash.includes("#");
  // if (!hasHash && window.location.pathname !== "/") {
  //   return <NotFound />;
  // }
  return (
    <BrowserRouter>
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
              <Chat />
            </AuthRedirect>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
