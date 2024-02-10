import React, { useState } from 'react'
import { StyledAppLayout } from '../styled-components/containers'
import PinballGameComponent from '../components/GameComponent/GameComponent'
import LastForm from '../components/LastForm'

export default function Game() {
  const [isGameEnd, setIsGameEnd] = useState(false)

  return (
    <StyledAppLayout>
      {!isGameEnd 
      ? <PinballGameComponent setIsGameEnd={setIsGameEnd}/>
      : <LastForm/>
      }
    </StyledAppLayout>
  )
}
