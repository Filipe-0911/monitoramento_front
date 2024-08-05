import React from "react";
import styled from "styled-components";

const InputEstilizado = styled.input`
    color: #ffffff;
    font-size: 20px;
    background-color: transparent;
    border: 2px solid #6a6a6a;
    border-radius: 8px;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: ${props => props.type === "text" ? "16px 20px" : props.type === "datetime-local" ? "16px 20px" : props.type === "number" ? "16px 20px" : '1px'};
    height: ${props => props.type === "color" ? "40px" : props.type === "checkbox" ? "30px" : "50px"};
    width: ${props => props.type === "checkbox" ? "30px" : "100%"};

    input::placeholder {
        color: #fff;
        font-size:12px;
        opacity: 0.7;
    }
`



const CampoForm = (props) => {
    const { placeholder, type = "text", name, onChange, defaultValue } = props
    return (
        <InputEstilizado type={type} name={name} placeholder={placeholder} onChange={onChange} value={defaultValue}/>
    );
}

export default CampoForm;