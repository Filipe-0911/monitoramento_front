import styled from "styled-components";
import { GiOpenBook } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";

import UserService from "../../services/Usuario";

const usuarioService = new UserService();

const HeaderEstilizado = styled.header`
    position: fixed;
    top: 0;
    width: 100vw;
    background-color: #201d1d;
    display:flex;
    justify-content: space-between;


`

const DivEstilizadaHeader = styled.div`
    position: relative;
    left: 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 20px;
    width: 170px;

    p {
        color: #000;
    }

`

const NavEstilizado = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0 auto;

    ul {
        list-style: none;
        display: flex;
        gap: 20px;

        li a {
            color: white;
            text-decoration: none;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }

`

const Cabecalho = (props) => {
    const { nome } = props;
    const [primeiroNome] = nome.split(" ");
    const navigate = useNavigate();

    function deslogar() {
        usuarioService.logout();
        navigate("/login");
    }

    return (
        <HeaderEstilizado>
            <DivEstilizadaHeader>
                <GiOpenBook size="30px" color="white" />
                <p>Olá, {primeiroNome}!</p>
            </DivEstilizadaHeader>
            <NavEstilizado>
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

        </HeaderEstilizado>
    );
}

export default Cabecalho;