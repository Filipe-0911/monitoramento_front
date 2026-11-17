import DivBotaoFecharModal from "../../../componentes/DivBotaoFecharModal";
import FormAdicionarAssuntos from "../FormAdicionarAssuntos";
import FormAdicionarMaterias from "../FormAdicionarMaterias";
import FormAdicionarQuestoes from "../FormAdicionarQuestoes";
import FormEditarAssuntos from "../FormEditarAssuntos";
import FormEditarMaterias from "../FormEditarMaterias";
import FormEstudos from "../FormEstudos";

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
        adicionarEstudoAoAssunto,
        editarEstudoDoAssunto,
        excluirEstudoDoAssunto,
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
                :
                acaoUsuario === "gerenciar_estudos" ?
                <FormEstudos
                    retornaValoresAssunto={retornaValoresAssunto}
                    adicionarEstudoAoAssunto={adicionarEstudoAoAssunto}
                    editarEstudoDoAssunto={editarEstudoDoAssunto}
                    excluirEstudoDoAssunto={excluirEstudoDoAssunto}
                />
                : null
            }
        </ModalComponent>
    );
}