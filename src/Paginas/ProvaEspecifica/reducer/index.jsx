export const ADICIONAR_PROVA = "adicionar_prova";
export const ADICIONAR_QUESTAO = "adicionar_questao";
export const ADICIONAR_ASSUNTO = "adicionar_assunto";
export const ADICIONAR_MATERIA = "adicionar_materia";
export const EXCLUIR_ASSUNTO = "excluir_assunto";
export const EXCLUIR_MATERIA = "excluir_materia";
export const EDITAR_ASSUNTO = "editar_assunto";
export const EDITAR_MATERIA = "editar_materia";
export const ADICIONAR_ESTUDO = "adicionar_estudo";
export const EDITAR_ESTUDO = "editar_estudo";
export const EXCLUIR_ESTUDO = "excluir_estudo";

export default function reducer(estado, acao) {
    switch (acao.type) {
        case ADICIONAR_PROVA:
            return acao.prova;
        case EXCLUIR_ASSUNTO:
            return excluirAssunto(estado, acao.dadosParaAlteracao);
        case EDITAR_ASSUNTO:
            return editarAssunto(estado, acao.dadosParaAlteracao);
        case ADICIONAR_ASSUNTO:
            return adicionarAssunto(estado, acao.dadosParaAlteracao);
        case ADICIONAR_QUESTAO:
            return adicionarQuestoesAoAssunto(estado, acao.dadosParaAlteracao);
        case EDITAR_MATERIA:
            return editarMateria(estado, acao.dadosParaAlteracao);
        case EXCLUIR_MATERIA:
            return excluirMateria(estado, acao.dadosParaAlteracao);
        case ADICIONAR_MATERIA:
            return adicionarMateria(estado, acao.dadosParaAlteracao);
        case ADICIONAR_ESTUDO:
            return adicionarEstudoAoAssunto(estado, acao.dadosParaAlteracao);
        case EDITAR_ESTUDO:
            return editarEstudoDoAssunto(estado, acao.dadosParaAlteracao);
        case EXCLUIR_ESTUDO:
            return excluirEstudoDoAssunto(estado, acao.dadosParaAlteracao);
        default:
            break;
    }
}

const excluirAssunto = (prova, { idAssunto, idMateria }) => {
    return {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.map(materia =>
            materia.id === idMateria
                ? { ...materia, listaDeAssuntos: materia.listaDeAssuntos.filter(assunto => assunto.id !== idAssunto) }
                : materia
        )
    };
};
const editarAssunto = (prova, { assuntoAlterado }) => {
   return {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.map(materia =>
            materia.id === assuntoAlterado.idMateria
                ? {
                    ...materia,
                    listaDeAssuntos: materia.listaDeAssuntos.map(assunto =>
                        assunto.id === assuntoAlterado.id
                            ? assuntoAlterado
                            : assunto
                    )
                }
                : materia)
    };
}
const adicionarAssunto = (prova, { assunto }) => {
    return  {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.map(materia =>
            materia.id === assunto.idMateria
                ? { ...materia, listaDeAssuntos: [...materia.listaDeAssuntos, assunto] }
                : materia
        )
    }
}
const adicionarQuestoesAoAssunto = (prova, { idAssunto, idMateria, questao}) => {
    return {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.map(materia =>
            materia.id === idMateria
                ? {
                    ...materia,
                    listaDeAssuntos: materia.listaDeAssuntos.map(assunto =>
                        assunto.id === idAssunto
                            ? {
                                ...assunto,
                                idQuestoes: [...assunto.idQuestoes, questao.id]
                            }
                            : assunto
                    )
                }
                : materia
        )
    }
}
const editarMateria = (prova, { idMateria, dados}) => {
    return {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.map(materia =>
            materia.id === idMateria
                ? { ...materia, nome: dados.nome }
                : materia
        )
    }
}
const excluirMateria = (prova, { idMateria }) => {
    return {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.filter(materia => materia.id !== idMateria)
    }
}
const adicionarMateria = (prova, novaMateria ) => {
    return { ...prova, listaDeMaterias: [...prova.listaDeMaterias, novaMateria] }
}

const adicionarEstudoAoAssunto = (prova, { idAssunto, idMateria, estudo }) => {
    return {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.map(materia =>
            materia.id === idMateria
                ? {
                    ...materia,
                    listaDeAssuntos: materia.listaDeAssuntos.map(assunto =>
                        assunto.id === idAssunto
                            ? {
                                ...assunto,
                                listaDeEstudos: [...(assunto.listaDeEstudos || []), estudo]
                            }
                            : assunto
                    )
                }
                : materia
        )
    };
}

const editarEstudoDoAssunto = (prova, { idAssunto, idMateria, estudoAlterado }) => {
    return {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.map(materia =>
            materia.id === idMateria
                ? {
                    ...materia,
                    listaDeAssuntos: materia.listaDeAssuntos.map(assunto =>
                        assunto.id === idAssunto
                            ? {
                                ...assunto,
                                listaDeEstudos: (assunto.listaDeEstudos || []).map(estudo =>
                                    estudo.id === estudoAlterado.id ? estudoAlterado : estudo
                                )
                            }
                            : assunto
                    )
                }
                : materia
        )
    };
}

const excluirEstudoDoAssunto = (prova, { idAssunto, idMateria, idEstudo }) => {
    return {
        ...prova,
        listaDeMaterias: prova.listaDeMaterias.map(materia =>
            materia.id === idMateria
                ? {
                    ...materia,
                    listaDeAssuntos: materia.listaDeAssuntos.map(assunto =>
                        assunto.id === idAssunto
                            ? {
                                ...assunto,
                                listaDeEstudos: (assunto.listaDeEstudos || []).filter(estudo => estudo.id !== idEstudo)
                            }
                            : assunto
                    )
                }
                : materia
        )
    };
}