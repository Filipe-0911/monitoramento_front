import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import ModalComponent from "../../../componentes/Modal";
import { BotaorCard } from "../../ComponentesHome";
import FormularioEventos from "../FormularioEventos";

export default function ModalEventosCalendario({ closeModal, modalIsOpen, formDefaultValue, setFormEventos, setListaDePlanejadores, listaDeAssuntosDoUsuario, listaDePlanejadores, excluirPlanejamento, setAlertSuccess, setAlertError }) {
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
                setAlertError={setAlertError}
                setAlertSuccess={setAlertSuccess}
            />
            {
                formDefaultValue.id !== null ? 
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1em'}}>
                    <BotaorCard $type="excluir" onClick={() => excluirPlanejamento(formDefaultValue.id)}>
                        Excluir planejamento
                    </BotaorCard>
                </div>
                : null  // Caso o planejamento seja novo, não aparece o botão de exclusão.
            }

        </ModalComponent>
    );
}