import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';

export function PlayerList({ onSelect }) {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://apifootball.com/api/?action=getPlayers&APIkey=024ab6c659cd714a26da8e6198e5983b58805f2141de253e0fa22004988e7fda');
        setPlayers(response.data);
      } catch (error) {
        setError('Error fetching players');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="player-list">
      {players.map(player => (
        <PlayerCard key={player.id} player={player} onSelect={onSelect} />
      ))}
    </div>
  );
}



