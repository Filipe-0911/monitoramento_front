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
    max-width: 350px;
    height: 150px;

    input::placeholder {
        color: #fff;
        font-size:12px;
        opacity: 0.7;
    }

    @media (max-width:820px) {
        max-height: 300px;
    }

    @media (max-width: 526px) {
        font-size: 14px;
        max-height:150px;        
    }
`

export default TextAreaEstilizado;