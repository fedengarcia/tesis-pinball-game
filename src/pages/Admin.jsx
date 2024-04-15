import React, { useState, useEffect } from "react";
import { getAllGamesPlayed, getAllInformation, getTopRanking } from "../firebase/firebase";
import { APP_DATA } from "../CONSTANTS";
import * as XLSX from 'xlsx';
import { StyledFlexCenter } from "../styled-components/containers";
import { Button, CircularProgress } from '@mui/material'

function Admin() {
  const [games, setGames] = useState([]);
  const [table, setTable] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      const data = table === 'all' ? await getAllGamesPlayed() : await getTopRanking();
      setGames(data);
    };

    fetchData();
  }, [table]);

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
        "Tablero asignado": game.gameNumber,
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


  const downloadAllInformation = async () => {
    const data = await getAllInformation();
    console.log(data);
    const ws = XLSX.utils.json_to_sheet(data.map(user => ({
        "Participante": user.userEmail,
        "Tablero asignado": user.gameNumber,
        "Fecha": formatDate(user.userDate.seconds * 1000 + user.userDate.nanoseconds / 1000),
        "Primer formulario": JSON.stringify(user.firstForm.answers),
        "Segundo formulario": JSON.stringify(user.secondForm.answers),
        "Tercer formulario": JSON.stringify(user.thirdForm.answers),
        "Cuarto formulario": JSON.stringify(user.finalForm1.answers),
        "quinto formulario": JSON.stringify(user.finalForm2.answers),
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users Answers");
    XLSX.writeFile(wb, 'BD - Information - Users answers' + ".xlsx");
  }

  return (
    <div className="container mt-5">
      <StyledFlexCenter direction={'column'}>
        <StyledFlexCenter direction={'row'}>
          <Button
            style={{margin: '10px'}}
            variant='contained'
            onClick={() =>  setTable('all')}
          >
            Ver todos los juegos
          </Button>
          <Button
            style={{margin: '10px'}}
            variant='contained'
            onClick={() =>  setTable('topRanking')}
          >
            Ver Top Ranking
          </Button>
        </StyledFlexCenter>
        <h1 style={{width: '100%', textAlign:'center'}}>{table === 'all' ? 'All games Played' : 'Top Ranking'}</h1>

      </StyledFlexCenter>
      {games.length > 0 ? (
        <StyledFlexCenter>
          <table className="table">
            <thead>
              <tr>
                <th>Participante</th>
                <th>Tablero asignado</th>
                <th>Fecha</th>
                <th>Tiempo de juego</th>
                <th>Puntuación</th>
                <th>Golpeado marca {configCopy.elementsNames[0]}</th>
                <th>Golpeado marca {configCopy.elementsNames[1]}</th>
                <th>Golpeado marca {configCopy.elementsNames[2]}</th>
                <th>Recogido marca {configCopy.elementsNames[0]}</th>
                <th>Recogido marca {configCopy.elementsNames[1]}</th>
                <th>Recogido marca {configCopy.elementsNames[2]}</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={index} className={index % 2 === 0 ? "active-row" : ""}>
                  <td>{game.userEmail}</td>
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
          <Button
            style={{margin: '10px'}}
            variant='contained'
            onClick={() => exportToExcel(games, "games_data")}
          >
            EXPORTAR RANKING A EXCEL       
          </Button>
          <Button
            style={{margin: '10px'}}
            variant='contained'
            onClick={() => downloadAllInformation()}
          >
            DESCARGAR BASE DE DATOS
          </Button>
        </StyledFlexCenter>
      ) : (
        <p>No hay juegos jugados registrados.</p>
      )}
    </div>
  );
  
  
}

export default Admin;
