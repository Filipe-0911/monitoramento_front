import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormAdicionarAssuntos from "../FormAdicionarAssuntos";
import ModalComponent from "../../../componentes/Modal";

export default function ModalAdicionarAssuntos ({ closeModal, modalIsOpen, prova, idMateria, adicionaAssuntoAMateria, defaultValue }) {
    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal}/>
            <FormAdicionarAssuntos prova={prova} idMateria={idMateria} adicionaAssuntoAMateria={adicionaAssuntoAMateria}/>
        </ModalComponent>
    );
}