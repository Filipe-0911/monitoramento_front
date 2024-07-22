import styled from "styled-components";
import { TiThMenu } from "react-icons/ti";
import { RiCloseLargeFill } from "react-icons/ri";

export const ImgIconeDoHeaderEstilizado = styled.img`
    width: 30px;
`

export const HeaderEstilizado = styled.header`
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100vw;
    background-color: rgba(13, 13, 13, 0.95);
    display:flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 57px;
    
    @media (max-width: 562px) {
        transition-duration: 0.35s;
        align-items: ${(props) => (props.open ? 'flex-start' : 'center')};
        width: ${(props) => (props.open ? '70vw' : '100vw')};
        right: 0;
        border: 1px solid transparent;
        /* border-radius: 10px; */
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        
    }

`

export const DivEstilizadaHeader = styled.div`
    position: absolute;
    left: 0;
    top:0;
    border: 1px solid transparent;
    box-shadow: 5px 5px 5px 1px rgba(255,255,255,0.1);
    background-color: #1F2024;
    border-radius: 5px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 20px;
    width: 170px;
    color: #FFFFFF;
    @media (max-width: 562px) {
        padding: 0;
        width: 150px;
        min-height: 56px;

        p {
            font-size: 16px;
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

        li {
            
            a {
                position: relative;
                text-decoration: none;
                font-size: 24px;
                cursor: pointer;
                color: #fff;
                transition: transform .2s;
                letter-spacing: 1px;
                padding: 10px 0;
            }

            a:after {
                content: '';
                position: absolute;
                /* background-color: #ff3c78; */
                background-color: #3CA6A6;
                height: 3px;
                width: 0;
                left: 0;
                bottom: -5px;
                transition: 0.2s;
            }

            a:hover:after {
                width: 100%;
                transform: translate(0, -0.8rem);
            }

        }
    }

    @media (max-width: 562px) {
        ul {
            flex-direction: column;
            align-items: flex-end;
            display: ${(props) => (props.open ? 'flex' : 'none')};
            padding: 2em;

        }
    }

`
export const MenuHamburguer = styled(TiThMenu)`
    cursor: pointer;
    width: 30px;

    @media (max-width: 562px) {
        color: #fff;
        display: block;
        width: 50px;
        height: 50px;
    }
`

export const CloseMenuHamburguer = styled(RiCloseLargeFill)`
    cursor: pointer;
    width: 30px;
    
    @media (max-width: 562px) {
        color: #fff;
        display: block;
        width: 50px;
        height: 50px;
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