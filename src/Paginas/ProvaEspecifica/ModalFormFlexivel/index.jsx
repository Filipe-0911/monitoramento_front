import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormAdicionarAssuntos from "../FormAdicionarAssuntos";
import FormAdicionarMaterias from "../FormAdicionarMaterias";
import FormAdicionarQuestoes from "../FormAdicionarQuestoes";
import FormEditarAssuntos from "../FormEditarAssuntos";
import FormEditarMaterias from "../FormEditarMaterias";

import ModalComponent from "../../../componentes/Modal";

export default function ModalFormFlexivel(
    {
        closeModal,
        modalIsOpen,
        adicionaMateria,
        adicionarAssunto,
        retornaValoresAssunto,
        alterarAssunto,
        adicionarQuestoesAoAssunto,
        editarMateria,
        acaoUsuario
    }
) {
    return (
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <DivBotaoFecharModal closeModal={closeModal} />
            {
                acaoUsuario === "adicionar_materia" ?
                <FormAdicionarMaterias
                    adicionaMateria={adicionaMateria}
                />
                :
                acaoUsuario === "editar_materia" ?
                <FormEditarMaterias
                    editarMateria={editarMateria}
                />
                :
                acaoUsuario === "adicionar_assunto" ?
                <FormAdicionarAssuntos 
                    adicionarAssunto={adicionarAssunto}
                />
                :
                acaoUsuario === "editar_assunto" ? 
                <FormEditarAssuntos 
                retornaValoresAssunto={retornaValoresAssunto} 
                aoEnviar={alterarAssunto}
                />
                :
                acaoUsuario === "adicionar_questao" ? 
                <FormAdicionarQuestoes
                    adicionarQuestoesAoAssunto={adicionarQuestoesAoAssunto}
                />
                : null
            }
        </ModalComponent>
    );
}