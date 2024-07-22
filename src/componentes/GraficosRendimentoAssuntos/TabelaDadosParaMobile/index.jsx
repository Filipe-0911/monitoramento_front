import styled from "styled-components";
import DataService from "../../../services/DataService";

const TableEstilizadaParaDadosMediaMobile = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid transparent;
    border-radius: 10px;
    
    tr, th {
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }
    
    th {
        text-align: center;
        
    }

    td {
        text-align: center;
    }

    th, td {
        padding: 8px;
    }

    @media (min-width: 821px) {
        display: none;
    }

`

export default function TabelaDadosParaMobile({ dadosPorcentagem }) {
    const dataService = new DataService();
    return (
        <TableEstilizadaParaDadosMediaMobile>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Assunto</th>
                    <th>Média</th>
                    <th>Questões feitas</th>
                </tr>
            </thead>
            <tbody>
                {
                    dadosPorcentagem.map((media, index) => {
                        return (
                            <tr key={index}>
                                <td>{dataService.transformarDataEmString(media.dataPreenchimento)}</td>
                                <td>{media.nome}</td>
                                <td>{media.porcentagem}%</td>
                                <td>{media.questoesFeitas}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </TableEstilizadaParaDadosMediaMobile>
    );
}