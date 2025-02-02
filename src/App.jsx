import React from "react";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectiveRoutes";

function App() {
  const hasHash = window.location.hash.includes("#");
  if (!hasHash && window.location.pathname !== "/") {
    return <NotFound />;
  }
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
