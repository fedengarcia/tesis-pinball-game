import React, { useContext } from 'react'
import { APP_DATA } from '../CONSTANTS'
import { StyledLayoutContent } from '../styled-components/containers'
import { Box } from '@mui/system'
import { AccountCircle } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import UserContext from '../UserProvider/UserContext'

export default function Login() {
  const {userInfo, setUserInfo, validateEmail, handleLogin } = useContext(UserContext)

    const handleEmailInput = (e) =>{
        setUserInfo((prevState) => ({...prevState, email: e.target.value}))
    }
  

  return (
        <>
          <StyledLayoutContent style={{justifyContent:'center', overflow: 'hidden'}}>
          <p>{APP_DATA.APP_LOGIN_SUBTITLE}</p>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1em' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label={userInfo.email === '' && APP_DATA.APP_EMAIL_LABEL} variant="standard" value={userInfo.name} onChange={handleEmailInput}/>
          </Box>
          <Button 
            disabled={!validateEmail(userInfo.email)}
            onClick={handleLogin}
            variant='contained'
            >
            LOGIN
          </Button>
        </StyledLayoutContent>
        </>
  )
}
