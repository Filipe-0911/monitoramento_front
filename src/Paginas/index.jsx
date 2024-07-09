import React, { useState } from "react";
import styled from "styled-components";
import CampoForm from "../componentes/CampoForm";
import BotaoEstilizado from "../componentes/Botao";

const ContainerEstilizado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-width: 100vw;
    background-color: #383838;
`;

const FormEstilizado = styled.form`
    display: flex;
    padding: 3rem;
    flex-direction:column;
    align-items:center;
    background-color: #201d1d;
    border-radius: 5px;
    width: 100%;
    max-width: 450px;
    gap: 30px 0px;

    h1 {
        color: #fff;
        font-size: 20px;
        font-weight: light;

    }
    p {
        color: #fff;
        font-size: 16px;
        font-weight: bold;
    }
    a {
        color: white;
        font-size: 14px;
    }
`
export const SubContainerSign = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px 20px;
  align-items: center;
`

const Login = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            console.log(event)
            alert("Login success")
            setLoading(false);
        } catch (error) {
            alert(error.message)
        }
    }
    
    const handleChanger = (event) => {
        event.preventDefault();
        console.log(event.target.name + ": " + event.target.value);
    }

    return (
        <ContainerEstilizado>
            <FormEstilizado method="post" onSubmit={handleSubmit}> 
                <h1>Faça seu login</h1>
                <CampoForm
                    placeholder="Digite seu login"
                    name="login"
                    onChange={handleChanger}
                />
                <CampoForm
                    placeholder="Digite seu login"
                    type="password"
                    name="senha"
                    onChange={handleChanger}
                />
                <BotaoEstilizado type="submit">
                    Fazer Login
                </BotaoEstilizado>
                <p>Não possui conta?</p> <a>Cadastrar</a>
            </FormEstilizado>
        </ContainerEstilizado>
    );
}

export default Login;