import styled from "styled-components"
import { BotaorCard } from "../ComponentesHome";
import { MdCancel } from "react-icons/md";

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
                <MdCancel />
            </StyledBotaoCard>
        </DivEstilizadaParaBotaoDeFecharModal>
    );

}