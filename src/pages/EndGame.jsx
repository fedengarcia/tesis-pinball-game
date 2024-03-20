import React, { useState, useEffect } from 'react';
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers';
import { APP_DATA } from '../CONSTANTS';
import { Button, CircularProgress } from '@mui/material';
import { getTopRanking } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function EndGame() {
  const [gamesRanking, setGamesRanking] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const data = await getTopRanking();
      setGamesRanking(data.splice(0, 5));
      setLoading(false)
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

    return (
      <StyledAppLayout>
        <h1>{APP_DATA.APP_END.TITLE}</h1>
        <StyledLayoutContent style={{padding: 0, overflow:'hidden', justifyContent: 'space-between'}}>
          <h2>{APP_DATA.APP_END.SUB_TITLE}</h2>
          {loading 
          ? <CircularProgress/> 
          :<>
            {gamesRanking.length > 0 ? (
              <StyledFlexCenter style={{flexGrow: 1, height: '100%', justifyContent:'flex-start'}}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Participante</th>
                      <th>Fecha</th>
                      <th>Puntuación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gamesRanking.map((game, index) => (
                      <tr key={index} className={index % 2 === 0 ? "active-row" : ""}>
                        <td>{game.userEmail}</td>
                        <td>{formatDate(game.userDate.seconds * 1000 + game.userDate.nanoseconds / 1000)}</td>
                        <td>{game.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </StyledFlexCenter>
            ) : (
              <p>No hay juegos jugados registrados.</p>
            )}
            </>
          }
          <Button
            style={{marginBottom: '2em'}}
            variant='contained'
            // disabled={buttonDisabled}
            onClick={() => navigate('/game')}
          >
              {APP_DATA.APP_END.RESTART_BUTTON}
          </Button>
        </StyledLayoutContent>
      </StyledAppLayout>
    )
  }
  