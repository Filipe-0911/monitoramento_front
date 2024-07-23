import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './Styles/GlobalStyles'
import Routering from './Routes/routes'
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Routering />
  </React.StrictMode>,
)
