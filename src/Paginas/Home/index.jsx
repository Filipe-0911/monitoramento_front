import { useEffect, useState } from "react";

//icons
import { MdCancel, MdOutlineAddToPhotos } from "react-icons/md";

// Componentes auxiliares
import { BotaorCard, ContainerTarefas, SectionAdicionarTarefa } from "../../componentes/ComponentesHome";
import MainEstilizada from "../../componentes/Main";

// Componentes default
import Cabecalho from "../../componentes/Cabecalho";
import ModalComponent from "../../componentes/Modal";
import FormEstilizadoTarefa from "../../componentes/FormEstilizadoTarefa";
import CardTarefas from "../../componentes/CardTarefas";

//Services
import TarefaService from "../../services/Tarefas";
import DataService from "../../services/DataService";
import Footer from "../../componentes/Footer";

const Home = () => {
    const tarefaService = new TarefaService();
    const dataService = new DataService();

    const [tarefas, setTarefas] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);

    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        data: "",
        id: null
    });
    const [adicionarOuAlterar, setAdicionarOuAlterar] = useState("");

    useEffect(() => {
        tarefaService.buscaTarefas().then((tarefas) => setTarefas(tarefas));
    }, []);

    function openModal(tarefa, event) {
        if (event.target.id === 'adicionar' || event.target.name === 'adicionar') {
            setForm({
                titulo: "",
                descricao: "",
                data: "",
                id: null
            });
            setAdicionarOuAlterar("Adicionar");

        } else {
            setAdicionarOuAlterar("Alterar");
            setForm({
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                data: new Date(tarefa.data).toISOString().substring(0, 16),
                id: tarefa.id,
            });
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
            setTarefas([...tarefas, { titulo, descricao, data }]);
            closeModal();
        });
    }

    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <h1>Home</h1>
                <h2 style={{margin: "0 1em", textAlign: 'center'}}>Visualize abaixo sua lista de tarefas pendentes / a concluir: </h2>
                <SectionAdicionarTarefa>
                    <h4>Adicionar Tarefa</h4>
                    <BotaorCard name="adicionar" $type="adicionar" onClick={(event) => openModal(null, event)}>
                        <MdOutlineAddToPhotos id="adicionar" size={15} style={{ cursor: 'pointer' }} />
                        Adicionar
                    </BotaorCard>
                </SectionAdicionarTarefa>
                <ContainerTarefas>
                    {tarefas.map((tarefa, index) => (
                        <CardTarefas key={index} tarefa={tarefa} concluirTarefa={concluirTarefa} transformarDataEmString={dataService.transformarDataEmString} deletarTarefa={deletarTarefa} openModal={openModal} />
                    ))}
                </ContainerTarefas>

                <ModalComponent modalIsOpen={modalAberto} closeModal={closeModal}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <BotaorCard $type="excluir" onClick={closeModal}>
                            <MdCancel />
                        </BotaorCard>
                    </div>
                    <FormEstilizadoTarefa
                        tituloEBotao={adicionarOuAlterar}
                        onClick={adicionarOuAlterar === "Adicionar" ? adicionarTarefa : alterarTarefa}
                        form={form}
                        handleChanger={handleChanger} />
                </ModalComponent>
            </MainEstilizada>
            <Footer/>
        </>
    );
}

export default Home;

