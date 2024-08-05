import { Outlet } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho";
import Footer from "../../componentes/Footer";
import MainEstilizada from "../../componentes/Main";
import useUserContext from "../../Hooks/useUserContext";

export default function PaginaBase() {
    const { verificaSeEstaAutenticado } = useUserContext();
    verificaSeEstaAutenticado()
    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <Outlet />
            </MainEstilizada>
            <Footer />
        </>
    );
}