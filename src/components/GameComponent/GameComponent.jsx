import React, { useContext, useEffect, useState } from 'react'
import { APP_DATA } from '../../CONSTANTS'
import { Button } from '@mui/material'
import { StyledLayoutContent } from '../../styled-components/containers'
import Pinball from '../Pinball/Pinball'
import { editUser } from '../../firebase/firebase'
import UserContext from '../../UserProvider/UserContext'

export default function GameComponent({
    setIsGameEnd,
  }) {
    const {userInfo, setUserInfo} = useContext(UserContext)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [gameConfiguration, setGameConfiguration] = useState([])
    const [gameResult, setGameResult] = useState({
      points: null
    })

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
      userInfoCopy.gameCompleted = true
      const userUpdated = await editUser(userInfo.email, userInfoCopy)
      if(userUpdated){
        setUserInfo(userInfoCopy)
        setIsGameEnd(true)
      }else{
        alert("Err updating data")
      }
    }

  return (<>
    <h1>{APP_DATA.APP_GAME.TITLE}</h1>
    <StyledLayoutContent style={{padding: 0, overflow:'hidden'}}>
        <Pinball
          config={gameConfiguration}
          setGameResult={setGameResult}
        />
    </StyledLayoutContent>
    <Button
      variant='contained'
      // disabled={buttonDisabled}
      onClick={handleEndGame}
    >
        {APP_DATA.APP_GAME.END_GAME_BUTTON}
    </Button>
  </>
  )
}
