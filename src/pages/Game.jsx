import React, { useState } from 'react'
import { StyledAppLayout } from '../styled-components/containers'
import LastForm from '../components/LastForm'
import GameComponent from '../components/GameComponent/GameComponent'

export default function Game() {
  const [isGameEnd, setIsGameEnd] = useState(false)

  return (
    <StyledAppLayout>
      {!isGameEnd 
      ? <GameComponent setIsGameEnd={setIsGameEnd}/>
      : <LastForm/>
      }
    </StyledAppLayout>
  )
}
