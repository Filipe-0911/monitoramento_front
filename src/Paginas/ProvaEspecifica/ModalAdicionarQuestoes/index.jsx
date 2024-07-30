import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormAdicionarQuestoes from "../FormAdicionarQuestoes";
import ModalComponent from "../../../componentes/Modal";

export default function ModalAdicionarQuestoes ({ closeModal, modalIsOpen, adicionarQuestoesAoAssunto }) {
    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal}/>
            <FormAdicionarQuestoes adicionarQuestoesAoAssunto={adicionarQuestoesAoAssunto}/>
        </ModalComponent>
    );
}