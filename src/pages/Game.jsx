import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import UserContext from '../UserProvider/UserContext'
import { useNavigate } from 'react-router-dom'
import { APP_DATA } from '../CONSTANTS'
import Bricks from '../components/Bricks/Bricks'
import { Button, CircularProgress } from '@mui/material'
import { addGameToUserGamesPlayed } from '../firebase/firebase'
import useSweetAlert from '../hooks/useSweetAlert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons'


export default function Game() {
  const navigate = useNavigate()
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)
  const [gameConfiguration, setGameConfiguration] = useState([])
  const [playingGame, setPlayingGame] = useState(false)
  const [gameStatus, setGameStatus] = useState('FIRST_TIME');
  const [cantPlayAnymore, setCantPlayAnymore] = useState(false);
  const {popUp, modal} = useSweetAlert()
  

  useEffect(() => {
    console.log(userInfo)
    if(!userInfo.email) navigate('/')
    if(userInfo?.gamesPlayed?.length === 0) setGameStatus('FIRST_TIME')
    if(userInfo?.gamesPlayed?.length === 1) setGameStatus('SECOND_TIME')
    if(userInfo?.gamesPlayed?.length === 2) setGameStatus('THIRD_TIME')
    if(userInfo?.gamesPlayed?.length >= 3) setGameStatus('GAME_FINISH')
    if(userInfo?.gamesPlayed?.length > 4) setCantPlayAnymore(true)
  }, [userInfo]);

  useEffect(() => {
      let configCopy = APP_DATA.APP_GAME.GAME_CONFIGURATION
      configCopy.tables = userInfo.tableAssigned;
      setGameConfiguration(configCopy)
    }, []);


  const showBonification = (message, timer, popUpPosition) =>{
    return popUp({
      message: message,
      timer: timer,
      popUpPosition: popUpPosition
    })
  }

  const saveGameResults = async (game) => {
    setLoadingLogin(true)
    if(loadingLogin) return
    let userInfoCopy = {...userInfo}
    userInfoCopy.gamesPlayed.push(game)
    await addGameToUserGamesPlayed(game, userInfoCopy).then(res => {
      setUserInfo(userInfoCopy)
    }).finally(() => {
      setPlayingGame(false)
      setLoadingLogin(false)

    })
  }


  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_GAME.TITLE}</h1>
          <StyledLayoutContent style={{padding: 0, overflowY:'scroll'}}>
            {loadingLogin ? <CircularProgress/> 
            :
              <>
                {playingGame ?
                    <Bricks
                      saveGameResults={saveGameResults}
                      gameConfiguration={gameConfiguration}
                      showBonification={showBonification}
                      endGameModal = {modal}
                    />
              : 
                    <StyledFlexCenter direction="column" style={{height: '100%', alignItems:'center', justifyContent:'center', width: '100%'}}>

                      {!userInfo?.finalForm1?.isCompleted && gameStatus === "FIRST_TIME" && !cantPlayAnymore ?
                        <>
                          <h2 style={{marginTop: '5em'}}>¿Cómo se juega?</h2>
                          <p>Te recuerdo cómo se juega:</p>
                          <p>Usa las teclas de flechas de dirección para mover la “raqueta”. La raqueta te sirve para golpear la bola y romper cuantos más ladrillos puedas. Cada ladrillo te da puntos y hay que conseguir la puntuación máxima. Algunos de los ladrillos se transforman en marcas y esas marcas te dan muchos puntos o alargan la raqueta, lo que permite golpear la pelota con más facilidad.</p>
                          <p>Tienes tres vidas en cada partida. Tienes que jugar como mínimo tres partidas pero puedes jugar un máximo de cinco partidas, si lo deseas. Los puntos de cada partida se guardan. No juegues más de dos partidas en el mismo día.</p>
                          <p>Recuerda que tienes que jugar con tu ordenador de sobremesa o portátil, no con el móvil.</p>
                          <p style={{color: 'green'}}><strong>Objetivo:</strong> conseguir los mayores puntos posibles para aparecer en el ranking en primera posición.</p>
                          <p>El jugador o la jugadora que gane más puntos obtendrá una tarjeta regalo de 30€ de Amazon. También se sorteará una tarjeta de 30€ de Amazon entre todas aquellas personas que jueguen las cinco partidas (se eliminarán del sorteo los jugadores que se dejen perder o hagan trampas).</p>
                          <p>¿Preparado para jugar?</p>
                          <Button
                            variant='contained'
                            onClick={() => setPlayingGame(true)}
                            style={{marginBottom: '3em'}}
                          >
                            ¡Jugar!
                          </Button>
                        </>  
                    :  !userInfo?.finalForm1?.isCompleted && (gameStatus === "SECOND_TIME" || gameStatus === "THIRD_TIME") && !cantPlayAnymore ?
                        <>
                        <h2>Partida terminada</h2>
                          <p>Para que tu puntuación quede registrada necesitas jugar al menos tres partidas y rellenar el cuestionario final. </p>
                          <p>Si lo deseas y para conseguir más puntos, puedes jugar un máximo de cinco partidas antes de contestar al cuestionario final.</p>
                          <p>Puedes jugar hoy u otro día.</p>
                          <Button
                            variant='contained'
                            onClick={() => setPlayingGame(true)}
                            style={{marginBottom: '3em'}}
                          >
                            ¡Jugar!
                          </Button>
                        </>
                    : !userInfo?.finalForm1?.isCompleted && gameStatus === "GAME_FINISH" && !cantPlayAnymore ?
                        <>
                          <h2>Partida terminada</h2>
                          <p>Ya has jugado tres partidas.</p>
                          <p>Si lo deseas y para conseguir más puntos, puedes jugar un máximo de cinco partidas antes de contestar al cuestionario final.</p>                        
                          <p>También tienes la opción de rellenar el cuestionario final, pero te recordamos que una vez lo hagas no podrás volver a jugar.</p>
                          <Button
                            variant='contained'
                            onClick={() => setPlayingGame(true)}
                            style={{marginBottom: '2em'}}
                          >
                            ¡Jugar!
                          </Button>
                          <Button
                            variant='contained'
                            onClick={() => navigate('/final-form')}
                            style={{marginBottom: '2em'}}
                          >
                            Ir al cuestionario final.
                          </Button>
                        </>
                    :
                        <>
                            <h2>Partida terminada</h2>
                            <p>Ya has jugado todas las partidas posibles.</p>
                            <p>Tu máxima puntuación quedará registrada una vez que respondas el cuestionario final.</p>
                            <Button
                              variant='contained'
                              onClick={() => !userInfo?.finalForm1?.isCompleted ? navigate('/final-form') : navigate('/final-form-2')}
                              style={{marginBottom: '2em'}}
                            >
                              Ir al cuestionario final.
                            </Button>
                        </>
                      }
                    </StyledFlexCenter>
                  }
              </>
            }
          </StyledLayoutContent>
    </StyledAppLayout>
  )
}
