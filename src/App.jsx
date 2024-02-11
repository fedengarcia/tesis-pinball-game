import { StyledAppLayout } from './styled-components/containers'
import { APP_DATA } from './CONSTANTS'
import FirstForm from './components/FirstForm'
import Login from './components/Login';
import { useContext, useEffect } from 'react';
import UserContext from './UserProvider/UserContext';
import { useNavigate } from 'react-router-dom';

export default function App() {
 const {isLogged, userInfo} = useContext(UserContext)
  const navigate = useNavigate()



  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_TITLE}</h1>

      {!isLogged ? 
        <Login />
      :
        <FirstForm/>
      }

    </StyledAppLayout>
  )
}
