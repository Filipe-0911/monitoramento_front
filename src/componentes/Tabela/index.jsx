import styled from "styled-components";

const TabelaEstilizada = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid transparent;
    border-radius: 10px;
    box-shadow: 20px 20px 50px rgba(190, 190, 190, 0.5),
                -20px -20px 50px rgba(255,255,255, 0.1);
    
    tr, th {
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        padding: 10px;
        /* color: white; */
        td {
            text-align: center;
            padding: 10px;
            width: 170px;
        }

    }
`;

export default TabelaEstilizada;