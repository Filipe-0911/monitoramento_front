import Cabecalho from "../../componentes/Cabecalho";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import TarefaService from "../../services/Tarefas";
import { BotaorCard, CardTarefasEstilizado, ContainerTarefas, MainEstilizada } from "../../componentes/ComponentesHome";
import ModalComponent from "../../componentes/Modal";
import { FormEstilizado } from "../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../componentes/CampoForm";
import TextAreaEstilizado from "../../componentes/TextAreaEstilizado";
import BotaoEstilizado from "../../componentes/Botao";

const Home = () => {
    const nomeUsuario = localStorage.getItem('nome').toString();
    const tarefaService = new TarefaService();

    const [tarefas, setTarefas] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        tarefaService.buscaTarefas().then((tarefas) => setTarefas(tarefas));
    }, []);

    function openModal(tarefa) {
        setForm({
            titulo: tarefa.titulo || '',
            descricao: tarefa.descricao || '',
            data: tarefa.data ? new Date(tarefa.data).toISOString().substring(0, 16) : '',
            id: tarefa.id || null,
        });
        setModalAberto(true);
    }

    function closeModal() {
        setModalAberto(false);
    }

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

    const alterarTarefa = (event) => {
        event.preventDefault();
        console.log(form);
        tarefaService.alterarTarefa(form).then((response) => {
            setTarefas(tarefas.map(tarefa => tarefa.id === form.id ? { ...tarefa, ...form } : tarefa));
            closeModal();
        });
    }
    const handleChanger = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <>
            <Cabecalho nome={JSON.parse(nomeUsuario)} />
            <MainEstilizada>
                <h1>Home</h1>
                <ContainerTarefas>
                    {tarefas.map(tarefa => (
                        <CardTarefasEstilizado key={tarefa.id} $concluido={tarefa.concluido} onClick={() => openModal(tarefa)}>
                            <h4>{tarefa.titulo}</h4>
                            <div className="principal">
                                <p>{tarefa.descricao}</p>
                                <p>Concluir até: {tarefaService.transformarDataEmString(tarefa.data)}</p>
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
                    ))}
                </ContainerTarefas>
                <ModalComponent modalIsOpen={modalAberto} closeModal={closeModal}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                    <BotaorCard onClick={closeModal}>
                        <MdCancel />
                    </BotaorCard>
                    </div>
                    <FormEstilizado onSubmit={alterarTarefa}>
                        <input
                            defaultValue={form.id}
                            type="number"
                            hidden
                        />
                        <p>Editar</p>
                        <label>Título</label>
                        <CampoForm
                            defaultValue={form.titulo}
                            onChange={handleChanger}
                            type="text"
                            name="titulo"
                            placeholder="Título"
                        />
                        <label>Descrição</label>
                        <TextAreaEstilizado
                            defaultValue={form.descricao}
                            onChange={handleChanger}
                            placeholder="Descrição"
                            name="descricao"
                        />
                        <label>Data de conclusão</label>
                        <CampoForm
                            defaultValue={form.data}
                            onChange={handleChanger}
                            type="datetime-local"
                            name="data"
                            placeholder="Data de conclusão"
                        />
                        <BotaoEstilizado $disable={false} type="submit">
                            Alterar
                        </BotaoEstilizado>
                    </FormEstilizado>
                </ModalComponent>
            </MainEstilizada>
        </>
    );
}

export default Home;
