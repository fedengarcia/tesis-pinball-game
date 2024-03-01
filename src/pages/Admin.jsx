import React, { useState, useEffect } from "react";
import { getAllGamesPlayed } from "../firebase/firebase";

function Admin() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGamesPlayed();
      setGames(data);
    };

    fetchData();
  }, []);
console.log(games);
  return (
    <div>
      <h1>Lista de Juegos Jugados</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              {/* {game.nombre_del_juego} - Puntuación: {game.puntuacion} */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay juegos jugados registrados.</p>
      )}
    </div>
  );
}

export default Admin;
