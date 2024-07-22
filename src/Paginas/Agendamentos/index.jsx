import Calendario from "../../componentes/Calendario";
import Cabecalho from "../../componentes/Cabecalho";
import { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import styled from "styled-components";
import ModalEventosCalendario from "../../componentes/Calendario/ModalEventosCalendario";
import PlanejadorService from "../../services/PlanejadorService";
import AssuntoService from "../../services/AssuntoService";
import Loader from "../../componentes/Loader";

const MainCalendarioEstilizada = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5em 0;
    padding: 0 1em;
    width: 100%;
    min-height: 73.5vh;
`

const Agendamentos = () => {
    const planejadorService = new PlanejadorService();
    const assuntoService = new AssuntoService();
    const [listaDePlanejadores, setListaDePlanejadores] = useState([]);
    const [listaDeAssuntosDoUsuario, setListaDeAssuntosDoUsuario] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setModalOpen] = useState(false);

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
                .catch(e => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const [formEventos, setFormEventos] = useState({
        id: null,
        idProva: null,
        idMateria: null,
        start: '',
        end: '',
        title: '',
    });

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const excluirPlanejamento = async (idEvento) => {
        try {
            planejadorService.excluirPlanejamento(idEvento).then(response => {
                console.log(response.status)
                setListaDePlanejadores(prevState => prevState.filter(planejador => planejador.id!== idEvento));
            })
        } catch (error) {
            alert(error.message)
        } finally {
            closeModal();
            setFormEventos({
                id: null,
                idProva: null,
                idMateria: null,
                start: '',
                end: '',
                title: '',
            })
        }
    }
    

    return (
        <>
            <Cabecalho />
            <MainCalendarioEstilizada>
                <h1>Agendamentos</h1>
                {
                    isLoading ?
                        <Loader/>
                        :
                        <Calendario
                            closeModal={closeModal}
                            openModal={openModal}
                            setFormEventos={setFormEventos}
                            setListaDePlanejadores={setListaDePlanejadores}
                            listaDePlanejadores={listaDePlanejadores}
                        /> 
                    }
            </MainCalendarioEstilizada>
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
            <Footer />
        </>
    );
}

export default Agendamentos;