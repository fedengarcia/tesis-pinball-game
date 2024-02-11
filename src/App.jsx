import { StyledAppLayout } from './styled-components/containers'
import { APP_DATA } from './CONSTANTS'
import FirstForm from './components/FirstForm'
import Login from './components/Login';
import { useContext } from 'react';
import UserContext from './UserProvider/UserContext';

export default function App() {
 const {isLogged} = useContext(UserContext)


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
