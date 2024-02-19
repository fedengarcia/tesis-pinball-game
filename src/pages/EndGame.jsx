import React, { useContext } from 'react';
import { StyledAppLayout, StyledLayoutContent } from '../styled-components/containers';
import { APP_DATA } from '../CONSTANTS';
import { Button } from '@mui/material';
import UserContext from '../UserProvider/UserContext';
import { editUser } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function EndGame() {
  const navigate = useNavigate()


    return (
      <StyledAppLayout>
        <h1>{APP_DATA.APP_END.TITLE}</h1>
        <StyledLayoutContent style={{padding: 0, overflow:'hidden'}}>
          <h2>{APP_DATA.APP_END.SUB_TITLE}</h2>

          <Button
            variant='contained'
            // disabled={buttonDisabled}
            onClick={() => navigate('/game')}
          >
              {APP_DATA.APP_END.RESTART_BUTTON}
          </Button>
        </StyledLayoutContent>
      </StyledAppLayout>
    )
  }
  