import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a ATC Dream Match</h1>
      <p className="mb-4">
      ¡Bienvenido a ATC Dream Match! Aquí puedes crear y gestionar dos equipos de fútbol con tus jugadores favoritos. Sin restricciones de posición, presupuesto o edad. ¡Arma el partido de tus sueños!
      </p>
      <div className="space-y-4">
        <Link to="/teams" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
          Ver Equipos Creados
        </Link>
        <Link to="/create-team" className="bg-green-500 text-white px-4 py-2 rounded inline-block">
          Crear Nuevo Equipo
        </Link>
      </div>
    </div>
  );
};

export default Home;