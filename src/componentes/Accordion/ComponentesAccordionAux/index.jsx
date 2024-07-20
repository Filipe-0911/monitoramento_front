import styled from "styled-components";

export const SectionBotoesCrudAccordion = styled.section`
    display: flex;
    gap: 1em;
    @media (max-width: 562px) {
        flex-direction: column;
    }
`

export const SectionDadosDoAssuntoEstilizado = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1em;

    h5 {
        font-size: 16px;
    }
`