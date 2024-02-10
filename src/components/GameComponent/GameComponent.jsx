import React from 'react'
import { APP_DATA } from '../../CONSTANTS'
import { Button } from '@mui/material'
import { StyledLayoutContent } from '../../styled-components/containers'
import WordCatcher from '../WordCatcher/WordCatcher'

export default function GameComponent({
    setIsGameEnd
}) {

  return (<>
    <h1>{APP_DATA.APP_GAME.TITLE}</h1>
    <StyledLayoutContent>
        <WordCatcher
        
        
        />
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
