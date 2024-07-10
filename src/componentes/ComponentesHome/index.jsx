import styled from "styled-components";

export const MainEstilizada = styled.main`
    margin: 3em 0 !important;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const ContainerTarefas = styled.section`
    margin: 2em 0;
    max-width: 70vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
`;

export const CardTarefasEstilizado = styled.div`
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.3);
    max-width: 230px;
    background-color: ${(props) => (props.$concluido ? "#004F4D" : "#BDE038")};
    
    h4 {
        padding: 10px;
        color: #000;
        text-align: center;
    }
    div.principal {
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 1em;
        cursor: pointer;

        p {
            color: #000;
            text-align: center;
        }
    }
    div.rodape_card {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 2em;
    }
`;

export const BotaorCard = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0.5em 1em;
    border: none;
    background-color: ${(props) => (props.$type === "concluir" ? "#44803F" : "#FF5A33")};
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;