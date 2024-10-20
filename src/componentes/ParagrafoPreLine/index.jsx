import styled from "styled-components";

const ParagrafoEstilizadoPreWrap = styled.p`
    font-size: 20px;
    white-space: pre-line;
`

export default function ParagrafoPreLine({ children }) {
    return (
        <ParagrafoEstilizadoPreWrap>
            {children}
        </ParagrafoEstilizadoPreWrap>
    );
}