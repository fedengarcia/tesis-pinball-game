import React, { useContext, useEffect } from 'react'
import { APP_DATA } from '../CONSTANTS'
import { StyledLayoutContent } from '../styled-components/containers'
import { Box } from '@mui/system'
import { AccountCircle } from '@mui/icons-material'
import { Button, CircularProgress, TextField } from '@mui/material'
import UserContext from '../UserProvider/UserContext'

export default function Login() {
  const {userInfo, setUserInfo, validateEmail, handleLogin, loadingLogin, getCookie } = useContext(UserContext)

  const handleEmailInput = (e) =>{
      setUserInfo((prevState) => ({...prevState, email: e.target.value}))
  }



  return (
        <>
          <StyledLayoutContent style={{justifyContent:'center', overflow: 'hidden'}}>
          {loadingLogin ? 
            <CircularProgress/>  
          :
            <>
              <p>{APP_DATA.APP_LOGIN_SUBTITLE}</p>
              <p>{APP_DATA.APP_LOGIN_SUBTITLE2}</p>
              <p>{APP_DATA.APP_LOGIN_SUBTITLE3}</p>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1em' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label={userInfo.email === '' && APP_DATA.APP_EMAIL_LABEL} variant="standard" value={userInfo.name} onChange={handleEmailInput}/>
              </Box>
              <Button 
                disabled={!validateEmail(userInfo.email)}
                onClick={() => handleLogin(userInfo.email)}
                variant='contained'
                >
                LOGIN
              </Button>
            </>
          }
        </StyledLayoutContent>
        </>
  )
}
