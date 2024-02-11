import React, { useState } from 'react'
import { StyledAppLayout } from '../styled-components/containers'
import LastForm from '../components/LastForm'
import GameComponent from '../components/GameComponent/GameComponent'

export default function Game() {
  const [isGameEnd, setIsGameEnd] = useState(false)
  const [gameResult, setGameResult] = useState({})

  return (
    <StyledAppLayout>
      {!isGameEnd 
      ? <GameComponent 
          setGameResult={setGameResult}
          setIsGameEnd={setIsGameEnd}
        />
      : <LastForm/>
      }
    </StyledAppLayout>
  )
}
