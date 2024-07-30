import { useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
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
import { useProvaContext } from "../../Hooks/useProvaContext";

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

    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState({ idProva: 0, nome: "", listaDeAssuntos: [] });

    const [modalMateriaEAssuntoIsOpen, setModalMateriaEAssuntoIsOpen] = useState(false);
    const [modalEditarMateriaIsOpen, setModalEditarMateriaIsOpen] = useState(false);
    const [modalAssuntosIsOpen, setModalAssuntosIsOpen] = useState(false);
    const [modalEditarAssuntoIsOpen, setModalEditarAssuntoIsOpen] = useState(false);
    const [modalQuestoesIsOpen, setModalQuestoesIsOpen] = useState(false);

    const [alerta, setAlerta] = useState({ success: false, error: false, message: "" });
    const parametros = useParams();

    const {
        addProva,
        delAssunto,
        updateAssunto,
        addAssunto,
        addQuestao,
        addMateria,
        delMateria,
        updateMateria,
        prova,
        quantidadeDeInputs,
        setQuantidadeDeInputs,
        idMateria,
        setIdMateria,
        idAssunto,
        setIdAssunto,
    } = useProvaContext();

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id)
            .then(res => {
                if (res.request && res.request.status === 404) {
                    setAlertaError(res.request.status);
                } else {
                    addProva(res)
                    setForm(prevState => ({ ...prevState, idProva: res.id }));
                }
                setIsLoading(false);
            })
            .catch(err => {
                setAlertaError(err.response.data);
                setIsLoading(false);
            });
    }, [+parametros.id]);

    const openModal = () => {
        setModalMateriaEAssuntoIsOpen(true);
    };
    const closeModal = () => {
        setModalMateriaEAssuntoIsOpen(false);
    };

    const closeModalAssuntos = () => {
        setModalAssuntosIsOpen(false);
    };
    const openModalEditarAssuntos = (idMateria, idAssunto) => {
        setModalEditarAssuntoIsOpen(true);
        setIdMateria(idMateria);
        setIdAssunto(idAssunto);
    }
    const openModalAssuntos = (idMateria) => {
        setModalAssuntosIsOpen(true);
        setIdMateria(idMateria);
    }

    const closeModalEditarAssuntos = () => {
        setModalEditarAssuntoIsOpen(false);
    };

    const closeModalQuestoes = () => {
        setModalQuestoesIsOpen(false);
    };
    const openModalQuestoes = (idMateria, idAssunto) => {
        setModalQuestoesIsOpen(true);
        setIdMateria(idMateria);
        setIdAssunto(idAssunto);
    }

    const openModalEditarMateria = (idMateria) => {
        setModalEditarMateriaIsOpen(true);
        setIdMateria(idMateria);
    }

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
        let lista = [];

        for (const key in form) {
            if (key.includes('quantidade_input')) {
                novoAssunto.quantidadePdf = parseInt(form[key]);
            }
            if (key.includes('nome_assunto')) {
                novoAssunto.nome = form[key];
            }
        }

        if (novoAssunto.nome !== '') lista = [...lista, novoAssunto];
        setForm(prevState => ({ ...prevState, listaDeAssuntos: lista }));
    };

    if (prova === null) {
        return <PaginaEspecifaNotFound erro="Prova não encontrada" />;
    }

    const limparFormulario = () => {
        setForm({ idProva: prova.id });
        setQuantidadeDeInputs([]);
        setIdMateria(null);
        setIdAssunto(null);
    }

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

    const excluirMateria = async (idMateria) => {

        try {
            const response = await materiasService.deletaMateria(prova.id, idMateria);
            if (response.status === 200) {

                delMateria({ dadosParaAlteracao: { idProva: prova.id, idMateria: idMateria } })
                setAlertaSuccess("Matéria excluída com sucesso!");
            }
        } catch (error) {
            setAlertaError("Erro ao excluir matéria!");
        }

    };

    const excluirAssunto = async (idAssunto, idMateria) => {
        try {
            let dadosParaExclusaoDoAssunto = { idAssunto: idAssunto, idMateria: idMateria, idProva: prova.id };
            const response = await assuntoService.deletarAssunto(dadosParaExclusaoDoAssunto);
            delAssunto({ dadosParaAlteracao: { idMateria: idMateria, idAssunto: idAssunto } })
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
            const response = await assuntoService.editarAssunto(assuntoAlterado);

            updateAssunto({
                dadosParaAlteracao: {
                    assuntoAlterado: response
                }
            })
            setAlertaSuccess("Assunto editado com sucesso!");
        } catch (error) {
            setAlertaError(error.response.data);
        } finally {
            closeModalEditarAssuntos();
            // limparFormulario();
        }
    };
    const adicionaMateria = async () => {
        try {
            const { nome, id, listaDeAssuntos } = await materiasService.adicionaMateria(form);
            addMateria({ dadosParaAlteracao: { nome: nome, id: id, listaDeAssuntos: listaDeAssuntos } });
            setAlertaSuccess("Materia adicionada com sucesso.");
        } catch (error) {
            setAlertaError(error.response?.data);
        } finally {
            limparFormulario();
            closeModal();
        }
    };

    const adicionarQuestoesAoAssunto = async (dadosQuestao) => {
        try {
            const dadosParaEnviarQuestoesParaApi = { idProva: prova.id, idMateria: idMateria, idAssunto: idAssunto, questao: dadosQuestao };
            const r = await questoesService.adicionaQuestao(dadosParaEnviarQuestoesParaApi);
            setModalQuestoesIsOpen(false);
            addQuestao({
                dadosParaAlteracao: {
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
            updateMateria({ dadosParaAlteracao: { idMateria: idMateria, dados: response } })
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
            addAssunto({ dadosParaAlteracao: { idMateria: idMateria, assunto: response } })
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
                                <GraficosRendimentoAssuntos
                                    prova={prova}
                                />
                                <AccordionAssunto
                                    prova={prova}
                                    excluirMateria={excluirMateria}
                                    excluirAssunto={excluirAssunto}
                                    setModalAssuntosIsOpen={openModalAssuntos}
                                    setModalEditarMateriaIsOpen={openModalEditarMateria}
                                    setModalEditarAssuntosIsOpen={openModalEditarAssuntos}
                                    setModalAdicionarQuestoesIsOpen={openModalQuestoes}
                                />
                            </>
                    }
                </SectionProvasEstilizada>
                <ModalAdicionarMateriasEAssuntos
                    modalIsOpen={modalMateriaEAssuntoIsOpen}
                    closeModal={closeModal}
                    adicionaMateria={adicionaMateria}
                    handleChanger={handleChange}
                />

                <ModalAdicionarAssuntos
                    modalIsOpen={modalAssuntosIsOpen}
                    closeModal={closeModalAssuntos}
                    adicionarAssunto={adicionarAssunto}
                />

                <ModalEditarAssuntos
                    modalIsOpen={modalEditarAssuntoIsOpen}
                    closeModal={closeModalEditarAssuntos}
                    retornaValoresAssunto={retornaValoresAssunto}
                    aoEnviar={alterarAssunto}
                />
                <ModalAdicionarQuestoes
                    modalIsOpen={modalQuestoesIsOpen}
                    closeModal={closeModalQuestoes}
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