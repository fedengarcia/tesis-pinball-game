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
  const [gameStatus, setGameStatus] = useState('FIRST_TIME')
  const {popUp, modal} = useSweetAlert()
  

  useEffect(() => {
    console.log(userInfo)
    if(!userInfo.email) navigate('/')
    if(userInfo?.gamesPlayed?.length === 0) setGameStatus('FIRST_TIME')
    if(userInfo?.gamesPlayed?.length === 1) setGameStatus('SECOND_TIME')
    if(userInfo?.gamesPlayed?.length >= 2) setGameStatus('GAME_FINISH')
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

  const launchGameModal = () => {
    modal(
      APP_DATA.APP_GAME.CONTROLS.TITLE, 
      `
      <p>${APP_DATA.APP_GAME.CONTROLS.SUBTITLE}</p>
      <p>${APP_DATA.APP_GAME.CONTROLS.SUBTITLE2}</p>
      <p>${APP_DATA.APP_GAME.CONTROLS.SUBTITLE3}</p>
      <p>${APP_DATA.APP_GAME.CONTROLS.SUBTITLE4}</p>
      `,
      () => setPlayingGame(true),
      APP_DATA.APP_GAME.CONTROLS.BUTTON
      )
  }


  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_GAME.TITLE}</h1>
          <StyledLayoutContent style={{padding: 0, overflow:'hidden'}}>
            {loadingLogin ? <CircularProgress/> 
            :
              <>
                {playingGame && 
                    <Bricks
                      saveGameResults={saveGameResults}
                      gameConfiguration={gameConfiguration}
                      showBonification={showBonification}
                      endGameModal = {modal}
                    />
                  }
                  {!playingGame && 
                    <StyledFlexCenter direction="column" style={{height: '100%', alignItems:'center', width: '50%'}}>
                      <div>
                        {<h1>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].TITLE}</h1>}
                      </div>
                      
                      
                      <div>
                        {!userInfo?.finalForm?.isCompleted && 
                        <>
                          <p style={{textAlign:'center', fontSize:'20px'}}>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].SUBTITLE}</p>
                          <p style={{fontSize:'16px'}}>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].SUBTITLE2}</p>
                          {!userInfo?.firstForm?.isCompleted && 
                          <>
                          <p><FontAwesomeIcon icon={faInfoCircle} style={{marginRight: '8px', color: '#c93a3a'}}/>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].ADVISE}</p>
                          <p><FontAwesomeIcon icon={faInfoCircle} style={{marginRight: '8px', color: '#c93a3a'}}/>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].ADVISE2}</p></>}
                          </>
                        }
                       {APP_DATA.APP_GAME.GAME_STATUS[gameStatus].SUBTITLE3 &&
                        <p style={{fontSize:'16px'}}>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].SUBTITLE3}</p>
                       }
                        {gameStatus === "GAME_FINISH" && userInfo.finalForm.isCompleted &&
                          <>
                              {APP_DATA.APP_GAME.GAME_STATUS[gameStatus].CANT_PLAY}
                          </>
                        
                        }

                      {!userInfo?.finalForm?.isCompleted && 
                      <Button
                        fullWidth
                        variant='contained'
                        // disabled={buttonDisabled}
                        onClick={launchGameModal}
                      >
                        {APP_DATA.APP_GAME.GAME_STATUS[gameStatus].BUTTON_TITLE}
                      </Button>}
                      {gameStatus === "GAME_FINISH" && userInfo?.finalForm?.isCompleted &&
                      <Button
                        style={{margin: '15px 0'}}
                        variant='contained'
                        fullWidth
                        // disabled={buttonDisabled}
                        onClick={() => navigate('/final-form')}
                      >
                        {APP_DATA.APP_GAME.GAME_STATUS[gameStatus].BUTTON_TITLE3}
                      </Button>}
                      {gameStatus === "GAME_FINISH" && !userInfo?.finalForm?.isCompleted &&
                      <Button
                        style={{margin: '15px 0'}}
                        variant='contained'
                        fullWidth
                        // disabled={buttonDisabled}
                        onClick={() => navigate('/final-form')}
                      >
                        {APP_DATA.APP_GAME.GAME_STATUS[gameStatus].BUTTON_TITLE2}
                      </Button>}
                      </div>
                    </StyledFlexCenter>
                  }
              </>
            }
          </StyledLayoutContent>
    </StyledAppLayout>
  )
}
