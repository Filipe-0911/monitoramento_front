import styled from "styled-components";
import DataService from "../../../services/DataService";

const TableEstilizadaParaDadosMediaMobile = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid transparent;
    border-radius: 10px;
    color: ${props => props.$usuarioPrefereModoDark ? "white" : "black"};
    min-width: 100%;
    
    tr, th {
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }

    td {
        text-align: center;
    }

    th, td {
        padding: 8px;
        min-width: 172px;
    }

    @media (min-width: 820px) {
        display: none;
    }

`

export default function TabelaDadosParaMobile({ header, dadosPorcentagem, usuarioPrefereModoDark }) {
    const dataService = new DataService();
    return (
        <TableEstilizadaParaDadosMediaMobile $usuarioPrefereModoDark={usuarioPrefereModoDark}>
            <thead>
                <tr>
                    {header.map((header, index) => <th key={index}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {

                    dadosPorcentagem.map((dados, index) => {
                        return (
                            <tr key={index}>
                                {
                                    Object.keys(dados).map((chave, indice) => {
                                        if (chave !== "idMateria") {
                                            return (
                                                <td key={indice}>
                                                    {typeof dados[chave] === "number" ? dados[chave].toFixed(2) + "%": dados[chave]}
                                                </td>
                                            )
                                        }
                                    })
                                }
                            </tr>
                        )
                    })

                }
            </tbody>
        </TableEstilizadaParaDadosMediaMobile>
    );
}