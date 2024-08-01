import React from 'react';

function PlayerCard({ player, onSelect }) {
  return (
    <div className="player-card border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{player.name}</h3>
      <button
        onClick={() => onSelect(player)}
        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
      >
        Añadir al Equipo
      </button>
    </div>
  );
}

export default PlayerCard;


