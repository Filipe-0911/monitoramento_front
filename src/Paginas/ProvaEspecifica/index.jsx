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
import ModalEditarAdicionarAssuntos from "./ModalEditarAdicionarAssuntos";

export const DivBotoesCrudMateria = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;

    @media (max-width: 562px) {
        justify-content: space-between
    }
`;

const DivEstilizadaProvaEspecífica = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 1em 0;

    span {
        width: 25%;
    }

    @media (max-width: 562px) {
        span {
            width: 100%;
        }
    }
`

const ProvaEspecifica = () => {
    const dataService = new DataService();
    const provaService = new ProvasService();
    const materiasService = new MateriasService();
    const parametros = useParams();
    const [prova, setProva] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState({ idProva: 0, nome: "", listaDeAssuntos: [] });
    const [quantidadeDeInputs, setQuantidadeDeInputs] = useState([]);
    const [listaDeAssuntos, setListaDeAssuntos] = useState([]);
    const [acaoDoUsuario, setAcaoDoUsuario] = useState("");

    const [modalMateriaEAssuntoIsOpen, setmodalMateriaEAssuntoIsOpen] = useState(false);
    const [modalAssuntosIsOpen, setModalAssuntosIsOpen] = useState(false);

    const excluirMateria = (idMateria) => {
        materiasService.deletaMateria(prova.id, idMateria).then(() => {
            setProva({
                ...prova,
                listaDeMaterias: prova.listaDeMaterias.filter(materia => materia.id !== idMateria)
            });
        }).catch(erro => console.log(erro));
    };

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id).then(res => {
            if (res.request && res.request.status === 404) {
                setIsLoading(false);
                setProva(null);
                return;
            } else {
                setIsLoading(false);
                setProva(res);
                setForm({ idProva: res.id, nome: "", listaDeAssuntos: [] });
            }
        }).catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }, [parametros.id]);

    useEffect(() => {
        switch (acaoDoUsuario) {
            case "adicionar_assunto":
                setmodalMateriaEAssuntoIsOpen(true);
                setAcaoDoUsuario('');
                break;
            case "editar_assunto":
                console.log(acaoDoUsuario);
                setModalAssuntosIsOpen(true);
                setAcaoDoUsuario('');
                break;
        }
    }, [acaoDoUsuario])

    const openModal = () => {
        setmodalMateriaEAssuntoIsOpen(true);
    };
    const closeModal = () => {
        setmodalMateriaEAssuntoIsOpen(false);
    };

    const closeModalAssuntos = () => {
        setModalAssuntosIsOpen(false);
    }
    const openModalAssuntos = () => {
        setModalAssuntosIsOpen(true);
    }

    const handleChanger = (event) => {
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
        materiasService.adicionaMateria(form).then(res => {
            const { nome, id, listaDeAssuntos } = res;
            let novaMateria = { nome: nome, id: id, listaDeAssuntos: listaDeAssuntos };
            setProva({ ...prova, listaDeMaterias: [...prova.listaDeMaterias, novaMateria] });
        }).catch(err => console.error(err));

        setQuantidadeDeInputs([]);
    };

    const capturaCliqueBotaoUsuario = (event) => {
        let nomeBotao = event.target.name;
        setAcaoDoUsuario(nomeBotao)
    }

    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <SectionProvasEstilizada>
                    <h1>Prova: {prova.titulo}</h1>
                    <p>Data da prova: {dataService.transformarDataEmString(prova.data)}</p>
                    <DivEstilizadaProvaEspecífica>
                        <span>
                            <BotaoEstilizado onClick={openModal}>
                                Adicionar Materias
                            </BotaoEstilizado>
                        </span>
                    </DivEstilizadaProvaEspecífica>
                    {/* Accordions aparecerão aqui */}
                    <AccordionAssunto prova={prova} excluirMateria={excluirMateria} capturaCliqueBotaoUsuario={capturaCliqueBotaoUsuario} />

                </SectionProvasEstilizada>
                {/* Modal add matéria */}

                <ModalAdicionarMateriasEAssuntos
                    modalIsOpen={modalMateriaEAssuntoIsOpen}
                    closeModal={closeModal}
                    quantidadeDeInputs={quantidadeDeInputs}
                    adicionaMateria={adicionaMateria}
                    handleChanger={handleChanger}
                    setQuantidadeDeInputs={setQuantidadeDeInputs}
                />

                <ModalEditarAdicionarAssuntos
                    modalIsOpen={modalAssuntosIsOpen}
                    closeModal={closeModalAssuntos}
                    quantidadeDeInputs={quantidadeDeInputs}
                    adicionaMateria={adicionaMateria}
                    handleChanger={handleChanger}
                    setInput={setQuantidadeDeInputs}
                    openModalAssuntos={openModalAssuntos}
                />
            </MainEstilizada>
        </>
    );
}
export default ProvaEspecifica;