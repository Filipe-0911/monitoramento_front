import { useEffect, useState } from "react";

//icons
import { MdCancel, MdOutlineAddToPhotos } from "react-icons/md";

// Componentes auxiliares
import { BotaorCard, ContainerTarefas, SectionAdicionarTarefa } from "../../componentes/ComponentesHome";

// Componentes default
import ModalComponent from "../../componentes/Modal";
import FormEstilizadoTarefa from "../../componentes/FormEstilizadoTarefa";
import CardTarefas from "../../componentes/CardTarefas";
import Loader from "../../componentes/Loader";
import Alert from "../../componentes/Alert";

//Services
import TarefaService from "../../services/Tarefas";
import DataService from "../../services/DataService";
import Carrossel from "../../componentes/Carrossel";

const Home = () => {
    const tarefaService = new TarefaService();
    const dataService = new DataService();

    const [tarefas, setTarefas] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [alerta, setAlerta] = useState({ success: false, error: false, message: "" });

    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        data: "",
        id: null
    });
    const [acaoUsuario, setAcaoUsuario] = useState("");

    useEffect(() => {
        try {
            tarefaService.buscaTarefas().then((tarefas) => {
                setTarefas(tarefas)
                setIsLoading(false);
            });

        } catch (error) {
            alert(error.message);
            setIsLoading(false);
        }
    }, []);

    function openModal(tarefa, event) {
        if (event.target.id === 'adicionar' || event.target.name === 'adicionar') {
            setForm({
                titulo: "",
                descricao: "",
                data: "",
                id: null
            });
            setAcaoUsuario("Adicionar");

        } else {
            setAcaoUsuario("Alterar");
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

    const concluirTarefa = async (id) => {
        console.log("id: " + id);

        try {
            const response = tarefaService.concluirTarefa(id);
            if (response) {
                setAlertaSuccess("Tarefa concluída com sucesso!");
                setTarefas(tarefas.map(tarefa => tarefa.id === id ? { ...tarefa, concluido: true } : tarefa));
            }
        } catch (error) {
            setAlertaError(error.response.message)
        }

    };

    const deletarTarefa = async (id) => {
        try {
            const response = await tarefaService.deletarTarefa(id);
            if (response) {
                setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
                setAlertaSuccess("Tarefa excluída com sucesso!")
            }

        } catch (error) {
            setAlertaError("Ocorreu um erro ao excluir a tarefa.");
        }

    }

    const handleChanger = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const setAlertaSuccess = (msg) => {
        setAlerta({ success: true, error: false, message: msg })
    }
    const setAlertaError = (msg) => {
        setAlerta({ success: false, error: true, message: msg })
    }

    const alterarTarefa = async (event) => {
        event.preventDefault();
        try {
            const response = await tarefaService.alterarTarefa(form);
            if (response) {
                setTarefas(tarefas.map(tarefa => tarefa.id === form.id ? { ...tarefa, ...form } : tarefa));
                closeModal();
                setAlertaSuccess("Tarefa alterada com sucesso!");
            }

        } catch (error) {
            setAlertaError(error.response.data);
            closeModal();
        }
    }

    const adicionarTarefa = async (event) => {
        event.preventDefault();
        try {
            const response = await tarefaService.adicionarTarefa(form);
            setTarefas([...tarefas, response]);
            setAlertaSuccess("Tarefa adicionada com sucesso!");
            closeModal();
        } catch (error) {
            let mensagemErro = error.response.data;

            if (Array.isArray(mensagemErro)) {
                mensagemErro.forEach(({ campo, mensagem }) => setAlertaError(`Erro no campo ${campo}: ${mensagem}`));
            } else {
                setAlertaError(mensagemErro);
            }
        }
    };

    return (
        <>
            <h1>Home</h1>
            <h2 style={{ margin: "0 1em", textAlign: 'center' }}>Visualize abaixo sua lista de tarefas pendentes / a concluir: </h2>
            <SectionAdicionarTarefa>
                <h4>Adicionar Tarefa</h4>
                <BotaorCard name="adicionar" $type="adicionar" onClick={(event) => openModal(null, event)}>
                    <MdOutlineAddToPhotos id="adicionar" size={15} style={{ cursor: 'pointer' }} />
                    Adicionar
                </BotaorCard>
            </SectionAdicionarTarefa>


            {
                isLoading
                    ?
                    <Loader />
                    :
                    tarefas.length > 0 &&
                    <Carrossel items={
                        tarefas.map((tarefa, index) => (
                            <CardTarefas
                                key={index}
                                tarefa={tarefa}
                                concluirTarefa={concluirTarefa}
                                transformarDataEmString={dataService.transformarDataEmString}
                                deletarTarefa={deletarTarefa}
                                openModal={openModal}
                            />
                        ))
                    } />
            }

            <ModalComponent modalIsOpen={modalAberto} closeModal={closeModal}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <BotaorCard $type="excluir" onClick={closeModal}>
                        <MdCancel />
                    </BotaorCard>
                </div>
                <FormEstilizadoTarefa
                    tituloEBotao={acaoUsuario}
                    onClick={acaoUsuario === "Adicionar" ? adicionarTarefa : alterarTarefa}
                    form={form}
                    handleChanger={handleChanger} />
            </ModalComponent>
            <Alert
                dados={alerta}
            />
        </>
    );
}

export default Home;

