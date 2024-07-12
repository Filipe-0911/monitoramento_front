import styled from "styled-components";

const MainEstilizada = styled.main`
    margin: 80px 0;
    width: 100vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1em;

    @media (max-width: 562px) {
        margin: 3em auto;
        padding: 1em;
        width: 100%;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        text-align: center;
    }
`;

export default MainEstilizada;