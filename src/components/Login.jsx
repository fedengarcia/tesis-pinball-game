import React, { useState } from 'react'
import { APP_DATA } from '../CONSTANTS'
import { StyledLayoutContent } from '../styled-components/containers'
import { Box } from '@mui/system'
import { AccountCircle } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'

export default function Login({handleLogin}) {
    const [userInfo, setUserInfo] = useState({
        email: ''
    })

    const handleEmailInput = (e) =>{
        setUserInfo((prevState) => ({...prevState, email: e.target.value}))
    }
    
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const validation = regex.test(email);
        return validation
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
