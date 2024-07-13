import { useParams } from "react-router-dom";
import ProvasService from "../../services/Provas";
import { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import Accordion from "../../componentes/Accordion";
import DataService from "../../services/DataService";
import PaginaEspecifaNotFound from "../ProvaEspecificaNotFound";

const ProvaEspecifica = () => {
    const dataService = new DataService();
    const parametros = useParams();
    const provaService = new ProvasService();
    const [prova, setProva] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id).then(res => {
            if (res.request && res.request.status === 404) {
                setIsLoading(false);
                setProva(null);
                return;
            } else {
                setIsLoading(false);
                setProva(res);
            }

        }).catch(err => {
            console.error(err);
            setIsLoading(false);
        });

    }, [parametros.id]);

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (prova === null) {
        return <PaginaEspecifaNotFound erro="Prova não encontrada"/>; // Renderize a página não encontrada
    }

    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <div>
                    <h1>Prova: {prova.titulo}</h1>
                    <p>Data da prova: {dataService.transformarDataEmString(prova.data)}</p>
                    <Accordion listaDeMaterias={prova.listaDeMaterias}/>
                </div>
            </MainEstilizada>
        </>
    );
}
export default ProvaEspecifica;
