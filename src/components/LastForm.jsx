import React from 'react'
import { StyledLayoutContent } from '../styled-components/containers'
import { Button } from '@mui/material'
import { APP_DATA } from '../CONSTANTS'
import { useNavigate } from 'react-router-dom'

export default function LastForm() {
  const navigate = useNavigate()  

  const handleSeeResults = () => {
    navigate('/end-game')
  }
  
  return (
  <>
    <StyledLayoutContent>
      <h2>{APP_DATA.APP_LAST_FORM.TITLE}</h2>
      <p>{APP_DATA.APP_LAST_FORM.SUBTITLE}</p>
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
      onClick={handleSeeResults}
    >
      {APP_DATA.APP_BUTTON_END}
    </Button>
  </>
  )
}
