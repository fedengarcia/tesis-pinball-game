import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout, StyledLayoutContent } from '../styled-components/containers'
import LastForm from './LastForm'
import GameComponent from '../components/GameComponent/GameComponent'
import UserContext from '../UserProvider/UserContext'
import { useNavigate } from 'react-router-dom'
import { APP_DATA } from '../CONSTANTS'
import Bricks from '../components/Bricks/Bricks'
import { Button } from '@mui/material'

export default function Game() {
  const [isGameEnd, setIsGameEnd] = useState(false)
  const navigate = useNavigate()
  const {userInfo, setUserInfo} = useContext(UserContext)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [gameConfiguration, setGameConfiguration] = useState([])
  const [gameResult, setGameResult] = useState({
    timePlayed: 0,
    points: null,
    date: new Date()
  })

  useEffect(() => {
    if(userInfo?.gameCompleted) setIsGameEnd(true)
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
    let userInfoCopy = {...userInfo}
    const userUpdated = await editUser(userInfo.email, userInfoCopy)
    if(userUpdated){
      setUserInfo(userInfoCopy)
      setIsGameEnd(true)
    }else{
      alert("Err updating data")
    }
  }

  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_GAME.TITLE}</h1>
          <StyledLayoutContent style={{padding: 0, overflow:'hidden'}}>
              <Bricks
                // config={gameConfiguration}
                // setGameResult={setGameResult}
              />
          </StyledLayoutContent>
      <Button
        variant='contained'
        // disabled={buttonDisabled}
        onClick={handleEndGame}
      >
          {APP_DATA.APP_GAME.END_GAME_BUTTON}
      </Button>
    </StyledAppLayout>
  )
}
