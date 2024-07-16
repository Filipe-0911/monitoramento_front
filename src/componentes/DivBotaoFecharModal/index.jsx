import styled from "styled-components"
import { BotaorCard } from "../ComponentesHome";
import { MdCancel } from "react-icons/md";

const DivEstilizadaParaBotaoDeFecharModal = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`
export default function DivBotaoFecharModal({ closeModal }) {
    return (
        <DivEstilizadaParaBotaoDeFecharModal>
            <BotaorCard $type="excluir" onClick={closeModal}>
                <MdCancel />
            </BotaorCard>
        </DivEstilizadaParaBotaoDeFecharModal>
    );

}