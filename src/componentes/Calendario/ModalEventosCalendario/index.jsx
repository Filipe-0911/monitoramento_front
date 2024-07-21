import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import ModalComponent from "../../../componentes/Modal";
import FormularioEventos from "../FormularioEventos";

export default function ModalEventosCalendario({ closeModal, modalIsOpen, formDefaultValue, setFormEventos, setListaDePlanejadores, listaDeAssuntosDoUsuario, listaDePlanejadores }) {
    return (
        <ModalComponent
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
        >
            <DivBotaoFecharModal
                closeModal={closeModal}
            />
            <FormularioEventos 
                formDefaultValue={formDefaultValue}
                setFormEventos={setFormEventos}
                closeModal={closeModal}
                setListaDePlanejadores={setListaDePlanejadores}
                listaDeAssuntosDoUsuario={listaDeAssuntosDoUsuario}
                listaDePlanejadores={listaDePlanejadores}
            />

        </ModalComponent>
    );
}