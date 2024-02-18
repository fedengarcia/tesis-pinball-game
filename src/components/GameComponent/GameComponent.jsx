import React, { useContext, useEffect, useState } from 'react'
import { APP_DATA } from '../../CONSTANTS'
import { Button } from '@mui/material'
import { StyledLayoutContent } from '../../styled-components/containers'
import { editUser } from '../../firebase/firebase'
import UserContext from '../../UserProvider/UserContext'
import Bricks from '../Bricks/Bricks'

export default function GameComponent({
    setIsGameEnd,
  }) {
    const {userInfo, setUserInfo} = useContext(UserContext)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [gameConfiguration, setGameConfiguration] = useState([])
    const [gameResult, setGameResult] = useState({
      timePlayed: 0,
      points: null,
      date: new Date()
    })

    useEffect(() => {
      let configCopy = APP_DATA.APP_GAME.GAME_CONFIGURATION
      configCopy.tables = userInfo.tableAssigned;
      setGameConfiguration(configCopy)
    }, []);


    useEffect(() => {
      console.log(gameResult)
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

  return (<>
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
  </>
  )
}
