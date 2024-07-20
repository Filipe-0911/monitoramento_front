import React, { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import ProvasService from "../../services/Provas";
import DataService from "../../services/DataService";
import { BotaorCard } from "../../componentes/ComponentesHome";
import { MdCancel } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import styled from "styled-components";
import Botao from "../../componentes/Botao";
import ModalComponent from "../../componentes/Modal";
import { FormEstilizado } from "../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../componentes/CampoForm";
import { useNavigate } from "react-router-dom";
import Accordion from "../../componentes/Accordion";
import { DivBotoesCrudEstilizado } from "../../componentes/Accordion";
import Footer from "../../componentes/Footer";

const LiEstilizadoAccordionProvas = styled.li`
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding: 1em;
    
    h5{
        font-size: 18px;
    }
    p {
        font-size: 16px;
    }
`

export const SectionProvasEstilizada = styled.section`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    @media (max-width: 562px) {
        width: 100%;
        margin: 1em 0;
    }
`
const DivEstatisticasEstilizada = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    h2 {
        text-decoration: underline;
        text-decoration-color: rgba(255, 255, 255, 0.2);
    }
`

const DivBotaoAdicionarEstilizada = styled.div`
    display: flex; 
    justify-content: flex-end; 
    margin: 2em; 
    width: 100%;

    span {
        width: 20%;
    }

    @media (max-width: 562px) {
        span {
            width: 100%;
        }
    }
`

const Provas = () => {
    const provasService = new ProvasService();
    const [provas, setProvas] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [adicionarOuAlterar, setAdicionarOuAlterar] = useState("");
    const navigate = useNavigate();

    const [form, setForm] = useState({ id: 0, titulo: "", dataDaProva: "" });


    useEffect(() => {
        provasService.buscaProvas()
            .then((provas) => {
                if (Array.isArray(provas)) {
                    setProvas(provas);
                } else {
                    console.error('A resposta não é um array:', provas);
                }
            })
            .catch(erro => console.error(erro));
    }, []);

    const handleChanger = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const somaQuantidadeDeAssunto = (provas) => {
        let totalAssuntos = 0;
        provas.forEach(prova => {
            prova.listaDeMaterias.forEach(materia => {
                totalAssuntos += materia.listaDeAssuntos.length;
            });
        });
        return totalAssuntos;
    }

    const somaQuantidadeDePDFs = (provas) => {
        let totalPDFs = 0;
        provas.forEach(prova => {
            prova.listaDeMaterias.forEach(materia => {
                materia.listaDeAssuntos.forEach(assunto => {
                    totalPDFs += assunto.quantidadePdf;
                });
            });
        });
        return totalPDFs;
    }

    function closeModal() {
        setModalAberto(false);
    }
    const deletarProva = (id) => {
        provasService.deletaProva(id)
            .then((response) => {
                console.log(response);
                setProvas(provas.filter(prova => prova.id !== id));
            })
            .catch(error => console.log(error));
    }
    const somaQuantidadeDeAssuntoPorProva = (prova) => {
        let valorInicial = 0;
        prova.listaDeMaterias.forEach(materia => valorInicial += materia.listaDeAssuntos.length);
        return valorInicial.toString();
    }

    const somaQuantidadeDePDFsPorProva = (prova) => {
        let valorInicial = 0;
        prova.listaDeMaterias.forEach(materia => materia.listaDeAssuntos.forEach(assunto => valorInicial += parseInt(assunto.quantidadePdf)));
        return valorInicial.toString();
    }

    const somaQuantidadeDeQuestoesPorProva = (prova) => {
        let valorInicial = 0;
        prova.listaDeMaterias.forEach(materia => materia.listaDeAssuntos.forEach(assunto => valorInicial += Number(assunto.idQuestoes.length)));
        return valorInicial.toString();
    }

    function openModal(event, prova = null) {
        if (event.target.name === "Editar" || event.target.id === "Editar") {
            setAdicionarOuAlterar("Editar");
            setForm({ id: prova.id, titulo: prova.titulo, dataDaProva: prova.dataDaProva });
        }
        else {
            setAdicionarOuAlterar("Adicionar");
            setForm({ titulo: "", dataDaProva: "" });
        }

        setModalAberto(true);
    }

    const insereProva = (e) => {
        setAdicionarOuAlterar("Adicionar");
        e.preventDefault();
        provasService.adicionaProva(form)
            .then(response => setProvas([...provas, response]))
            .catch(error => console.log(error));

        setModalAberto(false);
    }

    const alterarProva = () => {
        provasService.alteraProva(form)
            .then(response => {
                setProvas(provas.map(prova => prova.id === form.id ? { ...prova, ...form } : prova));
                console.log(response);
            }).catch(error => console.log(error));
        setModalAberto(false);
    }

    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <h1 style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255, 255, 255, 0.2)' }}>
                    Página de provas
                </h1>
                <SectionProvasEstilizada>
                    <DivEstatisticasEstilizada>
                        <h2>Total de Provas: {provas.length}</h2>
                        <h2>Total de Materias: {somaQuantidadeDeAssunto(provas)}</h2>
                        <h2>Total de PDFs: {somaQuantidadeDePDFs(provas)}</h2>
                    </DivEstatisticasEstilizada>
                    <DivBotaoAdicionarEstilizada>
                        <span>
                            <Botao disabled={false} onClick={(e) => openModal(e)} name="Adicionar">
                                Adicionar Provas
                            </Botao>
                        </span>
                    </DivBotaoAdicionarEstilizada>
                    {provas.map(prova => {
                        return (
                            <Accordion key={prova.id} titulo={prova.titulo}>
                                <ul>
                                    <LiEstilizadoAccordionProvas>
                                        <h5>Data da prova:</h5>
                                        <p>{new DataService().transformarDataEmString(prova.dataDaProva)}</p>
                                    </LiEstilizadoAccordionProvas>
                                    <LiEstilizadoAccordionProvas>
                                        <h5>Quantidade de matérias:</h5>
                                        <p>{prova.listaDeMaterias?.length}</p>
                                    </LiEstilizadoAccordionProvas>
                                    <LiEstilizadoAccordionProvas>
                                        <h5>Quantidade de assunto por prova:</h5>
                                        <p>{somaQuantidadeDeAssuntoPorProva(prova)}</p>
                                    </LiEstilizadoAccordionProvas>
                                    <LiEstilizadoAccordionProvas>
                                        <h5>Quantidade de PDFS por prova:</h5>
                                        <p>{somaQuantidadeDePDFsPorProva(prova)}</p>
                                    </LiEstilizadoAccordionProvas>
                                    <LiEstilizadoAccordionProvas>
                                        <h5>Quantidade de questões por prova:</h5>
                                        <p>{somaQuantidadeDeQuestoesPorProva(prova)}</p>
                                    </LiEstilizadoAccordionProvas>
                                </ul>
                                <DivBotoesCrudEstilizado>
                                    <BotaorCard
                                        $type="editar"
                                        name="Editar"
                                        onClick={(e) => openModal(e, prova)}>
                                        <FaPencilAlt id="Editar" />
                                        Editar
                                    </BotaorCard>
                                    <BotaorCard
                                        $type="excluir"
                                        name="excluir"
                                        onClick={() => deletarProva(prova.id)}>
                                        <MdCancel />
                                        Deletar
                                    </BotaorCard>
                                    <BotaorCard
                                        $type="detalhar"
                                        name="detalhar"
                                        onClick={() => navigate(`/provas/${prova.id}`)}>
                                        <TbListDetails />
                                        Detalhar
                                    </BotaorCard>
                                </DivBotoesCrudEstilizado>
                            </Accordion>
                        );
                    })}

                </SectionProvasEstilizada>
                <ModalComponent
                    modalIsOpen={modalAberto}
                    closeModal={closeModal}
                >
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <BotaorCard $type="excluir" onClick={closeModal}>
                            <MdCancel />
                        </BotaorCard>
                    </div>
                    <FormEstilizado onSubmit={e => e.preventDefault()}>
                        <h4>{adicionarOuAlterar}</h4>
                        <input type="number" hidden defaultValue={form.id} />
                        <label>
                            Título da prova:
                        </label>
                        <CampoForm
                            name="titulo"
                            onChange={handleChanger}
                            defaultValue={form.titulo}
                        />

                        <label>
                            Data provável da prova:
                        </label>
                        <CampoForm
                            name="dataDaProva"
                            onChange={handleChanger}
                            type="datetime-local"
                            defaultValue={form.dataDaProva}
                        />
                        <Botao onClick={
                            e => adicionarOuAlterar === "Adicionar" ? insereProva(e)
                                : adicionarOuAlterar === "Editar" ? alterarProva(e) : null
                        }
                        >
                            {adicionarOuAlterar}
                        </Botao>
                    </FormEstilizado>
                </ModalComponent>
            </MainEstilizada>
            <Footer />
        </>
    );
}

export default Provas;