import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="container mx-auto p-4 flex flex-col border rounded-xl shadow-lg bg-[rgba(255,255,255,0.75)] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[50%] h-auto px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 hover">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Bienvenido a ATC Dream Match</h1>
      <p className="text-sm sm:text-base md:text-lg mb-4 font-semibold">
        ¡Bienvenido a ATC Dream Match! Aquí puedes crear y gestionar dos equipos
        de fútbol con tus jugadores favoritos. Sin restricciones de posición,
        presupuesto o edad. ¡Arma el partido de tus sueños!
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-between w-full my-4 sm:my-8">
        <div className="flex flex-col sm:flex-row items-center w-full justify-around">
          <Link
            to="/teams"
            className="bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-2 font-bold text-center"
          >
            Ver Equipos Creados
          </Link>
          <Link
            to="/create-team"
            className="bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white px-4 py-2 rounded font-bold text-center"
          >
            Crear Nuevo Equipo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

