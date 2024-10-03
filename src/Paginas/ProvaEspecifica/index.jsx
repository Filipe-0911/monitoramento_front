import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProvasService from "../../services/Provas";
import DataService from "../../services/DataService";
import MateriasService from "../../services/MateriasService";
import { SectionProvasEstilizada } from "../Provas";
import PaginaEspecifaNotFound from "../ProvaEspecificaNotFound";
import BotaoEstilizado from "../../componentes/Botao";
import AccordionAssunto from "./AccordionAssunto";
import AssuntoService from "../../services/AssuntoService";
import QuestoesService from "../../services/QuestoesService";
import GraficosRendimentoAssuntos from "../../componentes/GraficosRendimentoAssuntos";
import Loader from "../../componentes/Loader";
import Alert from "../../componentes/Alert";
import { useProvaContext } from "../../Hooks/useProvaContext";
import ModalFormFlexivel from "./ModalFormFlexivel";
import { DivEstilizadaProvaEspecífica } from "./ComponentesProvaEspecifica";
import useAlertContext from "../../Hooks/useAlertContext"
import useUserContext from "../../Hooks/useUserContext";


const ProvaEspecifica = () => {
    const dataService = new DataService();
    const provaService = new ProvasService();
    const materiasService = new MateriasService();
    const assuntoService = new AssuntoService();
    const questoesService = new QuestoesService();

    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { dadosAlerta, setAlertaError, setAlertaSuccess } = useAlertContext();
    const parametros = useParams();
    const [acaoUsuario, setAcaoUsuario] = useState("");

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
        idMateria,
        setIdMateria,
        idAssunto,
        setIdAssunto,
    } = useProvaContext();

    const { usuarioPrefereModoDark } = useUserContext();

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id)
            .then(res => {
                if (res.request && res.request.status === 404) {
                    setAlertaError(res.request.status);
                } else {
                    addProva(res)
                }
                setIsLoading(false);
            })
            .catch(err => {
                setAlertaError(err.response.data);
                setIsLoading(false);
            });
    }, [+parametros.id]);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (prova === null) {
        return <PaginaEspecifaNotFound erro="Prova não encontrada" />;
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
            setAlertaError(error.response?.data);
        } finally {
            closeModal();
        }
    };
    const adicionaMateria = async (form) => {
        try {
            const { nome, id, listaDeAssuntos } = await materiasService.adicionaMateria(form);
            addMateria({ dadosParaAlteracao: { nome: nome, id: id, listaDeAssuntos: listaDeAssuntos } });
            setAlertaSuccess("Materia adicionada com sucesso.");
        } catch (error) {
            setAlertaError(error.response?.data);
        } finally {
            closeModal();
        }
    };

    const adicionarQuestoesAoAssunto = async (dadosQuestao) => {
        try {
            const dadosParaEnviarQuestoesParaApi = { idProva: prova.id, idMateria: idMateria, idAssunto: idAssunto, questao: dadosQuestao };
            const r = await questoesService.adicionaEstatistica(dadosParaEnviarQuestoesParaApi);
            addQuestao({
                dadosParaAlteracao: {
                    idMateria: idMateria,
                    idAssunto: idAssunto,
                    questao: r
                }
            })
            setAlertaSuccess("Questões adicionadas com sucesso.");
        } catch (error) {
            setAlertaError(error.response?.data);
        } finally {
            closeModal();
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
            closeModal();

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
            closeModal();
        }
    }
    function capturaCliqueParaAdicionarMateria() {
        setAcaoUsuario("adicionar_materia"); openModal();
    }

    return (
        <>
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
                                    <BotaoEstilizado
                                        disabled={false}
                                        onClick={capturaCliqueParaAdicionarMateria}
                                    >
                                        Adicionar Materias
                                    </BotaoEstilizado>
                                </span>
                            </DivEstilizadaProvaEspecífica>
                            <GraficosRendimentoAssuntos
                                prova={prova}
                            />
                            <AccordionAssunto
                                $darkMode={usuarioPrefereModoDark}
                                prova={prova}
                                excluirMateria={excluirMateria}
                                excluirAssunto={excluirAssunto}
                                setAcaoUsuario={setAcaoUsuario}
                                setModalIsOpen={openModal}
                            />
                        </>
                }
            </SectionProvasEstilizada>
            <ModalFormFlexivel
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                adicionaMateria={adicionaMateria}
                adicionarAssunto={adicionarAssunto}
                retornaValoresAssunto={retornaValoresAssunto}
                alterarAssunto={alterarAssunto}
                adicionarQuestoesAoAssunto={adicionarQuestoesAoAssunto}
                editarMateria={editarMateria}
                acaoUsuario={acaoUsuario}
            />
            <Alert
                dados={dadosAlerta}
            />
        </>
    );
}
export default ProvaEspecifica;