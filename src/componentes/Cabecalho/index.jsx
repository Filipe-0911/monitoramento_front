import { GiOpenBook } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DivEstilizadaHeader, DivPaiDoMenuEBotaoMenu, HeaderEstilizado, MenuHamburguer, NavEstilizado } from "./ComponentesHeader";
import UserService from "../../services/Usuario";

const usuarioService = new UserService();


const Cabecalho = (props) => {
    const { nome } = props;
    const [primeiroNome] = nome.split(" ");
    const navigate = useNavigate();
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
        if (window.innerWidth < 562 && menuEscondido) {
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
                <GiOpenBook size={25} color="white" />
                <p>Olá, {primeiroNome}!</p>
            </DivEstilizadaHeader>
            <DivPaiDoMenuEBotaoMenu>
                <NavEstilizado open={menuEscondido}>
                    <ul>
                        <li>
                            <NavLink to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home">
                                Provas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home">
                                Materias
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home">
                                Assuntos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home">
                                Questões
                            </NavLink>
                        </li>
                        <li>
                            <a onClick={deslogar}>
                                Sair
                            </a>
                        </li>
                    </ul>
                </NavEstilizado>
                <MenuHamburguer size={30} onClick={exibeMenu} display="none" />
            </DivPaiDoMenuEBotaoMenu>
        </HeaderEstilizado>
    );
}

export default Cabecalho;