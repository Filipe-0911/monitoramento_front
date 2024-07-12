import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    body {
        width:100vw;
        height: 100vh;
        background-color: #f0f2f5;
        font-family: 'Poppins', sans-serif;
        display: flex;
        flex-direction: column;
        height: 100vh;
        min-width: 100vw;
        background-color: #79717A;
    }
`

export default GlobalStyle;