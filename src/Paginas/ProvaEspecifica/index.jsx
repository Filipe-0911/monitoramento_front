import { useParams } from "react-router-dom";
import ProvasService from "../../services/Provas";
import { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import Accordion from "../../componentes/Accordion";
import DataService from "../../services/DataService";

const ProvaEspecifica = () => {
    const dataService = new DataService();
    const parametros = useParams();
    const provaService = new ProvasService();
    const [prova, setProva] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id).then(res => {
            setProva(res);
            setIsLoading(false);
        }).catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }, [parametros.id]);

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (!prova) {
        return <p>Prova não encontrada</p>;
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
