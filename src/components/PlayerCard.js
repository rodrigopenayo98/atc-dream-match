import React from 'react';

const PlayerCard = ({ player, onSelect }) => (
  <div className="border p-4 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold">{player.name}</h3>
    <p>{player.position}</p>
    <button
      onClick={() => onSelect(player)}
      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Seleccionar
    </button>
  </div>
);

export default PlayerCard;

