import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";

import ProvasService from "../../services/Provas";
import DataService from "../../services/DataService";
import MateriasService from "../../services/MateriasService";

import { SectionProvasEstilizada } from "../Provas";

import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import PaginaEspecifaNotFound from "../ProvaEspecificaNotFound";
import BotaoEstilizado from "../../componentes/Botao";

import AccordionAssunto from "./AccordionAssunto";
import ModalAdicionarMateriasEAssuntos from "./ModalAdicionarMateriaEAssuntos";
import ModalAdicionarAssuntos from "./ModalAdicionarAssuntos";
import AssuntoService from "../../services/AssuntoService";
import ModalEditarAssuntos from "./ModalEditarAssuntos";
import ModalAdicionarQuestoes from "./ModalAdicionarQuestoes";
import QuestoesService from "../../services/QuestoesService";
import ModalEditarMateria from "./ModalEditarMateria";
import GraficosRendimentoAssuntos from "../../componentes/GraficosRendimentoAssuntos";
import Footer from "../../componentes/Footer";
import Loader from "../../componentes/Loader";
import Alert from "../../componentes/Alert";
import reducer, {
    ADICIONAR_PROVA,
    EXCLUIR_ASSUNTO,
    EDITAR_ASSUNTO,
    ADICIONAR_ASSUNTO,
    ADICIONAR_QUESTAO,
    EDITAR_MATERIA,
    EXCLUIR_MATERIA,
    ADICIONAR_MATERIA
} from "./reducer";

export const DivBotoesCrudMateria = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;

    @media (max-width: 820px) {
        flex-direction: column;
        align-items: center;
        gap: 1em;
        justify-content: space-between;
    }
    @media (max-width: 562px) {
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        justify-content: space-between;
    }
`;

const DivEstilizadaProvaEspecífica = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 1em 0;

    span {
        width: 25%;
        font-size: 22px;
    }

    @media (max-width: 562px) {
        span {
            width: 100%;
        }
    }
`;

const ProvaEspecifica = () => {
    const dataService = new DataService();
    const provaService = new ProvasService();
    const materiasService = new MateriasService();
    const assuntoService = new AssuntoService();
    const questoesService = new QuestoesService();

    const parametros = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState(null);
    const [acaoDoUsuario, setAcaoDoUsuario] = useState("");

    const [quantidadeDeInputs, setQuantidadeDeInputs] = useState([]);

    const [modalMateriaEAssuntoIsOpen, setModalMateriaEAssuntoIsOpen] = useState(false);
    const [modalAssuntosIsOpen, setModalAssuntosIsOpen] = useState(false);
    const [modalEditarAssuntoIsOpen, setModalEditarAssuntoIsOpen] = useState(false);

    const [idMateria, setIdMateria] = useState(null);
    const [idAssunto, setIdAssunto] = useState(null);

    const [modalQuestoesIsOpen, setModalQuestoesIsOpen] = useState(false);
    const [modalEditarMateriaIsOpen, setModalEditarMateriaIsOpen] = useState(false);

    const [alerta, setAlerta] = useState({ success: false, error: false, message: "" });

    const [prova, dispatcher] = useReducer(reducer, {});

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id)
            .then(res => {
                if (res.request && res.request.status === 404) {
                    setIsLoading(false);
                    return;
                } else {
                    setIsLoading(false);
                    dispatcher({ tipo: ADICIONAR_PROVA, prova: res })
                    setForm({ idProva: res.id, nome: "", listaDeAssuntos: [] });
                }
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [parametros.id]);

    useEffect(() => {
        switch (acaoDoUsuario) {
            case ADICIONAR_ASSUNTO:
                setModalAssuntosIsOpen(true); 
                break;
            case EXCLUIR_ASSUNTO:
                excluirAssunto();
                break;
            case EDITAR_ASSUNTO:
                setModalEditarAssuntoIsOpen(true);
                break;
            case ADICIONAR_QUESTAO:
                pegaValoresAssuntoParaEnviarQuestoes()
                break;
            case EDITAR_MATERIA:
                setModalEditarMateriaIsOpen(true);
                break;
            default:
                break;
        }

        setAcaoDoUsuario('');

    }, [acaoDoUsuario]);

    const openModal = () => {
        setModalMateriaEAssuntoIsOpen(true);
    };
    const closeModal = () => {
        setModalMateriaEAssuntoIsOpen(false);
    };

    const closeModalAssuntos = () => {
        setModalAssuntosIsOpen(false);
    };

    const closeModalEditarAssuntos = () => {
        setModalEditarAssuntoIsOpen(false);
    };

    const closeModalQuestoes = () => {
        setModalQuestoesIsOpen(false);
    };

    const closeModalEditarMateria = () => {
        setModalEditarMateriaIsOpen(false);
    };

    const setAlertaSuccess = (msg) => {
        setAlerta({ success: true, error: false, message: msg })
        setTimeout(() => {
            setAlerta({ success: false, error: false, message: "" });
        }, 5000);
    };
    const setAlertaError = (msg) => {
        setAlerta({ success: false, error: true, message: msg })
        setTimeout(() => {
            setAlerta({ success: false, error: false, message: "" });
        }, 5000);
    };

    
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [name]: value };
            aoDigitar(updatedForm);
            return updatedForm;
        });
    };

    const aoDigitar = (form) => {
        const novoAssunto = { nome: '', quantidadePdf: 0 };
        const lista = [];
        let indexDoInput = 0;

        for (const key in form) {
            if (key.includes('quantidade_input')) {
                const [quantidade, input, index] = key.split('_');
                indexDoInput = parseInt(index);
                novoAssunto.quantidadePdf = parseInt(form[key]);
            }
            if (key.includes('nome_assunto')) {
                const [nome, assunto, index] = key.split('_');
                indexDoInput = parseInt(index);
                novoAssunto.nome = form[key];
            }
        }

        if (novoAssunto.nome !== '') lista[indexDoInput] = novoAssunto;
        
        setForm(prevState => ({ ...prevState, listaDeAssuntos: lista }));
    };
    
    if (prova === null) {
        return <PaginaEspecifaNotFound erro="Prova não encontrada" />;
    }
    const limparFormulario = () => {
        setForm({ idProva: prova.id });
        setQuantidadeDeInputs([]);
        closeModal();
    }

    const capturaCliqueBotaoUsuario = (event, idAssunto = null) => {
        let nomeBotao = event.target.name;
        let divPrincipal = event.target.parentNode.parentNode;
        let idMateria;

        if (event.target.localName === "path") {
            divPrincipal = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            nomeBotao = event.target.parentNode.parentNode.name
        }

        if (event.target.localName === "svg") {
            divPrincipal = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            nomeBotao = event.target.parentNode.name
        }

        if (nomeBotao === "excluir_assunto" || nomeBotao === "editar_assunto" || "adicionar_questao") {
            idMateria = divPrincipal.parentNode.parentNode.querySelector("#idMateria").value;
            setIdAssunto(idAssunto !== null ? idAssunto : null);
        } else {
            idMateria = divPrincipal.querySelector("#idMateria").value;
        }

        setIdMateria(parseInt(idMateria));
        setAcaoDoUsuario(nomeBotao);
    };
    
    const retornaValoresAssunto = () => {
        let assuntoEncontrado = null;
        prova.listaDeMaterias.forEach(materia => {
            materia.listaDeAssuntos.find(assunto => {
                if (assunto.id === idAssunto) {
                    assuntoEncontrado = assunto;
                    return true;
                }
            });
        });
        return assuntoEncontrado;
    };

    const pegaValoresAssuntoParaEnviarQuestoes = () => {
        const assunto = retornaValoresAssunto();

        if (assunto) {
            setModalQuestoesIsOpen(true);
            setIdAssunto(assunto.id);
        } else {
            setAlertaError("Escolha um assunto para adicionar questões.");
        }
    }
    
    const excluirMateria = async (idMateria) => {
        try {
            const response = await materiasService.deletaMateria(prova.id, idMateria);
            if (response.status === 200) {
                
                dispatcher({
                    tipo: EXCLUIR_MATERIA,
                    dadosParaAlteracao: {
                        idProva: prova.id,
                        idMateria: idMateria
                    }
                })
                setAlertaSuccess("Matéria excluída com sucesso!");
            }
        } catch (error) {
            setAlertaError("Erro ao excluir matéria!");
        }

    };

    const excluirAssunto = async () => {
        try {
            let dadosParaExclusaoDoAssunto = { idAssunto: idAssunto, idMateria: idMateria, idProva: prova.id };
            const response = await assuntoService.deletarAssunto(dadosParaExclusaoDoAssunto);
            dispatcher({
                tipo: EXCLUIR_ASSUNTO,
                dadosParaAlteracao: {
                    idMateria: idMateria,
                    idAssunto: idAssunto
                }
            })

            setAlertaSuccess("Assunto excluído com sucesso.");

        } catch (error) {
            setAlertaError("Erro ao excluir: " + error.response?.data);
        } finally {
            setIdMateria(null);
            setIdAssunto(null);

        }
    };


    const alterarAssunto = async (assuntoAlterado) => {
        try {
            const response = await assuntoService.editarAssunto(assuntoAlterado)

            dispatcher({
                tipo: EDITAR_ASSUNTO,
                dadosParaAlteracao: {
                    idProva: prova.id,
                    idAssunto: idAssunto,
                    assuntoAlterado: response
                }
            })
            setAlertaSuccess("Assunto editado com sucesso!");
        } catch (error) {
            console.log(error);
        } finally {
            closeModalEditarAssuntos();
            limparFormulario();

        }
    };
    const adicionaMateria = async () => {
        try {
            const { nome, id, listaDeAssuntos } = await materiasService.adicionaMateria(form);
            dispatcher({ tipo: ADICIONAR_MATERIA, dadosParaAlteracao: { nome: nome, id: id, listaDeAssuntos:listaDeAssuntos } });
            setAlertaSuccess("Materia adicionada com sucesso.");
        } catch (error) {
            setAlertaError(error.response);
        } finally {
            limparFormulario();
        }
    };



    const adicionarQuestoesAoAssunto = async (dadosQuestao) => {
        try {
            const dadosParaEnviarQuestoesParaApi = { idProva: prova.id, idMateria: idMateria, idAssunto: idAssunto, questao: dadosQuestao };
            const r = await questoesService.adicionaQuestao(dadosParaEnviarQuestoesParaApi);
            setModalQuestoesIsOpen(false);
            dispatcher({
                tipo: ADICIONAR_QUESTAO,
                dadosParaAlteracao: {
                    idProva: prova.id,
                    idMateria: idMateria,
                    idAssunto: idAssunto,
                    questao: r
                }
            })
            setAlertaSuccess("Questões adicionadas com sucesso.");
        } catch (error) {
            setAlertaError(error.response.data);
        } finally {
            limparFormulario();
        }
    }

    const editarMateria = async (dados) => {
        const dadosParaEnvioAlteracaoMateria = {
            idProva: prova.id,
            idMateria: idMateria,
            novosDadosMateria: dados
        };

        try {
            const response = await materiasService.editarMateria(dadosParaEnvioAlteracaoMateria);
            dispatcher({
                tipo: EDITAR_MATERIA,
                dadosParaAlteracao: {
                    idMateria: idMateria,
                    dados: response
                }
            })
            setAlertaSuccess("Materia editada com sucesso!");
        } catch (error) {
            setAlertaError(error.response.data);
        } finally {
            closeModalEditarMateria();
            limparFormulario();
        }
    };
    const adicionarAssunto = async (formularioAdicionarAssuntos) => {
        try {
            const response = await assuntoService.adicionaAssunto({
                idProva: prova.id,
                idMateria: idMateria,
                ...formularioAdicionarAssuntos
            });
            dispatcher({
                tipo: ADICIONAR_ASSUNTO,
                dadosParaAlteracao: {
                    idMateria: idMateria,
                    assunto: response
                }
            })

            setAlertaSuccess("Assunto adicionado à matéria com sucesso!");
            
        } catch (error) {
            setAlertaError("Erro ao adicionar assunto. Contate o administrador!");
        }
        finally {
            closeModalAssuntos();
            limparFormulario();
        }
    }

    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <SectionProvasEstilizada>
                    {
                        isLoading ?
                            <Loader />
                            :
                            <>
                                <h1>Prova: {prova.titulo}</h1>
                                <p style={{ fontSize: "20px" }}>Data da prova: {dataService.transformarDataEmString(prova.data)}</p>
                                <DivEstilizadaProvaEspecífica>
                                    <span>
                                        <BotaoEstilizado disabled={false} onClick={openModal}>
                                            Adicionar Materias
                                        </BotaoEstilizado>
                                    </span>
                                </DivEstilizadaProvaEspecífica>
                                <GraficosRendimentoAssuntos prova={prova} />
                                <AccordionAssunto
                                    prova={prova}
                                    excluirMateria={excluirMateria}
                                    capturaCliqueBotaoUsuario={capturaCliqueBotaoUsuario}
                                />
                            </>
                    }

                </SectionProvasEstilizada>

                <ModalAdicionarMateriasEAssuntos
                    modalIsOpen={modalMateriaEAssuntoIsOpen}
                    closeModal={closeModal}
                    quantidadeDeInputs={quantidadeDeInputs}
                    adicionaMateria={adicionaMateria}
                    handleChanger={handleChange}
                    setQuantidadeDeInputs={setQuantidadeDeInputs}
                />

                <ModalAdicionarAssuntos
                    modalIsOpen={modalAssuntosIsOpen}
                    closeModal={closeModalAssuntos}
                    prova={prova}
                    idMateria={idMateria}
                    adicionarAssunto={adicionarAssunto}
                />

                <ModalEditarAssuntos
                    modalIsOpen={modalEditarAssuntoIsOpen}
                    closeModal={closeModalEditarAssuntos}
                    prova={prova}
                    idAssunto={idAssunto}
                    idMateria={idMateria}
                    retornaValoresAssunto={retornaValoresAssunto}
                    aoEnviar={alterarAssunto}
                />
                <ModalAdicionarQuestoes
                    modalIsOpen={modalQuestoesIsOpen}
                    closeModal={closeModalQuestoes}
                    prova={prova}
                    idMateria={idMateria}
                    adicionarQuestoesAoAssunto={adicionarQuestoesAoAssunto}

                />
                <ModalEditarMateria
                    modalIsOpen={modalEditarMateriaIsOpen}
                    closeModal={closeModalEditarMateria}
                    editarMateria={editarMateria}
                />
            </MainEstilizada>
            <Alert
                dados={alerta}
            />
            <Footer />
        </>
    );
}

export default ProvaEspecifica;