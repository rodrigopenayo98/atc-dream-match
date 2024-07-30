import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';

export function PlayerList ({ onSelect }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('https://apifootball.com/api/?action=getPlayers&APIkey=YOUR_API_KEY')
      .then(response => setPlayers(response.data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players.map(player => (
        <PlayerCard key={player.idPlayer} player={player} onSelect={onSelect} />
      ))}
    </div>
  );
};
