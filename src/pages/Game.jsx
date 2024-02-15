import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledFlexCenter, StyledLayoutContent } from '../styled-components/containers'
import LastForm from './LastForm'
import GameComponent from '../components/GameComponent/GameComponent'
import UserContext from '../UserProvider/UserContext'
import { useNavigate } from 'react-router-dom'
import { APP_DATA } from '../CONSTANTS'
import Bricks from '../components/Bricks/Bricks'
import { Button, CircularProgress } from '@mui/material'
import { editUser } from '../firebase/firebase'


export default function Game() {
  const navigate = useNavigate()
  const {userInfo, setUserInfo, loadingLogin} = useContext(UserContext)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [gameConfiguration, setGameConfiguration] = useState([])
  const [gameResult, setGameResult] = useState({
    timePlayed: 0,
    points: null,
    date: new Date(),
  })
  const [playingGame, setPlayingGame] = useState(false)
  const [gameStatus, setGameStatus] = useState('FIRST_TIME')

  useEffect(() => {
    if(userInfo?.gamesPlayed?.length === 0) setGameStatus('FIRST_TIME')
    if(userInfo?.gamesPlayed?.length === 1) setGameStatus('SECOND_TIME')
    if(userInfo?.gamesPlayed?.length === 2) setGameStatus('GAME_FINISH')
  }, [userInfo]);

  useEffect(() => {
      let configCopy = APP_DATA.APP_GAME.GAME_CONFIGURATION
      configCopy.tables = userInfo.tableAssigned;
      setGameConfiguration(configCopy)
    }, []);

  useEffect(() => {
    if(gameResult.points !== null) setButtonDisabled(false)
  }, [gameResult]);

  const handleEndGame = async () => {
    if(gameStatus === 'GAME_FINISH') navigate('final-form')
    let userInfoCopy = {...userInfo}
    const userUpdated = await editUser(userInfo.email, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
    }else{
      alert("Err updating data")
    }
    setPlayingGame(true)
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
                      setPlayingGame={setPlayingGame}
                      config={gameConfiguration}
                      setGameResult={setGameResult}
                    />
                  }
                  {!playingGame && 
                    <StyledFlexCenter direction="column" style={{height: '100%', alignItems:'center'}}>
                      <h1>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].TITLE}</h1>
                      <h2>{APP_DATA.APP_GAME.GAME_STATUS[gameStatus].SUBTITLE}</h2>
                      <Button
                        variant='contained'
                        // disabled={buttonDisabled}
                        onClick={handleEndGame}
                      >
                        {APP_DATA.APP_GAME.GAME_STATUS[gameStatus].BUTTON_TITLE}
                      </Button>
                    </StyledFlexCenter>
                  }
              </>
            }
          </StyledLayoutContent>
    </StyledAppLayout>
  )
}
