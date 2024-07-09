import styled from "styled-components";
import { TiThMenu } from "react-icons/ti";

export const HeaderEstilizado = styled.header`
    position: fixed;
    top: 0;
    width: 100vw;
    background-color: #1F2024;
    display:flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 562px) {
        align-items: ${(props) => (props.open ? 'flex-start' : 'center')};
        width: ${(props) => (props.open ? '70vw' : '100vw')};
        right: 0;
    }

`

export const DivEstilizadaHeader = styled.div`
    position: relative;
    left: 0;
    border: 2px solid rgba(0, 79, 77, 1);
    box-shadow: 5px 5px 5px 2px rgba(0, 79, 77, 0.2);
    background-color: #1F2024;
    border-radius: 5px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 20px;
    width: 170px;

    p {
        color: rgba(0, 79, 77, 1);
    }

    @media (max-width: 562px) {
        padding: 0;
        width: 150px;

        p {
            font-size: 14px;
        }
    }

`

export const NavEstilizado = styled.nav`
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

    @media (max-width: 562px) {
        ul {
            flex-direction: column;
            align-items: flex-end;
            display: ${(props) => (props.open ? 'flex' : 'none')};
            padding: 0 2em;

        }
    }

`
export const MenuHamburguer = styled(TiThMenu)`
    cursor: pointer;
    color: #fff;
    width: 30px;

    @media (max-width: 562px) {
        display: block;
    }
`

export const DivPaiDoMenuEBotaoMenu = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    @media (max-width: 562px) {
        margin: 0;
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-end;
    }
`