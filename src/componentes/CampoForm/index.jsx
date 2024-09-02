import React, { useState } from "react";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputEstilizado = styled.input`
    color: #ffffff;
    font-size: 20px;
    background-color: transparent;
    border: 2px solid #6a6a6a;
    border-radius: 8px;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: ${props => props.type === "text" || props.type === "password" ? "16px 20px" : props.type === "datetime-local" ? "16px 20px" : props.type === "number" ? "16px 20px" : '1px'};
    height: ${props => props.type === "color" ? "40px" : props.type === "checkbox" ? "30px" : "50px"};
    width: ${props => props.type === "checkbox" ? "30px" : "100%"};
    
    input::placeholder {
        color: #fff;
        font-size: 10px;
        opacity: 0.7;
    }
`

const IconeRevelaSenha = styled(FiEye)`
    color: #6a6a6a;
    height: 30px;
    width: 30px;
    position: absolute;
    right: 41%;
    cursor: pointer;

    @media (max-width:1024px) {
        right: 32%;
    }
    @media (max-width: 562px) {
        right: 15%;
    }
`

const IconeEscondeSenha = styled(FiEyeOff)`
    color: #6a6a6a;
    height: 30px;
    width: 30px;
    position: absolute;
    right: 41%;
    cursor: pointer;

    @media (max-width:1024px) {
        right: 32%;
    }
    @media (max-width: 562px) {
        right: 11%;
    }
`



const CampoForm = (props) => {
    const { placeholder, type = "text", name, onChange, defaultValue } = props
    return (
        <>
            <InputEstilizado type={type} name={name} placeholder={placeholder} onChange={onChange} value={defaultValue}/>
        </>
    );
}

export const CampoSenha = (props) => {
    const [tipoDoInput, setTipoDoInput] = useState("password");

    const { placeholder, name, onChange, defaultValue } = props;

    const handleClick = () => {
        tipoDoInput === "text" ? setTipoDoInput("password") : setTipoDoInput("text");
        
    }
    return (
        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <InputEstilizado type={tipoDoInput} name={name} placeholder={placeholder} onChange={onChange} value={defaultValue} />
            {
                tipoDoInput === "password" 
                ? <IconeRevelaSenha onClick={ () => handleClick() }/>
                : <IconeEscondeSenha onClick={ () => handleClick() }/>
            }

        </div>
    );
}

export default CampoForm;