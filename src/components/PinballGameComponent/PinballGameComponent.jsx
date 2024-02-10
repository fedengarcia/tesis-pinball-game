import React from 'react'
import { APP_DATA } from '../../CONSTANTS'
import { Button } from '@mui/material'
import { StyledLayoutContent } from '../../styled-components/containers'

export default function PinballGameComponent({
    setIsGameEnd
}) {

  return (<>
    <h1>{APP_DATA.APP_GAME.TITLE}</h1>
    <StyledLayoutContent>
        <div>PinballGameComponent</div>
    </StyledLayoutContent>
    <Button
      variant='contained'
      onClick={() => setIsGameEnd(true)}
    >
        {APP_DATA.APP_GAME.END_GAME_BUTTON}
    </Button>
  </>
  )
}
