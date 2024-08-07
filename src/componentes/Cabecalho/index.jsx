import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    DivEstilizadaHeader,
    DivPaiDoMenuEBotaoMenu,
    HeaderEstilizado,
    MenuHamburguer,
    NavEstilizado,
    CloseMenuHamburguer,
    ImgIconeDoHeaderEstilizado
} from "./ComponentesHeader";

import UserService from "../../services/Usuario";



const Cabecalho = () => {
    const navigate = useNavigate();
    const nomeUsuario = JSON.parse(localStorage.getItem('nome'));
    const usuarioService = new UserService();
    const [ primeiroNome ] = nomeUsuario.split(" ");

    const [menuEscondido, setMenuEscondido] = useState(false);

    // const usuario = JSON.parse(localStorage.getItem('user'));
    // console.log(usuario)

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

    return (
        <HeaderEstilizado open={menuEscondido}>
            <DivEstilizadaHeader>
                <ImgIconeDoHeaderEstilizado src="/imagens/icones/livro.png" color="white"/>
                <p>Olá, {primeiroNome}!</p>
            </DivEstilizadaHeader>
            <DivPaiDoMenuEBotaoMenu>
                <NavEstilizado open={menuEscondido}>
                    <ul>
                        <li>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/provas">
                                Provas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/planejador">
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
                {!menuEscondido
                    ? <MenuHamburguer size={30} onClick={exibeMenu} display="none" />
                    : <CloseMenuHamburguer size={30} onClick={exibeMenu} />}
            </DivPaiDoMenuEBotaoMenu>
        </HeaderEstilizado>
    );
}

export default Cabecalho;