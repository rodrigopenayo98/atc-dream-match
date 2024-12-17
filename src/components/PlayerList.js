import React, { useEffect, useState } from 'react';

export function PlayerList({ onSelect }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://apiv3.apifootball.com/?action=get_players&APIkey=xxxxxxxxxxxxxx'); // Reemplaza con tu API key
        const data = await response.json();
        // Verificar que `data` es un array
        if (Array.isArray(data)) {
          setPlayers(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div>
      <ul className="space-y-2">
        {players.length > 0 ? (
          players.map(player => (
            <li key={player.player_id} className="border p-2 rounded flex justify-between items-center">
              {player.player_name}
              <button
                onClick={() => onSelect(player)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Agregar
              </button>
            </li>
          ))
        ) : (
          <p>No hay jugadores disponibles.</p>
        )}
      </ul>
    </div>
  );
}

export default PlayerList;






