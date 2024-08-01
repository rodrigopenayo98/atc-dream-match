import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerList from './PlayerList';

export function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchTeam = () => {
      const teams = JSON.parse(localStorage.getItem('teams')) || [];
      const team = teams.find(t => t.id === parseInt(id));
      if (team) {
        setTeam(team);
        setTeamName(team.name);
      }
    };
    fetchTeam();
  }, [id]);

  const handleNameChange = (e) => setTeamName(e.target.value);

  const handleSaveName = () => {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const updatedTeams = teams.map(t => (t.id === parseInt(id) ? { ...t, name: teamName } : t));
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    setTeam(prevTeam => ({ ...prevTeam, name: teamName }));
  };

  const handleSelectPlayer = (player) => {
    if (team.players.length < 5 && !team.players.some(p => p.idPlayer === player.idPlayer)) {
      const updatedTeam = { ...team, players: [...team.players, player] };
      const teams = JSON.parse(localStorage.getItem('teams')) || [];
      const updatedTeams = teams.map(t => (t.id === parseInt(id) ? updatedTeam : t));
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
      setTeam(updatedTeam);
    } else {
      alert('No se pueden añadir más jugadores o el jugador ya está en el equipo.');
    }
  };

  const handleRemovePlayer = (playerId) => {
    const updatedTeam = { ...team, players: team.players.filter(player => player.idPlayer !== playerId) };
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const updatedTeams = teams.map(t => (t.id === parseInt(id) ? updatedTeam : t));
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    setTeam(updatedTeam);
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
        {Array.isArray(team.players) && team.players.length > 0 ? (
          team.players.map(player => (
            <li key={player.idPlayer} className="border p-2 rounded flex justify-between items-center">
              {player.name}
              <button
                onClick={() => handleRemovePlayer(player.idPlayer)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No hay jugadores en el equipo.</p>
        )}
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

