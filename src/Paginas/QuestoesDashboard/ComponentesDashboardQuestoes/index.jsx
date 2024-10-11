import styled from "styled-components";

export const SectionDashboardEstilizada = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;

    @media (max-width:562px) {
        align-items: center;
    }
`

export const SectionCardsDashboardEstilizada = styled.section`
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1em;

    @media (max-width: 820px) {
        flex-direction: column;
        justify-content: center;
        gap: 1em;
    }
`
export const CardDashboardEstilizada = styled.div`
    width: 20%;
    padding: 1em;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    gap: 2em;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.$darkMode ? "var(--bg-cinza-dark-mode)" : "var(--bg-cinza-light-mode)"};

    &:hover {
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
        transform: translate(0, -0.25rem);
        transition: all.2s;
    }

    h3 {
        margin-bottom: 1em;
        text-align: center;
    }

    @media (max-width: 820px) {
        width: 100%;
    }

    @media (max-width: 562px) {
        width: 100%;
    }
`