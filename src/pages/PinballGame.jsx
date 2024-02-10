import React, { useState } from 'react'
import { StyledAppLayout } from '../styled-components/containers'
import PinballGameComponent from '../components/PinballGameComponent/PinballGameComponent'
import LastForm from '../components/LastForm'

export default function PinballGame() {
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
