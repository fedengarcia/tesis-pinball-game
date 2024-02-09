import React, { useState } from 'react'
import { StyledAppLayout, StyledLayoutContent } from '../styled-components/containers'
import { APP_DATA } from '../CONSTANTS'
import PinballGameComponent from '../components/PinballGameComponent/PinballGameComponent'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LastForm from '../components/LastForm'

export default function PinballGame() {
  const [isGameEnd, setIsGameEnd] = useState(false)
  const navigate = useNavigate()

  const handlePinballEnd = () => {
    setIsGameEnd(true)
  }

  return (
    <StyledAppLayout>
      {!isGameEnd 
      ? <PinballGameComponent setIsGameEnd={setIsGameEnd}/>
      
      : <LastForm/>
      }

    </StyledAppLayout>
  )
}
