import { Outlet } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho";
import Footer from "../../componentes/Footer";
import MainEstilizada from "../../componentes/Main";

export default function PaginaBase() {
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