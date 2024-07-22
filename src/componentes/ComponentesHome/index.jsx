import styled from "styled-components";

export const ContainerTarefas = styled.section`
    margin: 2em 0;
    max-width: 70%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
`;

export const CardTarefasEstilizado = styled.div`
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.3);
    max-width: 300px;
    background-color: ${(props) => (props.$concluido ? "#038C73" : "#d9d9d9")};
    
    h4 {
        padding: 10px;
        margin: 0 auto;
        color: #000;
        text-align: center;
    }
    div.principal {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 5px;
        margin: 1em 0;
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
        flex-wrap: wrap;
        gap: 1em;
    }

    @media (max-width: 562px) {
        width: 100vw;
    }
`;

export const BotaorCard = styled.button`
    display: flex;
    flex-wrap: 'nowrap';
    align-items: center;
    gap: 5px;
    padding: 0.5em;
    border: none;
    background-color: ${(props) => (props.$type === "concluir" ? "#42AB84" : props.$type === "excluir" ? "#c01930" : props.$type === "editar" ? "#FAA800" : props.$type === "adicionar" ? "#3CA6A6" : props.$type === "detalhar" ? "#0087B6" : props.$type === "questao" ? "#01238E" : "")};
    color: white;
    border-radius: 5px;
    font-size: 18px;
    transition: transform .2s;
    cursor: pointer;

    &:hover {
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
        transform: translate(0, -0.5rem);
    }

    @media (max-width: 820px) {
        min-width: 200px;
        justify-content: space-evenly;
    }

    @media (max-width: 562px) {
        min-width: 130px;
        justify-content: center;
        /* width: 100%; */
        gap: 0.5em;
        font-size: 16px;
    }
`;

export const SectionAdicionarTarefa = styled.section`
    margin: 2em 0;
    display: flex;
    align-items: center;
    gap: 2em;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);


`