import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TeamList = () => {
  const teams = useSelector(state => state.teams);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Equipos Creados</h1>
      <ul className="space-y-4">
        {teams.map(team => (
          <li key={team.id} className="border p-4 rounded-lg shadow-md">
            <Link to={`/team/${team.id}`} className="text-xl font-semibold">{team.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;