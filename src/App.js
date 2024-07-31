import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Teams } from './pages/Teams';
import { TeamDetail } from './components/TeamDetail';
import { PlayerList } from './components/PlayerList'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/team/:id" element={<TeamDetail />} />
        <Route path="/players" element={<PlayerList />} />
      </Routes>
    </Router>
  );
}

export default App;



