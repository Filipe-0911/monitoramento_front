import React, { useState } from "react";

import CampoForm from "../../componentes/CampoForm";
import BotaoEstilizado from "../../componentes/Botao";
import { ValidadorEmail, ValidadorSenha } from "../../Utils/Validadores";
import UserService from "../../services/Usuario";
import { NavLink, useNavigate } from "react-router-dom";
import { ContainerEstilizado, SubContainerSign, FormEstilizado } from "../../componentes/ContainerLoginEstilizado";

const userService = new UserService();

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await userService.login(form);
            response ? navigate("/home") : console.log("Login failed", response);
            setLoading(false);
        } catch (error) {
            alert(error.message)
        }
    }

    const handleChanger = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const validadorInput = (form) => {
        return ValidadorEmail(form.login) && ValidadorSenha(form.senha);
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
                    placeholder="Digite sua senha"
                    type="password"
                    name="senha"
                    onChange={handleChanger}
                />
                <BotaoEstilizado
                    type="submit"
                    $disabled={loading === true || !validadorInput(form)}
                >
                    Fazer Login
                </BotaoEstilizado>
                <SubContainerSign>
                    <p>Não possui conta?</p>
                    <NavLink
                        to="cadastro"
                    >
                        Cadastrar
                    </NavLink>
                </SubContainerSign>
            </FormEstilizado>
        </ContainerEstilizado>
    );
}

export default Login;