import { StyledAppLayout } from './styled-components/containers'
import { APP_DATA } from './CONSTANTS'
import FirstForm from './pages/FirstForm'
import Login from './components/Login';
import { useContext, useEffect } from 'react';
import UserContext from './UserProvider/UserContext';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


export default function App() {
 const {handleLogin, getCookie, loadingLogin} = useContext(UserContext)

  useEffect(() => {
    const cookieEmail =  getCookie()
    if(cookieEmail?.email) handleLogin(cookieEmail?.email)
  }, []);

  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_TITLE}</h1>
      <Login />    
    </StyledAppLayout>
  )
}
