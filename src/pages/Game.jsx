import React, { useState } from 'react'
import { StyledAppLayout } from '../styled-components/containers'
import LastForm from '../components/LastForm'
import GameComponent from '../components/GameComponent/GameComponent'

export default function Game() {
  const [isGameEnd, setIsGameEnd] = useState(false)
  const [gameResult, setGameResult] = useState({
    points: null
  })

  return (
    <StyledAppLayout>
      {!isGameEnd 
      ? <GameComponent 
          gameResult={gameResult}
          setGameResult={setGameResult}
          setIsGameEnd={setIsGameEnd}
        />
      : <LastForm/>
      }
    </StyledAppLayout>
  )
}
