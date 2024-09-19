import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaWpforms, FaEdit } from "react-icons/fa";
import useUserContext from '../../Hooks/useUserContext';
import ModalComponent from '../../componentes/Modal';
import FormQuestao from '../Questionario/componentesQuestionario/FormQuestao';
import { useState } from 'react';
import { BotaorCard } from '../../componentes/ComponentesHome';
import { RiCloseLargeFill } from 'react-icons/ri';
import Alert from '../../componentes/Alert';
import useAlertContext from '../../Hooks/useAlertContext';
import { 
    CardDashboardEstilizada, 
    SectionCardsDashboardEstilizada, 
    SectionDashboardEstilizada } from "./ComponentesDashboardQuestoes"

export default function QuestoesDashboard() {
    const params = useParams();
    const navigate = useNavigate();
    const { usuarioPrefereModoDark } = useUserContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { dadosAlerta } = useAlertContext();
    
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
            <Alert dados={dadosAlerta} />
        </SectionDashboardEstilizada>
    )
}