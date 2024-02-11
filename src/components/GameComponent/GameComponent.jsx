import React, { useEffect, useState } from 'react'
import { APP_DATA } from '../../CONSTANTS'
import { Button } from '@mui/material'
import { StyledLayoutContent } from '../../styled-components/containers'
import WordCatcher from '../WordCatcher/WordCatcher'

export default function GameComponent({
    setIsGameEnd,
    setGameResult,
    gameResult
  }) {
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
      if(gameResult) setButtonDisabled(false)
    }, [gameResult]);

  return (<>
    <h1>{APP_DATA.APP_GAME.TITLE}</h1>
    <StyledLayoutContent style={{padding: 0}}>
        <WordCatcher
          config={APP_DATA.APP_GAME.GAME_CONFIGURATION}
          setGameResult={setGameResult}
        />
    </StyledLayoutContent>
    <Button
      variant='contained'
      disabled={buttonDisabled}
      onClick={() => setIsGameEnd(true)}
    >
        {APP_DATA.APP_GAME.END_GAME_BUTTON}
    </Button>
  </>
  )
}
