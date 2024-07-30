import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormEditarAssuntos from "../FormEditarAssuntos";
import ModalComponent from "../../../componentes/Modal";

export default function ModalEditarAssuntos({ closeModal, modalIsOpen, adicionaAssuntoAMateria, defaultValue, retornaValoresAssunto, aoEnviar }) {

    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal} />
            <FormEditarAssuntos
                adicionaAssuntoAMateria={adicionaAssuntoAMateria}
                defaultValue={defaultValue}
                retornaValoresAssunto={retornaValoresAssunto}
                aoEnviar={aoEnviar}
            />
        </ModalComponent>
    );
}