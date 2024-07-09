import React, { useState } from "react";

import CampoForm from "../../componentes/CampoForm";
import BotaoEstilizado from "../../componentes/Botao";
import { ValidadorEmail, ValidadorSenhaCadastro } from "../../Utils/Validadores";
import UserService from "../../services/Usuario";
import { NavLink, useNavigate } from "react-router-dom";
import { ContainerEstilizado, SubContainerSign, FormEstilizado } from "../../componentes/ContainerLoginEstilizado";

const userService = new UserService();

const Cadastro = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await userService.cadastrar({
                nome: form.nome,
                login: form.login,
                senha: form.senha
            });
            const { data, status } = response;

            if(status === 200) {
                const login = await userService.login({
                    login: form.login,
                    senha: form.senha
                });

                return login? navigate("/home") : console.log("Entre novamente", response);
            }
            alert(data);
            setLoading(false);

        } catch (error) {
            alert(error.message)
        }
    }

    const handleChanger = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const validadorInput = (form) => {
        return ValidadorEmail(form.login) && ValidadorSenhaCadastro(form.senha, form.senha2);
    }

    return (
        <ContainerEstilizado>
            <FormEstilizado method="post" onSubmit={handleSubmit}>
                <h1>Crie sua conta!</h1>
                <CampoForm
                    placeholder="Digite seu email para Login"
                    name="login"
                    onChange={handleChanger}
                />
                <CampoForm
                    placeholder="Digite seu nome completo"
                    name="nome"
                    onChange={handleChanger}
                />
                <CampoForm
                    placeholder="Digite sua senha"
                    type="password"
                    name="senha"
                    onChange={handleChanger}
                />
                <CampoForm
                    placeholder="Confirme sua senha"
                    type="password"
                    name="senha2"
                    onChange={handleChanger}
                />
                <BotaoEstilizado
                    type="submit"
                    disabled={loading === true || !validadorInput(form)}
                >
                    Cadastrar
                </BotaoEstilizado>
                <SubContainerSign>
                    <p>Já possui conta?</p>
                    <NavLink
                        to="login"
                    >
                        Entrar
                    </NavLink>
                </SubContainerSign>
            </FormEstilizado>
        </ContainerEstilizado>
    );
}

export default Cadastro;