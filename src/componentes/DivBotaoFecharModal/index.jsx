import styled from "styled-components"
import { BotaorCard } from "../ComponentesHome";
import { RiCloseLargeFill } from "react-icons/ri";

const DivEstilizadaParaBotaoDeFecharModal = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    
`

const StyledBotaoCard = styled(BotaorCard)`
    
    @media (max-width: 562px) {
        max-width: 100px;
        min-width: 0;
    }
`
export default function DivBotaoFecharModal({ closeModal }) {
    return (
        <DivEstilizadaParaBotaoDeFecharModal>
            <StyledBotaoCard $type="excluir" onClick={closeModal}>
                <RiCloseLargeFill />
            </StyledBotaoCard>
        </DivEstilizadaParaBotaoDeFecharModal>
    );

}