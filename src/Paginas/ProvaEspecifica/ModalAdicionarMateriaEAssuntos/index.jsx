import ModalComponent from "../../../componentes/Modal";
import { BotaorCard } from "../../../componentes/ComponentesHome";
import { MdCancel } from "react-icons/md";
import FormAdicionarMaterias from "../FormAdicionarMaterias";
import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";

export default function ModalAdicionarMateriasEAssuntos({ modalIsOpen, closeModal, quantidadeDeInputs, adicionaMateria, handleChanger }) {
    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal}/>
            <FormAdicionarMaterias
                quantidadeDeInputs={quantidadeDeInputs}
                adicionaMateria={adicionaMateria}
                handleChanger={handleChanger}
            />
        </ModalComponent>
    );
}