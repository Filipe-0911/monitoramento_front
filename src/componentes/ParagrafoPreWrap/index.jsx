import styled from "styled-components";

const ParagrafoEstilizadoPreWrap = styled.p`
    font-size: 20px;
    white-space: pre-wrap;
`

export default function ParagrafoPreWrap({ children }) {
    return (
        <ParagrafoEstilizadoPreWrap>
            {children}
        </ParagrafoEstilizadoPreWrap>
    );
}