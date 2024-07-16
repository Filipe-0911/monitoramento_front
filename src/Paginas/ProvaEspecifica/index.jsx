import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import ProvasService from "../../services/Provas";
import DataService from "../../services/DataService";
import MateriasService from "../../services/MateriasService";

import { SectionProvasEstilizada } from "../Provas";
import { FormEstilizado } from "../../componentes/ContainerLoginEstilizado";
import { BotaorCard } from "../../componentes/ComponentesHome";

import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import PaginaEspecifaNotFound from "../ProvaEspecificaNotFound";
import BotaoEstilizado from "../../componentes/Botao";
import ModalComponent from "../../componentes/Modal";
import Accordion from "../../componentes/Accordion";

import { MdCancel, MdOutlineAddToPhotos } from "react-icons/md";
import FormAdicionarMaterias from "./FormAdicionarMaterias";

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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form, setForm] = useState({ idProva: 0, nome: "" });
    const [quantidadeDeInputs, setQuantidadeDeInputs] = useState([]);
    const [listaDeAssuntos, setListaDeAssuntos] = useState([]);

    const excluirMateria = (idMateria) => {
        materiasService.deletaMateria(prova.id, idMateria).then(() => {
            setProva({
                ...prova,
                listaDeMaterias: prova.listaDeMaterias.filter(materia => materia.id !== idMateria)
            })
        }).catch(erro => console.log(erro));
    }

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id).then(res => {
            if (res.request && res.request.status === 404) {
                setIsLoading(false);
                setProva(null);
                return;
            } else {
                setIsLoading(false);
                setProva(res);
                setForm({ idProva: res.id, nome: "" });
            }

        }).catch(err => {
            console.error(err);
            setIsLoading(false);
        });

    }, [parametros.id]);

    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleChanger = (event) => {
        const { name, value } = event.target;
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [name]: value };                
            if (listaDeAssuntos.length > 0) {
                updatedForm.listaDeAssuntos = listaDeAssuntos;
            }
            aoDigitar(updatedForm);
            return updatedForm;
        });

        aoDigitar(form);
        
    }
    

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

        setQuantidadeDeInputs([])
    }

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
                    {prova.listaDeMaterias.map(materia => {
                        return (
                            <Accordion key={materia.id} titulo={`Matéria: ${materia.nome}`}>
                                <ul>
                                    {materia.listaDeAssuntos.map(assunto => {
                                        return (
                                            <li key={assunto.id}>
                                                <section>
                                                    <h5>
                                                        {assunto.nome}
                                                    </h5>
                                                    <p>
                                                        Quantidade de pdfs: {assunto.quantidadePdf}
                                                    </p>
                                                    <p>
                                                        Quantidade de questões feitas: {assunto.idQuestoes.length}
                                                    </p>
                                                </section>
                                                <section>
                                                    <BotaorCard $type="excluir">
                                                        Excluir Assunto
                                                    </BotaorCard>
                                                    <BotaorCard $type="editar">
                                                        Editar Assunto
                                                    </BotaorCard>
                                                </section>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <DivBotoesCrudMateria>
                                    <BotaorCard $type="adicionar">
                                        Adicionar Assunto
                                    </BotaorCard>
                                    <BotaorCard onClick={() => excluirMateria(materia.id)} $type="excluir">
                                        Excluir Materia
                                    </BotaorCard>
                                    <BotaorCard $type="editar">
                                        Editar Materia
                                    </BotaorCard>
                                </DivBotoesCrudMateria>
                            </Accordion>
                        );
                    })}

                </SectionProvasEstilizada>
                {/* Modal add matéria */}
                <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <BotaorCard $type="excluir" onClick={closeModal}>
                            <MdCancel />
                        </BotaorCard>
                    </div>
                    <FormAdicionarMaterias
                        quantidadeDeInputs={quantidadeDeInputs}
                        adicionaMateria={adicionaMateria}
                        handleChanger={handleChanger}
                        setInput={setQuantidadeDeInputs}
                    />
                </ModalComponent>
            </MainEstilizada>
        </>
    );
}
export default ProvaEspecifica;
