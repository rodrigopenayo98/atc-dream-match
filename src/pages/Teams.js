import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Teams() {
  const teams = useSelector((state) => state.teams);

  return (
    <div>
      <div className="container mx-auto p-4 flex flex-col border rounded-xl shadow-lg bg-[rgba(255,255,255,0.75)] w-[90%] sm:w-[70%] md:w-[90%] lg:w-[90%] xl:w-[100%] h-auto px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12">
        <h1 className="text-3xl font-bold">Equipos Creados</h1>
      </div>
      <div>
        <ul className="space-y-4">
          {teams.map((team) => (
            <li key={team.id} className="border p-4 rounded-lg shadow-md">
              <Link to={`/team/${team.id}`} className="text-xl font-semibold">
                {team.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

