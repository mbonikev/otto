import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProtectedRoutesLoggedIn from "./components/ProtectedRoutes/ProtectedRoutesLoggedIn";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Wrap the routes that should be protected */}
        <Route element={<ProtectedRoutesLoggedIn />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Regular routes for logged-in users */}
        <Route path="/c/:id" element={<Chat />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
