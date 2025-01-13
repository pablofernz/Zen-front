import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const Docs = lazy(() => import("./Views/docs/docs"));
const Landing = lazy(() => import("./Views/landing/landing"));
const NotFound = lazy(() => import("./Views/404 Not Found/404"));
const Home = lazy(() => import("./Views/home/home"));

function App() {
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.style.colorScheme = "light";
    }
  }, []);
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* in development */}
          <Route path="/" element={<Landing />} />
          <Route path="/noteboard" element={<Home />} />

          {/* <Route path="/" element={<Home />} /> */}

          <Route path="/docs" element={<Docs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
