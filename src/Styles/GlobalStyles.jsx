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
        background-color: #3f3d3d;
        }
        ::-webkit-scrollbar {
            width: 6px;
            background-color: rgba(0, 0, 0, 0.2);
        }
        ::-webkit-scrollbar-thumb {
            background-color: #161515;
        }

        // estilizar barra de rolagem para internet explorer
        ::-ms-track {
        background-color: #3f3d3d;
        border-color: transparent;
        border-width: 6px;
        }
        ::-ms-thumb {
            background-color: #3f3d3d;
            border-color: transparent;
            border-width: 6px;
            height: 16px;
            width: 16px;
        }

        // estilizar barra de rolagem para firefox
        scrollbar-color: #616161 #2E2E2E;
        scrollbar-width: thin; 

    }

`

export default GlobalStyle;