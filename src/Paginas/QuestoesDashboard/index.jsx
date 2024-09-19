import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaWpforms, FaEdit } from "react-icons/fa";
import useUserContext from '../../Hooks/useUserContext';
import ModalComponent from '../../componentes/Modal';
import FormQuestao from '../Questionario/componentesQuestionario/FormQuestao';
import { useState } from 'react';
import { BotaorCard } from '../../componentes/ComponentesHome';
import { RiCloseLargeFill } from 'react-icons/ri';

const SectionDashboardEstilizada = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;

    @media (max-width:562px) {
        align-items: center;
    }
`

const SectionCardsDashboardEstilizada = styled.section`
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    @media (max-width: 562px) {
        flex-direction: column;
        justify-content: center;
        gap: 1em;
    }
`

const CardDashboardEstilizada = styled.div`
    width: 20%;
    padding: 1em;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    gap: 2em;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.$darkMode ? "var(--bg-cinza-dark-mode)" : "var(--bg-cinza-light-mode)"};

    h3 {
        margin-bottom: 1em;
        text-align: center;
    }

    @media (max-width: 820px) {
        width: 100%;
    }

    @media (max-width: 562px) {
        width: 100%;
    }
`

export default function QuestoesDashboard() {
    const params = useParams();
    const navigate = useNavigate();
    const { usuarioPrefereModoDark } = useUserContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal () {
        setModalIsOpen(true);
    }

    function closeModal () {
        setModalIsOpen(false);
    }

    return (
        <SectionDashboardEstilizada>
            <h2>
                Questões Dashboard
            </h2>
            <SectionCardsDashboardEstilizada>
                <CardDashboardEstilizada $darkMode={usuarioPrefereModoDark} onClick={openModal}>
                    <h3>
                        Adicionar Questões
                    </h3>
                    <FaPlus size={32} />
                </CardDashboardEstilizada>
                <CardDashboardEstilizada $darkMode={usuarioPrefereModoDark} onClick={() => navigate(`/provas/${params.idProva}/materias/${params.idMateria}/questoes`)}>
                    <h3>
                        Responder Questões
                    </h3>
                    <FaWpforms size={32} />
                </CardDashboardEstilizada>
                <CardDashboardEstilizada $darkMode={usuarioPrefereModoDark}>
                    <h3>
                        Editar Questões
                    </h3>
                    <FaEdit size={32} />
                </CardDashboardEstilizada>
            </SectionCardsDashboardEstilizada>

            <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <div style={{ width: "100%", display:"flex", justifyContent: "flex-end" }}>
                    <BotaorCard $type="excluir" onClick={closeModal}>
                        <RiCloseLargeFill />
                    </BotaorCard>
                </div>
                <FormQuestao />
            </ModalComponent>
        </SectionDashboardEstilizada>
    )
}
