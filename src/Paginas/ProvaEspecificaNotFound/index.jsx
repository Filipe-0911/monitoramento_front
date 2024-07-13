import BotaoEstilizado from "../../componentes/Botao";
import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import { useNavigate } from "react-router-dom";

const PaginaEspecifaNotFound = ({ erro }) => {
    // Implementar a página de erro 404
    const navigate = useNavigate();
    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <div>
                    <h1>Página não encontrada...</h1>
                    <BotaoEstilizado onClick={() => navigate(-1)}>
                        Voltar
                    </BotaoEstilizado>
                </div>
            </MainEstilizada>
        </>
    );
}

export default PaginaEspecifaNotFound;