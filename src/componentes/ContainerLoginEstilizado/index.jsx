import styled from "styled-components";

export const ContainerEstilizado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-width: 100vw;
    background-color: #79717A;
`;

export const FormEstilizado = styled.form`
    position: absulote;
    display: flex;
    padding: 3rem;
    flex-direction:column;
    align-items:center;
    background-color: #201d1d;
    border-radius: 5px;
    width: 100%;
    max-width: 450px;
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
`

export const SubContainerSign = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px 20px;
  align-items: center;

`