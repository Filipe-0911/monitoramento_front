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

const SectionProvasEstilizada = styled.section`
    width: 100%;
`

const DivEstatisticasEstilizada = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    h2 {
        text-decoration: underline;
        text-decoration-color: rgba(255, 255, 255, 0.2);
    }
`

const Provas = () => {
    const provasService = new ProvasService();
    const [provas, setProvas] = useState([]);

    useEffect(() => {
        provasService.buscaProvas().then((provas) => {
            setProvas(provas);
        }).catch(erro => console.error(erro));

    }, []);

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
                    if (assunto.quantidadePdf) {
                        totalPDFs++;
                    }
                });
            });
        });
        return totalPDFs;
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
                    <div style={{display: "flex", justifyContent: "flex-end", margin: "2em"}}>
                        <span style={{width: '20%'}}>
                            <Botao disable={false}>
                                Adicionar Provas
                            </Botao>
                        </span>
                    </div>
                    <TabelaEstilizada>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Data da prova</th>
                                <th>Quantidade de materias</th>
                                <th>Quantidade de Assuntos por Matéria</th>
                                <th>Quantidade de PDFS</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {provas.map(prova => (
                                <tr key={prova.id}>
                                    <td>{prova.id}</td>
                                    <td>{prova.titulo}</td>
                                    <td>{new DataService().transformarDataEmString(prova.dataDaProva)}</td>
                                    <td>{prova.listaDeMaterias.length}</td>
                                    <td>{somaQuantidadeDeAssunto(provas)}</td>
                                    <td>{somaQuantidadeDePDFs(provas)}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <BotaorCard
                                                $type="editar"
                                                name="editar"
                                                onClick={() => console.log("Alterar Prova")}>
                                                <FaPencilAlt />
                                                Editar
                                            </BotaorCard>
                                            <BotaorCard
                                                $type="excluir"
                                                name="excluir"
                                                onClick={() => console.log("Deletar Prova")}>
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
            </MainEstilizada>
        </>
    );
}

export default Provas;