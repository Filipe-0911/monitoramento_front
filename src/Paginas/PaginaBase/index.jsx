import { Outlet } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho";
import Footer from "../../componentes/Footer";
import MainEstilizada from "../../componentes/Main";
import useUserContext from "../../Hooks/useUserContext";
import styled from "styled-components";

const BodyEstilizado = styled.section`
     font-family: 'Poppins', sans-serif;
     display: flex;
     flex-direction: column;
     background-color: ${props => props.$darkMode ? "#3f3d3d" : "#fff"};
     color: ${props => props.$darkMode ? "#fff" : "#000"};
     transition: 0.25s;
    
     h2 {
         text-align: center;
   }
`

export default function PaginaBase() {
    const { verificaSeEstaAutenticado, usuarioPrefereModoDark, modificaModoDarkOuWhite } = useUserContext();
    verificaSeEstaAutenticado()
    return (
        <>
            <Cabecalho />
            <BodyEstilizado $darkMode={usuarioPrefereModoDark}>
                <MainEstilizada>
                    <Outlet />
                </MainEstilizada>
            </BodyEstilizado>
            <Footer />
        </>

    );
}