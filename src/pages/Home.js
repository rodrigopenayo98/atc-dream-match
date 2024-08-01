import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTeam } from "../store/teamsSlice";

export function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [userName, setUserName] = useState("");

  const openModal = () => {
    if (teams.length < 2) {
      setIsModalOpen(true);
    } else {
      alert("No se pueden crear más de dos equipos.");
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setTeamName("");
    setUserName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTeam = { id: Date.now(), name: teamName, players: [] };
    dispatch(addTeam(newTeam));
    closeModal();
    navigate("/teams");
  };

  return (
    <div className="container mx-auto p-4 flex flex-col border rounded-xl shadow-lg bg-[rgba(255,255,255,0.75)] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[50%] h-auto px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Bienvenido a ATC Dream Match
      </h1>
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
          <button
            onClick={openModal}
            className="bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white px-4 py-2 rounded font-bold text-center"
          >
            Crear Nuevo Equipo
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Equipo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-semibold mb-2"
                >
                  Nombre de Usuario:
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="teamName"
                  className="block text-sm font-semibold mb-2"
                >
                  Nombre del Equipo:
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Crear Equipo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;


