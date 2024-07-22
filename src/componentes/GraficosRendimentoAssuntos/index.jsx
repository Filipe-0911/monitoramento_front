import ReactApexChart from "react-apexcharts";
import ProvasService from "../../services/Provas";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../Accordion";
import TabelaDadosParaMobile from "./TabelaDadosParaMobile";

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
    const [mediaQuestoes, setMediaQuestoes] = useState([]);
    const [dadosObtidosDaApi, setDadosObtidosDaApi] = useState([]);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const tamanhoDoGrafico = windowSize - 700;

    window.addEventListener('resize', () => {
        let screenWidth = window.innerWidth;       
        if (screenWidth < 1200) {
            setWindowSize(1200);    
        } else {
            setWindowSize(window.innerWidth);
        }
    })
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await provasService.buscaMediaQuestoes(prova.id);
                setDadosObtidosDaApi(response);
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

                const formattedMediaQuestoes = Object.keys(dataByName).flatMap(nome => [
                    {
                        name: `${nome} - Porcentagem`,
                        type: 'line',
                        data: dataByName[nome].lineData
                    },
                ]);

                setMediaQuestoes(formattedMediaQuestoes);
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
            {mediaQuestoes.length > 0 ? 
            <TabelaDadosParaMobile dadosPorcentagem={dadosObtidosDaApi} />
            : null}
            <SectionGraficoResponsivaEstilizada>
                <ReactApexChart
                    options={options}
                    series={mediaQuestoes}
                    type="line"
                    width={ tamanhoDoGrafico }
                    height={480}
                />
            </SectionGraficoResponsivaEstilizada>
        </Accordion>
    );
}

export default GraficosRendimentoAssuntos;
