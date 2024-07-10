import styled from "styled-components";
import Cabecalho from "../../componentes/Cabecalho";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import TarefaService from "../../services/Tarefas";

const MainEstilizada = styled.main`
    margin: 3em 0 !important;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const ContainerTarefas = styled.section`
    margin: 2em 0;
    max-width: 70vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
`;

const CardTarefasEstilizado = styled.div`
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.3);
    max-width: 230px;
    background-color: ${(props) => (props.$concluido ? "#004F4D" : "#BDE038")};
    
    h4 {
        padding: 10px;
        color: #000;
        text-align: center;
    }
    div.principal {
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 1em;
        cursor: pointer;

        p {
            color: #000;
            text-align: center;
        }
    }
    div.rodape_card {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 2em;
    }
`;

const BotaorCard = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0.5em 1em;
    border: none;
    background-color: ${(props) => (props.$type === "concluir" ? "#44803F" : "#FF5A33")};
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;

const Home = () => {
    const nomeUsuario = localStorage.getItem('nome').toString();
    const tarefaService = new TarefaService();

    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        tarefaService.buscaTarefas().then((tarefas) => setTarefas(tarefas));
    }, []);

    const concluirTarefa = (id) => {
        tarefaService.concluirTarefa(id).then((response) => {
            setTarefas(tarefas.map(tarefa => tarefa.id === id ? { ...tarefa, concluido: true } : tarefa));
            console.log(response.response);
        });
    };

    const deletarTarefa = (id) => {
        tarefaService.deletarTarefa(id).then((response) => {
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
            console.log(response.response);
        });
    }

    return (
        <>
            <Cabecalho nome={JSON.parse(nomeUsuario)} />
            <MainEstilizada>
                <h1>Home</h1>
                <ContainerTarefas>
                    {tarefas.map(tarefa => {
                        return (
                            <CardTarefasEstilizado key={tarefa.id} $concluido={tarefa.concluido}>
                                <h4>{tarefa.titulo}</h4>
                                <div className="principal">
                                    <p>
                                        {tarefa.descricao}
                                    </p>
                                    <p>
                                        Concluir até:
                                        {new Date(tarefa.data).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                <div className="rodape_card">
                                    {tarefa.concluido === false ? (
                                        <BotaorCard $type="concluir" onClick={() => concluirTarefa(tarefa.id)}>
                                            <FaCheckCircle /> Concluir
                                        </BotaorCard>
                                    ) : (
                                        <BotaorCard $type="concluir" disabled>
                                            <FaCheckCircle /> Concluído
                                        </BotaorCard>
                                    )}
                                    <BotaorCard $type="excluir" onClick={() => deletarTarefa(tarefa.id)}>
                                        <MdCancel /> Excluir
                                    </BotaorCard>
                                </div>
                            </CardTarefasEstilizado>
                        );
                    })}
                </ContainerTarefas>
            </MainEstilizada>
        </>
    );
}

export default Home;
