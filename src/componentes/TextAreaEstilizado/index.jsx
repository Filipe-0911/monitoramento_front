import React from "react";
import styled from "styled-components";

const TextAreaEstilizado = styled.textarea`
    color: #ffffff;
    font-size: 20px;
    background-color: transparent;
    border: 2px solid #6a6a6a;
    border-radius: 8px;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 16px 20px;
    min-width: 100%;
    max-width: 100%;
    height: 200px;

    input::placeholder {
        color: #fff;
        font-size:12px;
        opacity: 0.7;
    }
`

export default TextAreaEstilizado;