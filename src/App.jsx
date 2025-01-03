import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Views/home/home";
import Docs from "./Views/docs/docs";
import Landing from "./Views/landing/landing";
import NotFound from "./Views/404 Not Found/404";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* in development */}
        {/* <Route path="/" element={<Landing />} /> */}
        {/* <Route path="/noteboard" element={<Home />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
