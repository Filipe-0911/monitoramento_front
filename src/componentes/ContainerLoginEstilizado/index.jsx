import styled from "styled-components";

export const ContainerEstilizado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-width: 100vw;
    background-color: ${props => props.$darkMode ? "#79717A" : "#fff"};
`;

export const FormEstilizado = styled.form`
    display: flex;
    padding: 2rem;
    flex-direction:column;
    align-items:center;
    background-color: #201d1d;
    border-radius: 5px;
    width: 100%;
    max-width: ${props => props.$questionario ? "" : "450px"};
    gap: 30px 0px;

    h1 {
        color: #fff;
        font-size: 20px;
        font-weight: light;

    }
    p {
        color: #fff;
        font-size: 16px;
        font-weight: bold;
    }
    a {
        color: white;
        font-size: 14px;
    }
    label {
        font-size: 18px;
    }

    @media (max-width:562px) {
        margin: ${props => props.$login ? "1em" : "0"};
    }
`

export const SubContainerSign = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px 20px;
  align-items: center;

`