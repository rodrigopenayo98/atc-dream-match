import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Teams } from "./pages/Teams";
import { TeamDetail } from "./components/TeamDetail";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/team/:id" element={<TeamDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




