import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Views/home/home";
import Docs from "./Views/docs/docs";
import Landing from "./Views/landing/landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Landing />} /> */}
        {/* <Route path="/noteboard" element={<Home />} /> */}
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </div>
  );
}

export default App;
