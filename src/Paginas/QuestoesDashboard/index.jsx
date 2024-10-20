import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaWpforms, FaEdit } from "react-icons/fa";
import useUserContext from '../../Hooks/useUserContext';
import ModalComponent from '../../componentes/Modal';
import FormQuestao from '../Questionario/componentesQuestionario/FormQuestao';
import { useEffect, useState } from 'react';
import { BotaorCard } from '../../componentes/ComponentesHome';
import { RiCloseLargeFill } from 'react-icons/ri';
import Alert from '../../componentes/Alert';
import useAlertContext from '../../Hooks/useAlertContext';
import {
    CardDashboardEstilizada,
    SectionCardsDashboardEstilizada,
    SectionDashboardEstilizada
} from "./ComponentesDashboardQuestoes"
import MateriasService from '../../services/MateriasService';
import QuestoesService from '../../services/QuestoesService';
import { GiReturnArrow } from "react-icons/gi";
import { useProvaContext } from '../../Hooks/useProvaContext';

const DivEstatisticasQuestoesEstilizada = styled.div`
    width: 20%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid transparent;
    gap: 2em;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.$darkMode ? "var(--bg-cinza-dark-mode)" : "var(--bg-cinza-light-mode)"};


    &:hover {
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
        transform: translate(0, -0.25rem);
        transition: all.2s;
    }
    h3 {
        text-align: center;
    }

    h3, p {
        margin-bottom: 1em;
        font-size: 18px;
    }

    @media (max-width: 820px) {
        width: 50%;
        justify-content: flex-start;

    }

    @media (max-width: 562px) {
        width: 100%;
        padding: 0.3em;
        text-align: left;
    }
`

const DivQueComportaBotoesEEstatisticaEstilizada = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    gap: 1em;
    padding: 1em;

    @media (max-width: 562px) {
        padding: 0;
    }
`

export default function QuestoesDashboard() {
    const params = useParams();
    const navigate = useNavigate();
    const { usuarioPrefereModoDark } = useUserContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalAvisoIsOpen, setModalAvisoIsOpen] = useState(true);
    const { dadosAlerta } = useAlertContext();
    const materiaService = new MateriasService();
    const [nomeDaMateria, setNomeDaMateria] = useState("");

    const [estatisticaDoAssunto, setEstatisticaDoAssunto] = useState(
        {
            idAssunto: 0,
            nome: "",
            questoesFeitas: 0,
            questoesCorretas: 0,
            porcentagem: 0
        }
    );

    const questoesService = new QuestoesService();
    const { prova } = useProvaContext();

    useEffect(() => {
        materiaService.buscaMateriaEspecifica(params.idProva, params.idMateria).then(res => {
            setNomeDaMateria(res.nome)
        }).catch(e => console.log(e));

    }, [])

    function closeModalAviso() {
        setModalAvisoIsOpen(false);
    }

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <SectionDashboardEstilizada>
            <h2 style={{ fontSize: "32px" }}>
                Dashboard de questões
            </h2>
            <h3 style={{ fontSize: "24px" }}>
                {nomeDaMateria}
            </h3>
            <DivQueComportaBotoesEEstatisticaEstilizada>
                <SectionCardsDashboardEstilizada>
                    <CardDashboardEstilizada
                        $darkMode={usuarioPrefereModoDark}
                        onClick={openModal}
                    >
                        <h3>
                            Adicionar Questões
                        </h3>
                        <FaPlus size={32} />
                    </CardDashboardEstilizada>
                    <CardDashboardEstilizada
                        $darkMode={usuarioPrefereModoDark}
                        onClick={() => navigate(`/provas/${params.idProva}/materias/${params.idMateria}/questoes`)}
                    >
                        <h3>
                            Responder Questões
                        </h3>
                        <FaWpforms size={32} />
                    </CardDashboardEstilizada>
                    <CardDashboardEstilizada
                        $darkMode={usuarioPrefereModoDark}
                        onClick={() => navigate(`/provas/${params.idProva}/materias/${params.idMateria}/editar-questoes`)}
                    >
                        <h3>
                            Editar ou Excluir Questões
                        </h3>
                        <FaEdit size={32} />
                    </CardDashboardEstilizada>
                    <CardDashboardEstilizada
                        $darkMode={usuarioPrefereModoDark}
                        onClick={() => navigate(-1)}
                    >
                        <h3>
                            Voltar
                        </h3>
                        <GiReturnArrow size={32} />
                    </CardDashboardEstilizada>
                </SectionCardsDashboardEstilizada>
            </DivQueComportaBotoesEEstatisticaEstilizada>
            <ModalComponent modalIsOpen={modalAvisoIsOpen} closeModal={closeModalAviso} >
                <div style={{ width: "100%" }}>
                    <BotaorCard $type="excluir" onClick={closeModalAviso} style={{ position: "fixed", right: "0px" }}>
                        <RiCloseLargeFill />
                    </BotaorCard>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "10px",
                    justifyContent: "center",
                    padding: "2em",
                    gap: "3em",
                    maxWidth: "600px"
                }}>
                    <h3 style={{ fontSize: "24px", color: "red" }}>
                        IMPORTANTE
                    </h3>
                    <p style={{ fontSize: "20px" }}>
                        Ao adicionar questões, é importante informar a qual assunto esta questão se refere para que seja contabilizada automaticamente a estatistica referente a esta questão quando for respondida!
                    </p>
                </div>
            </ModalComponent>
            <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <BotaorCard $type="excluir" onClick={closeModal}>
                        <RiCloseLargeFill />
                    </BotaorCard>
                </div>
                <FormQuestao closeModal={closeModal} />
            </ModalComponent>
            <Alert dados={dadosAlerta} />
        </SectionDashboardEstilizada>
    )
}