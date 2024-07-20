import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

export const DivBotoesCrudMateria = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;

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
    const [prova, setProva] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [form, setForm] = useState({ idProva: 0, nome: "", listaDeAssuntos: [] });
    const [listaDeAssuntos, setListaDeAssuntos] = useState([]);

    const [quantidadeDeInputs, setQuantidadeDeInputs] = useState([]);
    const [acaoDoUsuario, setAcaoDoUsuario] = useState("");
    const [modalMateriaEAssuntoIsOpen, setModalMateriaEAssuntoIsOpen] = useState(false);
    const [modalAssuntosIsOpen, setModalAssuntosIsOpen] = useState(false);

    const [idMateriaParaAddAssunto, setIdMateriaParaAddAssunto] = useState(null);
    const [idAssunto, setIdAssunto] = useState(null);
    const [modalEditarAssuntoIsOpen, setModalEditarAssuntoIsOpen] = useState(false);
    const [modalQuestoesIsOpen, setModalQuestoesIsOpen] = useState(false);
    const [modalEditarMateriaIsOpen, setModalEditarMateriaIsOpen] = useState(false);

    const excluirMateria = (idMateria) => {
        materiasService.deletaMateria(prova.id, idMateria)
            .then(() => {
                setProva({
                    ...prova,
                    listaDeMaterias: prova.listaDeMaterias.filter(materia => materia.id !== idMateria)
                });
            })
            .catch(erro => console.log(erro));
    };

    const excluirAssunto = () => {
        try {
            let dadosParaExclusaoDoAssunto = { idAssunto: idAssunto, idMateria: idMateriaParaAddAssunto, idProva: prova.id };

            assuntoService.deletarAssunto(dadosParaExclusaoDoAssunto)
                .then(() => {
                    setProva({
                        ...prova,
                        listaDeMaterias: prova.listaDeMaterias.map(materia =>
                            materia.id === idMateriaParaAddAssunto
                                ? { ...materia, listaDeAssuntos: materia.listaDeAssuntos.filter(assunto => assunto.id !== idAssunto) }
                                : materia
                        )
                    });
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setIdMateriaParaAddAssunto(null);
                    setIdAssunto(null);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id)
            .then(res => {
                if (res.request && res.request.status === 404) {
                    setIsLoading(false);
                    setProva(null);
                    return;
                } else {
                    setIsLoading(false);
                    setProva(res);
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
            case "adicionar_assunto":
                setModalAssuntosIsOpen(true);
                break;
            case "excluir_assunto":
                excluirAssunto();
                break;
            case "editar_assunto":
                setModalEditarAssuntoIsOpen(true);
                break;
            case "adicionar_questao":
                pegaValoresAssuntoParaEnviarQuestoes()
                break;
            case "editar_materia":
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
    }

    const alterarAssunto = (assuntoAlterado) => {
        try {
            assuntoService.editarAssunto(assuntoAlterado)
                .then((response) => {
                    setProva(prevProva => ({
                        ...prevProva,
                        listaDeMaterias: prevProva.listaDeMaterias.map(materia =>
                            materia.id === assuntoAlterado.idMateria
                                ? {
                                    ...materia,
                                    listaDeAssuntos: materia.listaDeAssuntos.map(assunto =>
                                        assunto.id === response.id
                                            ? assunto = response
                                            : assunto
                                    )
                                }
                                : materia
                        )
                    }));
                })
                .catch(error => console.log(error))
                .finally(() => {
                    closeModalEditarAssuntos();
                });

        } catch (error) {
            console.log(error);
        }
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
        const lista = [...listaDeAssuntos];
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

        lista[indexDoInput] = novoAssunto;
        setListaDeAssuntos(lista);
        setForm(prevForm => ({ ...prevForm, listaDeAssuntos: lista }));
    };

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (prova === null) {
        return <PaginaEspecifaNotFound erro="Prova não encontrada" />;
    }

    const adicionaMateria = () => {
        materiasService.adicionaMateria(form)
            .then(res => {
                const { nome, id, listaDeAssuntos } = res;
                let novaMateria = { nome: nome, id: id, listaDeAssuntos: listaDeAssuntos };
                setProva({ ...prova, listaDeMaterias: [...prova.listaDeMaterias, novaMateria] });
            })
            .catch(err => console.error(err))
            .finally(() => {
                setQuantidadeDeInputs([]);
            });
    };

    const capturaCliqueBotaoUsuario = (event, idAssunto = null) => {
        let nomeBotao = event.target.name;
        let divPrincipal = event.target.parentNode.parentNode;
        let idMateria;

        if (event.target.localName === "path") {
            // console.log("clicou no path")
            divPrincipal = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            nomeBotao = event.target.parentNode.parentNode.name
        }

        if (event.target.localName === "svg") {
            // console.log("clicou no svg")
            divPrincipal = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            nomeBotao = event.target.parentNode.name
        }

        if (nomeBotao === "excluir_assunto" || nomeBotao === "editar_assunto" || "adicionar_questao") {
            idMateria = divPrincipal.parentNode.parentNode.querySelector("#idMateria").value;
            setIdAssunto(idAssunto !== null ? idAssunto : null);
        } else {
            idMateria = divPrincipal.querySelector("#idMateria").value;
        }

        setIdMateriaParaAddAssunto(parseInt(idMateria));
        setAcaoDoUsuario(nomeBotao);
    };

    const adicionaAssuntoAMateria = (assunto, idMateria) => {
        setProva({
            id: prova.id,
            titulo: prova.titulo,
            data: prova.data,
            listaDeMaterias: prova.listaDeMaterias.map(materia =>
                materia.id === idMateria
                    ? { ...materia, listaDeAssuntos: [...materia.listaDeAssuntos, assunto] }
                    : materia
            )
        });

        closeModalAssuntos();
    };

    const retornaValoresAssunto = () => {
        let assuntoEncontrado = null;

        prova.listaDeMaterias.forEach(materia => {
            const assunto = materia.listaDeAssuntos.find(assunto => assunto.id === idAssunto);
            if (assunto) {
                assuntoEncontrado = assunto;
            }
        });

        return assuntoEncontrado;
    };

    const pegaValoresAssuntoParaEnviarQuestoes = () => {
        const assunto = retornaValoresAssunto();

        if (assunto) {
            setModalQuestoesIsOpen(true);
            setIdAssunto(assunto.id);
        } else {
            alert("Escolha um assunto para adicionar questões.");
        }
    }
    const adicionarQuestoesAoAssunto = (dadosQuestao) => {
        try {
            const dadosParaEnviarQuestoesParaApi = { idProva: prova.id, idMateria: idMateriaParaAddAssunto, idAssunto: idAssunto, questao: dadosQuestao };

            questoesService.adicionaQuestao(dadosParaEnviarQuestoesParaApi).then(r => {
                setModalQuestoesIsOpen(false);
                setProva(prevState => ({
                    ...prevState,
                    listaDeMaterias: prova.listaDeMaterias.map(materia =>
                        materia.id === idMateriaParaAddAssunto
                            ? {
                                ...materia,
                                listaDeAssuntos: materia.listaDeAssuntos.map(assunto =>
                                    assunto.id === idAssunto
                                        ? {
                                            ...assunto,
                                            idQuestoes: [...assunto.idQuestoes, r.id]
                                        }
                                        : assunto
                                )
                            }
                            : materia
                    )
                }))
            });
        } catch (error) {
            console.error(error);
        }

    }

    const editarMateria = (dados) => {
        const dadosParaEnvioAlteracaoMateria = {
            idProva: prova.id,
            idMateria: idMateriaParaAddAssunto,
            novosDadosMateria: dados
        };

        try {
            materiasService.editarMateria(dadosParaEnvioAlteracaoMateria)
                .then(response => {
                    setProva(prevProva => ({
                        ...prevProva,
                        listaDeMaterias: prevProva.listaDeMaterias.map(materia =>
                            materia.id === idMateriaParaAddAssunto
                                ? { ...materia, nome: response.nome }
                                : materia
                        )
                    }));
                })
                .catch(error => console.error(error))
                .finally(() => closeModalEditarMateria());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <SectionProvasEstilizada>
                    <h1>Prova: {prova.titulo}</h1>
                    <p style={{ fontSize: "20px" }}>Data da prova: {dataService.transformarDataEmString(prova.data)}</p>
                    <DivEstilizadaProvaEspecífica>
                        <span>
                            <BotaoEstilizado disabled={false} onClick={openModal}>
                                Adicionar Materias
                            </BotaoEstilizado>
                        </span>
                    </DivEstilizadaProvaEspecífica>
                    <GraficosRendimentoAssuntos prova={prova}/>
                    <AccordionAssunto
                        prova={prova}
                        excluirMateria={excluirMateria}
                        capturaCliqueBotaoUsuario={capturaCliqueBotaoUsuario}
                    />
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
                    idMateria={idMateriaParaAddAssunto}
                    adicionaAssuntoAMateria={adicionaAssuntoAMateria}
                />

                <ModalEditarAssuntos
                    modalIsOpen={modalEditarAssuntoIsOpen}
                    closeModal={closeModalEditarAssuntos}
                    prova={prova}
                    idAssunto={idAssunto}
                    idMateria={idMateriaParaAddAssunto}
                    retornaValoresAssunto={retornaValoresAssunto}
                    aoEnviar={alterarAssunto}
                />
                <ModalAdicionarQuestoes
                    modalIsOpen={modalQuestoesIsOpen}
                    closeModal={closeModalQuestoes}
                    prova={prova}
                    idMateria={idMateriaParaAddAssunto}
                    adicionarQuestoesAoAssunto={adicionarQuestoesAoAssunto}

                />
                <ModalEditarMateria
                    modalIsOpen={modalEditarMateriaIsOpen}
                    closeModal={closeModalEditarMateria}
                    editarMateria={editarMateria}
                />
            </MainEstilizada>
            <Footer/>
        </>
    );
}

export default ProvaEspecifica;