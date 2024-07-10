import React from "react";
import styled from "styled-components";

const BotaoEstilizado = styled.button`
    color: #fff;
    font-size:20px;
    border: 30px;
    background-color: #6a6a6a;
    border-radius: 8px;
    width: 100%;
    height: 50px;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;

    ${props => props.$disabled && `
        &:hover {
            opacity:0.4;
            transition: 0.5s;
        }
    `}

${props => props.$disabled === false && `
        &:hover {
            background-color: #fff;
            color: #454545;
            transition: 0.5s;
        }
    `}
`

export default BotaoEstilizado;