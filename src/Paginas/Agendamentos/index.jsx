import Calendario from "../../componentes/Calendario";
import { useEffect, useState } from "react";
import ModalEventosCalendario from "../../componentes/Calendario/ModalEventosCalendario";
import PlanejadorService from "../../services/PlanejadorService";
import AssuntoService from "../../services/AssuntoService";
import Loader from "../../componentes/Loader";
import Alert from "../../componentes/Alert";

const Agendamentos = () => {
    const planejadorService = new PlanejadorService();
    const assuntoService = new AssuntoService();
    const [listaDePlanejadores, setListaDePlanejadores] = useState([]);
    const [listaDeAssuntosDoUsuario, setListaDeAssuntosDoUsuario] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setModalOpen] = useState(false);
    const [alertIsOpen, setAlertIsOpen] = useState({ success: false, error: false, message: "" });
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
            setIsLoading(true)
            assuntoService.buscarTodosOsAssuntosDoUsuario().then(response => {
                try {
                    setListaDeAssuntosDoUsuario(response)

                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                }
                setIsLoading(false);
            })
        } catch (error) {
            setAlertError(error.response?.data);
        }
    }, [])

    const setAlertSuccess = (message) => {
        setAlertIsOpen({ success: true, error: false, message: message });
        setTimeout(() => {
            setAlertIsOpen({ success: false, error: false, message: "" });
        }, 5000);
    }
    const setAlertError = (message) => {
        setAlertIsOpen({ success: false, error: true, message: message });
        setTimeout(() => {
            setAlertIsOpen({ success: false, error: false, message: "" });
        }, 5000);
    }


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
                setAlertSuccess("Planejamento excluído com sucesso!")
            }

        } catch (error) {
            setAlertError(error.response?.data)
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
                    <Loader />
                    :
                    <Calendario
                        closeModal={closeModal}
                        openModal={openModal}
                        setFormEventos={setFormEventos}
                        setListaDePlanejadores={setListaDePlanejadores}
                        listaDePlanejadores={listaDePlanejadores}
                        setAlertError={setAlertError}
                        setAlertSuccess={setAlertSuccess}
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
                setAlertSuccess={setAlertSuccess}
                setAlertError={setAlertError}
            />
            <Alert
                dados={alertIsOpen}
            />
        </>
    );
}

export default Agendamentos;