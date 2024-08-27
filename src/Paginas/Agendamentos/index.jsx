import Calendario from "../../componentes/Calendario";
import { useEffect, useState } from "react";
import ModalEventosCalendario from "../../componentes/Calendario/ModalEventosCalendario";
import PlanejadorService from "../../services/PlanejadorService";
import AssuntoService from "../../services/AssuntoService";
import Loader from "../../componentes/Loader";
import Alert from "../../componentes/Alert";
import useAlertContext from "../../Hooks/useAlertContext";

const Agendamentos = () => {
    const planejadorService = new PlanejadorService();
    const assuntoService = new AssuntoService();
    const [listaDePlanejadores, setListaDePlanejadores] = useState([]);
    const [listaDeAssuntosDoUsuario, setListaDeAssuntosDoUsuario] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setModalOpen] = useState(false);
    const {setAlertaError, setAlertaSuccess, dadosAlerta} = useAlertContext()
    const [formEventos, setFormEventos] = useState({
        id: null,
        idProva: null,
        idMateria: null,
        start: '',
        end: '',
        title: '',
    });

    useEffect(() => {
        try {
            assuntoService.buscarTodosOsAssuntosDoUsuario().then(response => {
                try {
                    setListaDeAssuntosDoUsuario(response)
                } catch (error) {
                    setIsLoading(false)
                }
                setIsLoading(false);
            })
        } catch (error) {
            setAlertaError(error.response?.data);
        }
    }, [])

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
        limparFormEventos();
    }
    const excluirPlanejamento = async (idEvento) => {
        try {
            const response = await planejadorService.excluirPlanejamento(idEvento);
            if (response.status === 204) {
                setListaDePlanejadores(prevState => prevState.filter(planejador => planejador.id !== idEvento));
                setAlertaSuccess("Planejamento excluído com sucesso!")
            }
        } catch (error) {
            setAlertaError(error.response?.data)
        } finally {
            closeModal();
            limparFormEventos();
        }
    }

    const limparFormEventos = () => {
        setFormEventos({
            id: null,
            idProva: null,
            idMateria: null,
            start: '',
            end: '',
            title: '',
        });
    }

    return (
        <>
            <h1>Agendamentos</h1>
            {
                isLoading ?
                    <Loader $login/>
                    :
                    <Calendario
                        closeModal={closeModal}
                        openModal={openModal}
                        setFormEventos={setFormEventos}
                        setListaDePlanejadores={setListaDePlanejadores}
                        listaDePlanejadores={listaDePlanejadores}
                    />
            }
            <ModalEventosCalendario
                closeModal={closeModal}
                modalIsOpen={open}
                formDefaultValue={formEventos}
                setFormEventos={setFormEventos}
                setListaDePlanejadores={setListaDePlanejadores}
                listaDePlanejadores={listaDePlanejadores}
                listaDeAssuntosDoUsuario={listaDeAssuntosDoUsuario}
                excluirPlanejamento={excluirPlanejamento}
            />
            <Alert
                dados={dadosAlerta}
            />
        </>
    );
}

export default Agendamentos;