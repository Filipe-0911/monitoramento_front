import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Paginas'
import GlobalStyle from './Styles/GlobalStyles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Login />
  </React.StrictMode>,
)
