import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import UserContext from '../UserProvider/UserContext'
import { useNavigate } from 'react-router-dom'
import { APP_DATA } from '../CONSTANTS'
import Bricks from '../components/Bricks/Bricks'
import { Button, CircularProgress } from '@mui/material'
import { addGameToUserGamesPlayed } from '../firebase/firebase'
import useSweetAlert from '../hooks/useSweetAlert'


export default function Game() {
  const navigate = useNavigate()
  const {userInfo, setUserInfo, loadingLogin, setLoadingLogin} = useContext(UserContext)
  const [gameConfiguration, setGameConfiguration] = useState([])
  const [gameResult, setGameResult] = useState(undefined)
  const [playingGame, setPlayingGame] = useState(false)
  const [gameStatus, setGameStatus] = useState('FIRST_TIME')
  const {popUp, modal} = useSweetAlert()
  

  useEffect(() => {
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


  const showBonification = (message, timer) =>{
    return popUp({
      message: message,
      timer: timer,
      popUpPosition:'bottom',
    })
  }

  const saveGameResults = async (game) => {
    setLoadingLogin(true)
    if(loadingLogin) return
    let userInfoCopy = {...userInfo}
    userInfoCopy.gamesPlayed.push(game)
    await addGameToUserGamesPlayed(game, userInfoCopy).then(res => {
      console.log(res)
      setUserInfo(userInfoCopy)
    }).finally(() => {
      setPlayingGame(false)
      setLoadingLogin(false)

    })
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
                      setGameResult={setGameResult}
                      showBonification={showBonification}
                      endGameModal = {modal}
                    />
                  }
                  {!playingGame && 
                    <StyledFlexCenter direction="column" style={{height: '100%', alignItems:'center', width: '50%'}}>
                      <h1>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].TITLE}</h1>
                      <h2>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].SUBTITLE}</h2>
                      <Button
                        fullWidth
                        variant='contained'
                        // disabled={buttonDisabled}
                        onClick={() => setPlayingGame(true)}
                      >
                        {APP_DATA.APP_GAME.GAME_STATUS[gameStatus].BUTTON_TITLE}
                      </Button>
                      {gameStatus === "GAME_FINISH" &&
                      <Button
                        style={{margin: '10px'}}
                        variant='contained'
                        fullWidth
                        // disabled={buttonDisabled}
                        onClick={() => navigate('/final-form')}
                      >
                        {userInfo.finalForm.isCompleted ? APP_DATA.APP_GAME.GAME_STATUS[gameStatus].BUTTON_TITLE3 : APP_DATA.APP_GAME.GAME_STATUS[gameStatus].BUTTON_TITLE2}
                      </Button>}
                    </StyledFlexCenter>
                  }
              </>
            }
          </StyledLayoutContent>
    </StyledAppLayout>
  )
}
