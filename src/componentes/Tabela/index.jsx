import styled from "styled-components";

const TabelaEstilizada = styled.table`
    width: 90%;
    border-collapse: collapse;
    
    tr, th {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 10px;
        td {
            text-align: center;
            padding: 10px;
            width: 170px;
        }

    }
`;

export default TabelaEstilizada;