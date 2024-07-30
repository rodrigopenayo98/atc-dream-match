import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerList } from './PlayerList';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayerToTeam, removePlayerFromTeam, updateTeamName } from '../store/teamsSlice';

export function TeamDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const team = useSelector(state => state.teams.find(t => t.id === id));

  const [teamName, setTeamName] = useState(team ? team.name : '');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    if (team) setTeamName(team.name);
  }, [team]);

  const handleNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSaveName = () => {
    dispatch(updateTeamName({ id: team.id, name: teamName }));
  };

  const handleSelectPlayer = (player) => {
    if (team.players.length < 5) {
      dispatch(addPlayerToTeam({ teamId: id, player }));
    }
    setSelectedPlayer(null);
  };

  const handleRemovePlayer = (playerId) => {
    dispatch(removePlayerFromTeam({ teamId: id, playerId }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Detalle del Equipo</h1>
      {team && (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={teamName}
              onChange={handleNameChange}
              className="border p-2 rounded"
            />
            <button onClick={handleSaveName} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
              Guardar Nombre
            </button>
          </div>
          <h2 className="text-2xl font-semibold">Jugadores del Equipo</h2>
          <ul className="space-y-2">
            {team.players.map(player => (
              <li key={player.idPlayer} className="border p-2 rounded flex justify-between items-center">
                {player.name}
                <button onClick={() => handleRemovePlayer(player.idPlayer)} className="bg-red-500 text-white px-2 py-1 rounded">
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
        </>
      )}
    </div>
  );
};