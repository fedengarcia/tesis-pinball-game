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

  function formatDate(date) {
    date = new Date(date)
    let day = date.getDate();
    let month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    let year = date.getFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año

    // Asegurarse de que el día y el mes tengan dos dígitos
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
  }


console.log(games);
  return (
    <div>
      <h1>Lista de Juegos Jugados</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game,index) => (
            <li key={index}>
              <p>{game.userEmail}</p>
              <p>Participante {index}</p>
              {console.log(game.userDate)}
              <p>{formatDate(game.userDate.seconds*1000+game.userDate.nanoseconds/1000)}</p>
              <p>{game.score}</p>

              <p>Recodigo marca 1 {game.interactions.Xiaomi}</p>
              <p>Recodigo marca 2 {game.interactions.Samsung}</p>
              <p>Recodigo marca 3 {game.interactions.Apple}</p>
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
