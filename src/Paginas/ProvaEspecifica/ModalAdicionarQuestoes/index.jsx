import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormAdicionarQuestoes from "../FormAdicionarQuestoes";
import ModalComponent from "../../../componentes/Modal";

export default function ModalAdicionarQuestoes ({ closeModal, modalIsOpen, prova, idMateria, adicionarQuestoesAoAssunto }) {
    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal}/>
            <FormAdicionarQuestoes prova={prova} idMateria={idMateria} adicionarQuestoesAoAssunto={adicionarQuestoesAoAssunto}/>
        </ModalComponent>
    );
}