import React, { useState } from "react";

import CampoForm from "../../componentes/CampoForm";
import BotaoEstilizado from "../../componentes/Botao";
import { ValidadorEmail, ValidadorSenha } from "../../Utils/Validadores";
import UserService from "../../services/Usuario";
import { NavLink, useNavigate } from "react-router-dom";
import { ContainerEstilizado, SubContainerSign, FormEstilizado } from "../../componentes/ContainerLoginEstilizado";
import Alert from "../../componentes/Alert";

const userService = new UserService();

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const [alerta, setAlerta] = useState({ success: false, error: false, message: "" });
    const navigate = useNavigate();

    const setAlertaSuccess = (msg) => {
        setAlerta({ success: true, error: false, message: msg })
    }
    const setAlertaError = (msg) => {
        setAlerta({ success: false, error: true, message: msg })
    }

    const handleChanger = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const validadorInput = (form) => {
        return ValidadorEmail(form.login) && ValidadorSenha(form.senha);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await userService.login(form);
            setAlertaSuccess("Login realizado com sucesso!");
            response ? navigate("/home") : console.log("Login failed", response);

        } catch (error) {
            setAlertaError(error.response.data);

        } finally {
            setLoading(false);

        }
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
            <Alert
                dados={alerta}
            />
        </ContainerEstilizado>
    );
}

export default Login;