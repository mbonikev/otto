import React from "react";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

function App() {
  const hasHash = window.location.hash.includes("#");
  if (!hasHash && window.location.pathname !== "/") {
    return <NotFound />;
  }
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
