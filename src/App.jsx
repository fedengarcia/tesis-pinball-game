import { StyledAppLayout, StyledLayoutContent } from './styled-components/containers'
import { APP_DATA } from './CONSTANTS'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Input, TextField, InputAdornment, Box } from '@mui/material'

import FirstForm from './components/FirstForm'
import { useEffect, useState } from 'react';
import Login from './components/Login';

export default function App() {
  const [isLogged, setIsLogged]= useState(false);

  const handleLogin = () => {
    setIsLogged(true)
  }



  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_TITLE}</h1>

      {!isLogged ? 
        <Login handleLogin={handleLogin}/>
      :
        <FirstForm/>
      }

    </StyledAppLayout>
  )
}
