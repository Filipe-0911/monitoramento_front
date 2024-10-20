import styled from "styled-components"
import { BotaorCard } from "../ComponentesHome";
import { RiCloseLargeFill } from "react-icons/ri";

const DivEstilizadaParaBotaoDeFecharModal = styled.div`
    position: fixed;
    top: 0;
    right: 3px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    
`

export default function DivBotaoFecharModal({ closeModal }) {
    return (
        <DivEstilizadaParaBotaoDeFecharModal>
            <BotaorCard $type="fechar" onClick={closeModal}>
                <RiCloseLargeFill />
            </BotaorCard>
        </DivEstilizadaParaBotaoDeFecharModal>
    );

}