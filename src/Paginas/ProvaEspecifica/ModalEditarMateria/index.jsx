import ModalComponent from "../../../componentes/Modal";
import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormEditarMaterias from "../FormEditarMaterias";

export default function ModalEditarMateria({ modalIsOpen, closeModal, editarMateria }) {
    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal}/>
            <FormEditarMaterias
                editarMateria={editarMateria}
            />
        </ModalComponent>
    );
}