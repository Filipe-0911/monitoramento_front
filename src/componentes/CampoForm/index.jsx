import React from "react";
import styled from "styled-components";

const InputEstilizado = styled.input`
    color: #ffffff;
    font-size: 20px;
    background-color: transparent;
    border: 2px solid #6a6a6a;
    border-radius: 8px;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 16px 20px;
    width: 100%;

    input::placeholder {
        color: #fff;
        font-size:12px;
        opacity: 0.7;
    }
`

const CampoForm = (props) => {
    const { placeholder, type = "text", name } = props
    return (
        <InputEstilizado type={type} name={name} placeholder={placeholder} />
    );
}

export default CampoForm;