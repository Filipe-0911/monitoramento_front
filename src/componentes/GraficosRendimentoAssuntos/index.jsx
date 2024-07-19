import ReactApexChart from "react-apexcharts";
import ProvasService from "../../services/Provas";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../Accordion";

const SectionGraficoResponsivaEstilizada = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    @media (max-width:820px) {
        display: none;
    }
`
const GraficosRendimentoAssuntos = ({ prova }) => {
    const provasService = new ProvasService();

    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await provasService.buscaMediaQuestoes(prova.id);
                const dataByName = {};

                response.forEach(questao => {
                    const { nome, dataPreenchimento, porcentagem, questoesFeitas } = questao;
                    if (!dataByName[nome]) {
                        dataByName[nome] = {
                            lineData: [],
                            columnData: []
                        };
                    }
                    dataByName[nome].lineData.push({
                        x: new Date(dataPreenchimento).getTime(),
                        y: porcentagem
                    });
                    dataByName[nome].columnData.push({
                        x: new Date(dataPreenchimento).getTime(),
                        y: questoesFeitas
                    });
                });

                const formattedSeries = Object.keys(dataByName).flatMap(nome => [
                    {
                        name: `${nome} - Porcentagem`,
                        type: 'line',
                        data: dataByName[nome].lineData
                    },
                ]);

                setSeries(formattedSeries);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [prova.id]);

    const options = {
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    };

    return (
        <Accordion
            titulo={"Desempenho da prova " + prova.titulo}
        >
            <SectionGraficoResponsivaEstilizada>
                <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    width={1000}
                    height={480}
                />
            </SectionGraficoResponsivaEstilizada>
        </Accordion>
    );
}

export default GraficosRendimentoAssuntos;
