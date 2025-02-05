import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import LoggedInRoutes from "./components/LoggedInRoutes";
import LoggedOutRoutes from "./components/LoggedOutRoutes";

function App() {
  const hasHash = window.location.hash.includes("#");
  if (!hasHash && window.location.pathname !== "/") {
    return <NotFound />;
  }

  return (
    <HashRouter>
      <Routes>
        {/* Protect Home and Login routes for logged-out users */}
        <Route element={<LoggedOutRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protect Chat routes for logged-in users */}
        <Route element={<LoggedInRoutes />}>
          <Route path="/c/:id" element={<Chat />} />
        </Route>

        {/* Handle Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
