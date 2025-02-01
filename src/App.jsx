import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/a" element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
