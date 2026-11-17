import { useContext } from "react";
import { ProvaContext } from "../../Context/ProvaProvider";
import {
    ADICIONAR_PROVA,
    ADICIONAR_ASSUNTO,
    ADICIONAR_MATERIA,
    ADICIONAR_QUESTAO,
    EXCLUIR_ASSUNTO,
    EXCLUIR_MATERIA,
    EDITAR_ASSUNTO,
    EDITAR_MATERIA,
    ADICIONAR_ESTUDO,
    EDITAR_ESTUDO,
    EXCLUIR_ESTUDO
} from "../../Paginas/ProvaEspecifica/reducer";

export const useProvaContext = () => {
    const {
        prova,
        dispatcher,
        quantidadeDeInputs,
        setQuantidadeDeInputs,
        idMateria,
        setIdMateria,
        idAssunto,
        setIdAssunto,
        verificaSePodeAdicionarInputAssunto,
    } = useContext(ProvaContext);

    const addProva = (prova) => {
        dispatcher({ type: ADICIONAR_PROVA, prova: prova });
    };
    const delAssunto = ({ dadosParaAlteracao }) => {
        dispatcher({ type: EXCLUIR_ASSUNTO, dadosParaAlteracao });
    };
    const updateAssunto = ({ dadosParaAlteracao }) => { 
        dispatcher({ type: EDITAR_ASSUNTO, dadosParaAlteracao });
    };
    const addAssunto = ({ dadosParaAlteracao }) => {
        dispatcher({ type: ADICIONAR_ASSUNTO, dadosParaAlteracao });
    };
    const addQuestao = ({ dadosParaAlteracao }) => {
        dispatcher({ type: ADICIONAR_QUESTAO, dadosParaAlteracao });
    };
    const addMateria = ({ dadosParaAlteracao }) => {
        dispatcher({ type: ADICIONAR_MATERIA, dadosParaAlteracao });
    }
    const delMateria = ({ dadosParaAlteracao }) => {
        dispatcher({ type: EXCLUIR_MATERIA, dadosParaAlteracao });
    };
    const updateMateria = ({ dadosParaAlteracao }) => {
        dispatcher({ type: EDITAR_MATERIA, dadosParaAlteracao });
    };
    const addEstudo = ({ dadosParaAlteracao }) => {
        dispatcher({ type: ADICIONAR_ESTUDO, dadosParaAlteracao });
    };
    const updateEstudo = ({ dadosParaAlteracao }) => {
        dispatcher({ type: EDITAR_ESTUDO, dadosParaAlteracao });
    };
    const delEstudo = ({ dadosParaAlteracao }) => {
        dispatcher({ type: EXCLUIR_ESTUDO, dadosParaAlteracao });
    };

    return {
        addProva,
        delAssunto,
        updateAssunto,
        addAssunto,
        addQuestao,
        addMateria,
        delMateria,
        updateMateria,
        addEstudo,
        updateEstudo,
        delEstudo,
        prova,
        quantidadeDeInputs,
        setQuantidadeDeInputs,
        idMateria,
        setIdMateria,
        idAssunto,
        setIdAssunto,
        verificaSePodeAdicionarInputAssunto,
    }

}
