import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/Routes'
import { UserProvider } from './UserProvider/UserProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <Routes />

    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
