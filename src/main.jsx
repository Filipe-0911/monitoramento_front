import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Paginas/Login'
import GlobalStyle from './Styles/GlobalStyles'
import Routering from './Routes/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Routering />
  </React.StrictMode>,
)
