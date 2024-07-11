import React, { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import ProvasService from "../../services/Provas";
import DataService from "../../services/DataService";
import TabelaEstilizada from "../../componentes/Tabela";
import { BotaorCard } from "../../componentes/ComponentesHome";
import { MdCancel } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import styled from "styled-components";
import Botao from "../../componentes/Botao";
import ModalComponent from "../../componentes/Modal";
import { FormEstilizado } from "../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../componentes/CampoForm";

const SectionProvasEstilizada = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

const Provas = () => {
    const provasService = new ProvasService();
    const [provas, setProvas] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [adicionarOuAlterar, setAdicionarOuAlterar] = useState("");

    const [form, setForm] = useState({ id: 0 , titulo: "", dataDaProva: "" });


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
                totalAssuntos += materia.listaAssuntos.length;
            });
        });
        return totalAssuntos;
    }

    const somaQuantidadeDePDFs = (provas) => {
        let totalPDFs = 0;
        provas.forEach(prova => {
            prova.listaDeMaterias.forEach(materia => {
                materia.listaAssuntos.forEach(assunto => {
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
        prova.listaDeMaterias.forEach(materia => valorInicial += materia.listaAssuntos.length);
        return valorInicial.toString();
    }

    const somaQuantidadeDePDFsPorProva = (prova) => {
        let valorInicial = 0;
        prova.listaDeMaterias.forEach(materia => materia.listaAssuntos.forEach(assunto => valorInicial += assunto.quantidadePdf));
        return valorInicial.toString();
    }

    const somaQuantidadeDeQuestoesPorProva = (prova) => {
        let valorInicial = 0;
        prova.listaDeMaterias.forEach(materia => materia.listaAssuntos.forEach(assunto => valorInicial += assunto.quantidadeQuestoes));
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
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "2em", width: '100%' }}>
                        <span style={{ width: '20%' }}>
                            <Botao onClick={(e) => openModal(e)} name="Adicionar">
                                Adicionar Provas
                            </Botao>
                        </span>
                    </div>
                    <TabelaEstilizada>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Data da prova</th>
                                <th>Quantidade de materias</th>
                                <th>Quantidade de Assuntos por Matéria</th>
                                <th>Quantidade de PDFS</th>
                                <th>Quantidade de Questões feitas</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {provas.map(prova => (
                                <tr key={prova.id}>
                                    <td>{prova.titulo}</td>
                                    <td>{new DataService().transformarDataEmString(prova.dataDaProva)}</td>
                                    <td>{prova.listaDeMaterias?.length}</td>
                                    <td>{somaQuantidadeDeAssuntoPorProva(prova)}</td>
                                    <td>{somaQuantidadeDePDFsPorProva(prova)}</td>
                                    <td>{somaQuantidadeDeQuestoesPorProva(prova)}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </TabelaEstilizada>
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
                        <input type="number" hidden defaultValue={form.id}/>
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
        </>
    );
}

export default Provas;