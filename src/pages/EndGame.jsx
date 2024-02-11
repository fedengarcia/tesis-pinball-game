import React, { useContext } from 'react';
import { StyledAppLayout, StyledLayoutContent } from '../styled-components/containers';
import { APP_DATA } from '../CONSTANTS';
import { Button } from '@mui/material';
import UserContext from '../UserProvider/UserContext';
import { editUser } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function EndGame() {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const navigate = useNavigate()


  const handleRestartGame = async () => {
    let userInfoCopy = {...userInfo}
    userInfoCopy.gameCompleted = false
    const userUpdated = await editUser(userInfo.email, userInfoCopy)
    
    if(userUpdated){
      setUserInfo(userUpdated)
      navigate('/game')
    }else{
      alert("Err updating data")
    }
    
  }
    return (
      <StyledAppLayout>
    <h1>{APP_DATA.APP_END.TITLE}</h1>
    <StyledLayoutContent style={{padding: 0, overflow:'hidden'}}>
      <h2>{APP_DATA.APP_END.SUB_TITLE}</h2>
    </StyledLayoutContent>
    <Button
      variant='contained'
      // disabled={buttonDisabled}
      onClick={() => handleRestartGame()}
    >
        {APP_DATA.APP_END.RESTART_BUTTON}
    </Button>
      </StyledAppLayout>
    )
  }
  