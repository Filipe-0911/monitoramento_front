import { useEffect, useState } from "react";

//icons
import { FaCheckCircle, FaPencilAlt } from "react-icons/fa";
import { MdCancel, MdOutlineAddToPhotos } from "react-icons/md";

// Componentes auxiliares
import { BotaorCard, CardTarefasEstilizado, ContainerTarefas, MainEstilizada, SectionAdicionarTarefa } from "../../componentes/ComponentesHome";
import { FormEstilizado } from "../../componentes/ContainerLoginEstilizado";

// Componentes default
import Cabecalho from "../../componentes/Cabecalho";
import ModalComponent from "../../componentes/Modal";

//Services
import TarefaService from "../../services/Tarefas";
import FormEstilizadoTarefa from "../../componentes/FormEstilizadoTarefa";
import CardTarefas from "../../componentes/CardTarefas";

const Home = () => {
    const nomeUsuario = localStorage.getItem('nome').toString();
    const tarefaService = new TarefaService();

    const [tarefas, setTarefas] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [form, setForm] = useState({});
    const [adicionarOuAlterar, setAdicionarOuAlterar] = useState("");

    useEffect(() => {
        tarefaService.buscaTarefas().then((tarefas) => setTarefas(tarefas));
    }, []);

    function openModal(tarefa, event) {
        if (event.target.id === 'adicionar' || event.target.name === 'adicionar') {
            setForm('');
            setAdicionarOuAlterar("Adicionar");

        } else {
            setAdicionarOuAlterar("Alterar");
            setForm({
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                data: new Date(tarefa.data).toISOString().substring(0, 16),
                id: tarefa.id,
            })
        }

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

    const handleChanger = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const middlewareRequest = (event) => {
        event.preventDefault();
        console.log(event.target)
    }

    const alterarTarefa = (event) => {
        event.preventDefault();
        tarefaService.alterarTarefa(form).then((response) => {
            setTarefas(tarefas.map(tarefa => tarefa.id === form.id ? { ...tarefa, ...form } : tarefa));
            closeModal();
        });
    }
    const adicionarTarefa = (event) => {
        event.preventDefault();
        tarefaService.adicionarTarefa(form).then((response) => {
            const { titulo, descricao, data } = response;
            console.log(response.data)
            setTarefas([...tarefas, {titulo: titulo, descricao: descricao, data: data}]);
            closeModal();
        });
    }

    return (
        <>
            <Cabecalho nome={JSON.parse(nomeUsuario)} />
            <MainEstilizada>
                <h1>Home</h1>
                <h2>Visualize abaixo sua lista de tarefas pendentes / a concluir: </h2>
                <SectionAdicionarTarefa>
                    <h4>Adicionar Tarefa</h4>
                    <BotaorCard name="adicionar" $type="adicionar" onClick={(event) => openModal(null, event)} >
                        <MdOutlineAddToPhotos id="adicionar" size={15} style={{ cursor: 'pointer' }} />
                        Adicionar
                    </BotaorCard>
                </SectionAdicionarTarefa>
                <ContainerTarefas>
                    {tarefas.map(tarefa => (
                        <CardTarefas key={tarefa.id} tarefa={tarefa} concluirTarefa={concluirTarefa} transformarDataEmString={tarefaService.transformarDataEmString} deletarTarefa={deletarTarefa} openModal={openModal} />
                    ))}
                </ContainerTarefas>
                <ModalComponent modalIsOpen={modalAberto} closeModal={closeModal} tituloEBotao={adicionarOuAlterar}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <BotaorCard $type="excluir" onClick={closeModal}>
                            <MdCancel />
                        </BotaorCard>
                    </div>
                    <FormEstilizadoTarefa tituloEBotao={adicionarOuAlterar} onClick={adicionarOuAlterar === "Adicionar" ? adicionarTarefa : alterarTarefa} form={form} handleChanger={handleChanger} />
                </ModalComponent>
            </MainEstilizada>
        </>
    );
}

export default Home;
