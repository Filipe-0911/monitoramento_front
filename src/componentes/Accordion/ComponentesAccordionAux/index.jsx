import styled from "styled-components";

export const LiAcorddionEstilizado = styled.li`
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    @media (max-width: 562px) {
        align-items: space-between;
        justify-content: center;
        gap: 1em;
    }
`

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