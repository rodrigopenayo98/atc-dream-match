import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerList } from './PlayerList';

export function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`/api/teams/${id}`);
        const data = await response.json();
        setTeam(data);
        setTeamName(data.name);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };
    fetchTeam();
  }, [id]);

  const handleNameChange = (e) => setTeamName(e.target.value);

  const handleSaveName = async () => {
    try {
      await fetch(`/api/teams/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: teamName })
      });
      setTeam(prevTeam => ({ ...prevTeam, name: teamName }));
    } catch (error) {
      console.error('Error saving team name:', error);
    }
  };

  const handleSelectPlayer = async (player) => {
    if (team.players.length < 5) {
      try {
        await fetch(`/api/teams/${id}/players`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerId: player.idPlayer })
        });
        setTeam(prevTeam => ({ ...prevTeam, players: [...prevTeam.players, player] }));
      } catch (error) {
        console.error('Error adding player to team:', error);
      }
    }
  };

  const handleRemovePlayer = async (playerId) => {
    try {
      await fetch(`/api/teams/${id}/players/${playerId}`, { method: 'DELETE' });
      setTeam(prevTeam => ({
        ...prevTeam,
        players: prevTeam.players.filter(player => player.idPlayer !== playerId)
      }));
    } catch (error) {
      console.error('Error removing player from team:', error);
    }
  };

  if (!team) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Detalle del Equipo</h1>
      <div className="mb-4">
        <input
          type="text"
          value={teamName}
          onChange={handleNameChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSaveName}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          Guardar Nombre
        </button>
      </div>
      <h2 className="text-2xl font-semibold">Jugadores del Equipo</h2>
      <ul className="space-y-2">
        {team.players.map(player => (
          <li key={player.idPlayer} className="border p-2 rounded flex justify-between items-center">
            {player.name}
            <button
              onClick={() => handleRemovePlayer(player.idPlayer)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-4">Agregar Jugadores</h2>
      <PlayerList onSelect={handleSelectPlayer} />
      {team.players.length === 5 && (
        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
          El equipo está completo.
        </div>
      )}
    </div>
  );
}
