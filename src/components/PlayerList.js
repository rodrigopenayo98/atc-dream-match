import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';

export function PlayerList({ onSelect }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('https://apifootball.com/api/?action=getPlayers&APIkey=024ab6c659cd714a26da8e6198e5983b58805f2141de253e0fa22004988e7fda');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players.map(player => (
        <PlayerCard key={player.idPlayer} player={player} onSelect={onSelect} />
      ))}
    </div>
  );
}


