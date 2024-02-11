import React, { useContext, useEffect, useState } from 'react'
import { StyledAppLayout } from '../styled-components/containers'
import LastForm from '../components/LastForm'
import GameComponent from '../components/GameComponent/GameComponent'
import UserContext from '../UserProvider/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Game() {
  const [isGameEnd, setIsGameEnd] = useState(false)
  const {userInfo} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(userInfo?.gameCompleted) setIsGameEnd(true)
  }, [userInfo]);

  return (
    <StyledAppLayout>
      {!isGameEnd 
      ? <GameComponent 
          setIsGameEnd={setIsGameEnd}
        />
      : <LastForm/>
      }
    </StyledAppLayout>
  )
}
