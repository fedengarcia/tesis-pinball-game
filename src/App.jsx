import { StyledAppLayout } from './styled-components/containers'
import { APP_DATA } from './CONSTANTS'
import FirstForm from './components/FirstForm'

export default function App() {

  return (
    <StyledAppLayout>
      <h1>{APP_DATA.APP_TITLE}</h1>

      <FirstForm/>
    </StyledAppLayout>
  )
}
