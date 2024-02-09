import React from 'react'
import { StyledLayoutContent } from '../styled-components/containers'
import { Button } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'


export default function FirstForm() {
  const navigate = useNavigate()  

  const handlePinballInit = () => {
    navigate('pinball-game')
  }
  
  return (
  <>
    <StyledLayoutContent>
      <h2>{APP_DATA.APP_FIRST_FORM.TITLE}</h2>
      <p>{APP_DATA.APP_FIRST_FORM.SUBTITLE}</p>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
      <h1>Vite + React</h1>
    </StyledLayoutContent>
    <Button
      variant='contained'
      onClick={handlePinballInit}
    >
      {APP_DATA.APP_BUTTON_PLAY}
    </Button>
  </>
  )
}
