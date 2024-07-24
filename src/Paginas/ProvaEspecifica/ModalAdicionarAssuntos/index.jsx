import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormAdicionarAssuntos from "../FormAdicionarAssuntos";
import ModalComponent from "../../../componentes/Modal";

export default function ModalAdicionarAssuntos ({ closeModal, modalIsOpen, adicionarAssunto }) {
    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal}/>
            <FormAdicionarAssuntos adicionarAssunto={adicionarAssunto}/>
        </ModalComponent>
    );
}