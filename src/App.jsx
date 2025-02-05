import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Chat from "./pages/Chat";
import ProtectedRoutesLoggedIn from "./components/ProtectedRoutes/ProtectedRoutesLoggedIn";

function App() {
  const hasHash = window.location.hash.includes("#");
  if (!hasHash && window.location.pathname !== "/") {
    return <NotFound />;
  }

  return (
    <HashRouter>
      <Routes>
        {/* Protect login-related routes for non-logged-in users */}
        <Route element={<ProtectedRoutesLoggedIn />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Protect chat-related routes for logged-in users */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/c/:id" element={<Chat />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
