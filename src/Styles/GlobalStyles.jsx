import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg-azul-claro: #357c7c;
    }
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;

        // estilizar barra de rolagem
        ::-webkit-scrollbar-track {
        background-color: #F4F4F4;
        }
        ::-webkit-scrollbar {
            width: 6px;
            background: #F4F4F4;
        }
        ::-webkit-scrollbar-thumb {
            background: #dad7d7;
        }

        // estilizar barra de rolagem para internet explorer
        ::-ms-track {
        background-color: transparent;
        border-color: transparent;
        border-width: 6px;
        }
        ::-ms-thumb {
            background-color: #dad7d7;
            border-color: transparent;
            border-width: 6px;
            height: 16px;
            width: 16px;
        }

        // estilizar barra de rolagem para firefox
        scrollbar-width: thin;
        scrollbar-color: #dad7d7 #F4F4F4;

    }

`

export default GlobalStyle;