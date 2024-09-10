import React, { useState } from "react";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
`;

const InputEstilizado = styled.input`
    color: #ffffff;
    font-size: 20px;
    background-color: transparent;
    border: 2px solid #6a6a6a;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: ${props => props.type === "text" || props.type === "password" ? "16px 60px 16px 20px" : props.type === "datetime-local" ? "16px 20px" : props.type === "number" ? "16px 20px" : '1px'};
    height: ${props => props.type === "color" ? "40px" : props.type === "checkbox" ? "30px" : "50px"};
    width: ${props => props.type === "checkbox" ? "30px" : "100%"};

    &::placeholder {
        color: #fff;
        font-size: 18px;
        opacity: 0.7;
    }
`;

const Icone = styled.div`
    color: #6a6a6a;
    height: 30px;
    width: 30px;
    position: absolute;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;

    ${props => props.position === 'right' && `
        right: 10px; /* Ajuste a posição conforme necessário */
    `}
    ${props => props.position === 'left' && `
        left: 10px; /* Ajuste a posição conforme necessário */
    `}
`;

const CampoForm = (props) => {
    const { placeholder, type = "text", name, onChange, defaultValue } = props;
    return (
        <Container>
            <InputEstilizado type={type} name={name} placeholder={placeholder} onChange={onChange} value={defaultValue} />
        </Container>
    );
}

export const CampoSenha = (props) => {
    const [tipoDoInput, setTipoDoInput] = useState("password");

    const { placeholder, name, onChange, defaultValue } = props;

    const handleClick = () => {
        setTipoDoInput(prevTipo => prevTipo === "text" ? "password" : "text");
    };

    return (
        <Container>
            <InputEstilizado type={tipoDoInput} name={name} placeholder={placeholder} onChange={onChange} value={defaultValue} />
            {
                tipoDoInput === "password" 
                ? <Icone position="right" as={FiEye} onClick={handleClick} />
                : <Icone position="right" as={FiEyeOff} onClick={handleClick} />
            }
        </Container>
    );
}

export default CampoForm;
