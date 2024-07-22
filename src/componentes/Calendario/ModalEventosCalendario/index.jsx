import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import ModalComponent from "../../../componentes/Modal";
import { BotaorCard } from "../../ComponentesHome";
import FormularioEventos from "../FormularioEventos";

export default function ModalEventosCalendario({ closeModal, modalIsOpen, formDefaultValue, setFormEventos, setListaDePlanejadores, listaDeAssuntosDoUsuario, listaDePlanejadores, excluirPlanejamento }) {
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
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1em'}}>
                <BotaorCard $type="excluir" onClick={() => excluirPlanejamento(formDefaultValue.id)}>
                    Excluir planejamento
                </BotaorCard>
            </div>

        </ModalComponent>
    );
}