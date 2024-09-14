import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    DivEstilizadaHeader,
    DivPaiDoMenuEBotaoMenu,
    HeaderEstilizado,
    NavEstilizado,
    ImgIconeDoHeaderEstilizado
} from "./ComponentesHeader";

import UserService from "../../services/Usuario";
import BtnMenu from "../BtnMenu";
import InputModoDark from "../InputModoDark";
import CampoTempoDeLogin from "../CampoTempoDeLogin";
import styled from "styled-components";


const DivNomeBotaoMenuEBotaoDarkMode = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;

    @media(max-width: 820px) {
        width: 100%;
    }
`

const Cabecalho = () => {
    const navigate = useNavigate();
    const nomeUsuario = JSON.parse(localStorage.getItem('nome'));
    const usuarioService = new UserService();
    const [primeiroNome] = nomeUsuario.split(" ");

    const [menuEscondido, setMenuEscondido] = useState(false);

    function deslogar() {
        usuarioService.logout();
        navigate("/login");
    }

    function exibeMenu() {
        setMenuEscondido(!menuEscondido);
    }

    function handleResize() {
        if (window.innerWidth > 768 && !menuEscondido) {
            setMenuEscondido(false)
        }
        if (window.innerWidth < 600 && menuEscondido) {
            setMenuEscondido(true)
        }
    }


    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [menuEscondido])

    const horaDeLogin = JSON.parse(localStorage.getItem("horarioLogin"));

    return (
        <HeaderEstilizado open={menuEscondido}>
            <DivPaiDoMenuEBotaoMenu>
                
                <DivNomeBotaoMenuEBotaoDarkMode >
                    <DivEstilizadaHeader>
                        <section style={{ display: "flex", alignItems: "center" }}>
                            <ImgIconeDoHeaderEstilizado src="/imagens/icones/livro.png" color="white" />
                            <p>Olá, {primeiroNome}!</p>
                        </section>
                        <CampoTempoDeLogin horaLogin={horaDeLogin} />
                        <InputModoDark />
                    </DivEstilizadaHeader>
                    <BtnMenu onClick={exibeMenu} menuEscondido={menuEscondido} />
                </DivNomeBotaoMenuEBotaoDarkMode>

                <NavEstilizado open={menuEscondido}>
                    <ul>
                        <li>
                            <NavLink to="/" onClick={exibeMenu}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/provas" onClick={exibeMenu}>
                                Provas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/planejador" onClick={exibeMenu}>
                                Planejamentos
                            </NavLink>
                        </li>
                        <li>
                            <a onClick={deslogar}>
                                Sair
                            </a>
                        </li>
                    </ul>
                </NavEstilizado>

            </DivPaiDoMenuEBotaoMenu>
        </HeaderEstilizado>
    );
}

export default Cabecalho;