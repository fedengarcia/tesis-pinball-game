import React, { useState, useEffect } from "react";
import { getAllGamesPlayed } from "../firebase/firebase";
import { APP_DATA } from "../CONSTANTS";
import * as XLSX from 'xlsx';

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

  let configCopy = APP_DATA.APP_GAME.GAME_CONFIGURATION

  const exportToExcel = (games, fileName) => {
    const ws = XLSX.utils.json_to_sheet(games.map(game => ({
        "Participante": game.userEmail,
        "Opción": "Participante " + (game.index + 1),
        "Número partida": game.gameNumber,
        "Fecha": formatDate(game.userDate.seconds * 1000 + game.userDate.nanoseconds / 1000),
        "Tiempo de juego": game.timePlayed,
        "Puntuación": game.score,
        [`Recogido marca ${configCopy.elementsNames[0]}`]: game.interactionsInPaddle[configCopy.elementsNames[0] + "InPaddle"],
        [`Recogido marca ${configCopy.elementsNames[1]}`]: game.interactionsInPaddle[configCopy.elementsNames[1] + "InPaddle"],
        [`Recogido marca ${configCopy.elementsNames[2]}`]: game.interactionsInPaddle[configCopy.elementsNames[2] + "InPaddle"],
        [`Golpeado marca ${configCopy.elementsNames[0]}`]: game.interactionsInBrick[configCopy.elementsNames[0] + "InBrick"],
        [`Golpeado marca ${configCopy.elementsNames[1]}`]: game.interactionsInBrick[configCopy.elementsNames[1] + "InBrick"],
        [`Golpeado marca ${configCopy.elementsNames[2]}`]: game.interactionsInBrick[configCopy.elementsNames[2] + "InBrick"]
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GamesData");
    XLSX.writeFile(wb, fileName + ".xlsx");
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Juegos Jugados</h1>
      {games.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Participante</th>
                <th>Opción</th>
                <th>Número partida</th>
                <th>Fecha</th>
                <th>Tiempo de juego</th>
                <th>Puntuación</th>
                <th>Recogido marca {configCopy.elementsNames[0]}</th>
                <th>Recogido marca {configCopy.elementsNames[1]}</th>
                <th>Recogido marca {configCopy.elementsNames[2]}</th>
                <th>Golpeado marca {configCopy.elementsNames[0]}</th>
                <th>Golpeado marca {configCopy.elementsNames[1]}</th>
                <th>Golpeado marca {configCopy.elementsNames[2]}</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={index} className={index % 2 === 0 ? "active-row" : ""}>
                  <td>{game.userEmail}</td>
                  <td>Participante {index + 1}</td>
                  <td>{game.gameNumber}</td>
                  <td>{formatDate(game.userDate.seconds * 1000 + game.userDate.nanoseconds / 1000)}</td>
                  <td>{game.timePlayed}</td>
                  <td>{game.score}</td>
                  <td>{game.interactionsInBrick[configCopy.elementsNames[0] + "InBrick"]}</td>
                  <td>{game.interactionsInBrick[configCopy.elementsNames[1] + "InBrick"]}</td>
                  <td>{game.interactionsInBrick[configCopy.elementsNames[2] + "InBrick"]}</td>
                  <td>{game.interactionsInPaddle[configCopy.elementsNames[0] + "InPaddle"]}</td>
                  <td>{game.interactionsInPaddle[configCopy.elementsNames[1] + "InPaddle"]}</td>
                  <td>{game.interactionsInPaddle[configCopy.elementsNames[2] + "InPaddle"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p onClick={() => exportToExcel(games, "games_data")} className="boton-excel">EXPORTAR A EXCEL</p>
        </>
      ) : (
        <p>No hay juegos jugados registrados.</p>
      )}
    </div>
  );
  
  
}

export default Admin;
