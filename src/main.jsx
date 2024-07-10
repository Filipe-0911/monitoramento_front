import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './Styles/GlobalStyles'
import Routering from './Routes/routes'
import Modal from 'react-modal';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Routering />
  </React.StrictMode>,
)
