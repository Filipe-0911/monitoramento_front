import styled from "styled-components";

const ParagrafoEstilizadoPreWrap = styled.p`
    font-size: 20px;
    white-space: pre-line;
    text-align: start;

    @media (max-width: 562px) {
        text-align: center;
    }

`

export default function ParagrafoPreLine({ children }) {
    return (
        <ParagrafoEstilizadoPreWrap>
            {children}
        </ParagrafoEstilizadoPreWrap>
    );
}