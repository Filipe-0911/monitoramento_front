import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import useUserContext from '../../Hooks/useUserContext';
import AccordionAssunto from '../../Paginas/ProvaEspecifica/AccordionAssunto';
import Accordion from '../Accordion';
import { useProvaContext } from '../../Hooks/useProvaContext';
import styled from 'styled-components';
import TabelaDadosParaMobile from '../GraficosRendimentoAssuntos/TabelaDadosParaMobile';

const DivGraficoEstilizada = styled.div`
    width: 100%;
    height: 500px;
    margin-bottom: 24px;

    @media (max-width: 1000px) {
        display: none;
    }
`
const DivTabelaEstilizada = styled.div`
    display: none;
    
    @media (max-width: 1000px) {
        display: block;
    }
`

const ApexChart = ({ listaEstatisticasMaterias }) => {
    const { usuarioPrefereModoDark } = useUserContext();
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const { prova } = useProvaContext();

    const series = [
        {
            name: 'Porcentagem de Acertos',
            data: listaEstatisticasMaterias.map(materia => materia.porcentagemAcertoMateria.toFixed(2))
        }
    ];
    const categories = listaEstatisticasMaterias.map(materia => materia.nome);


    const options = {
        chart: {
            type: 'bar',
            events: {
                click: function (chart, w, e) {

                }
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
                distributed: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                style: {
                    colors: usuarioPrefereModoDark ? '#FFFFFF' : '#000000',
                    fontSize: '18px'
                }
            },
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: usuarioPrefereModoDark ? '#FFFFFF' : '#000000',
                    fontSize: '16px',
                }
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (val) {
                    return val + "% de acerto"; // Personalizando o valor que aparece no hover
                }
            },
            x: {
                formatter: function (val) {
                    return "Matéria: " + val; // Personalizando o título que aparece no hover
                }
            },
            theme: usuarioPrefereModoDark ? 'dark' : 'light' // Tema escuro ou claro para o tooltip
        }
    }

    function removeId(lista) {
        return Object.keys(lista).map((key) =>{
            if(key !== "idMateria") {
                return lista[key]
            }
        }).sort((a, b) => {
            if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
                return -1;
            }
            if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }

    return (
        <Accordion titulo={"Gráfico rendimento por matéria"} $darkMode={usuarioPrefereModoDark}>
            {<>
                <DivGraficoEstilizada>
                    <div id="chart" style={{ width: "100%" }}>
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="bar"
                            width="100%"
                            height="500px"
                        />
                    </div>
                    <div id="html-dist"></div>
                </DivGraficoEstilizada>
                <DivTabelaEstilizada>
                    <TabelaDadosParaMobile 
                        dadosPorcentagem={removeId(listaEstatisticasMaterias)} 
                        header={
                            ["Nome", "Questões Respondidas", "Questões corretas", "Porcentagem"]
                        }
                        usuarioPrefereModoDark={usuarioPrefereModoDark}
                    />
                </DivTabelaEstilizada>
            </>
            }
        </Accordion>
    );
};

export default ApexChart;
