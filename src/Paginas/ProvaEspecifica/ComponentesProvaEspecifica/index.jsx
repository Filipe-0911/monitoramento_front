import styled from "styled-components";

export const DivBotoesCrudMateria = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;

    @media (max-width: 820px) {
        flex-direction: column;
        align-items: center;
        gap: 1em;
        justify-content: space-between;
    }
    @media (max-width: 562px) {
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        justify-content: space-between;
    }
`;

export const DivEstilizadaProvaEspecífica = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 1em 0;

    span {
        width: 25%;
        font-size: 22px;
    }

    @media (max-width: 562px) {
        span {
            width: 100%;
        }
    }
`;