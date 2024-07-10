import Cabecalho from "../../componentes/Cabecalho";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import TarefaService from "../../services/Tarefas";
import { BotaorCard, CardTarefasEstilizado, ContainerTarefas, MainEstilizada } from "../../componentes/ComponentesHome";

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
