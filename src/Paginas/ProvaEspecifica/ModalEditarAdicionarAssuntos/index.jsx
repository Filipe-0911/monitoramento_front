import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormEditarAdicionarAssuntos from "../FormEditarAdicionarAssuntos";
import ModalComponent from "../../../componentes/Modal";

export default function ModalEditarAdicionarAssuntos ({ closeModal, quantidadeDeInputs, adicionaMateria, handleChanger, setInput, modalIsOpen }) {
    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal}/>
            <FormEditarAdicionarAssuntos
                quantidadeDeInputs={quantidadeDeInputs}
                adicionaMateria={adicionaMateria}
                handleChanger={handleChanger}
                setInput={setInput}
            />
        </ModalComponent>
    );
}