import styled from "styled-components";

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

    @media (max-width: 820px) {
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: ${(props) => (props.open ? 'flex-start' : 'center')};
        width: ${(props) => (props.open ? '50vw' : '100vw')};
        transition-duration: 0.35s;
        right: 0;
    }
    
    @media (max-width: 562px) {
        width: ${(props) => (props.open ? '80vw' : '100vw')};
        border: 1px solid transparent;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        
    }

`

export const DivEstilizadaHeader = styled.div`
    border: 1px solid transparent;
    box-shadow: 5px 5px 5px 1px rgba(255,255,255,0.1);
    background-color: #1F2024;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    padding: 10px 10px;
    color: #FFFFFF;

    @media (max-width: 562px) {
        padding: 0;
        width: 250px;
        min-height: 56px;

        p {
            font-size: 16px;
        }
    }

`

export const NavEstilizado = styled.nav`
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    gap: 20px;
    margin: 0 auto;

    ul {
        list-style: none;
        display: flex;
        gap: 20px;
        
        li {            
            display: flex;
            align-items: center;
            gap: 5px;
            a {
                position: relative;
                text-decoration: none;
                font-size: 24px;
                cursor: pointer;
                color: #fff;
                transition: transform .2s;
                letter-spacing: 1px;
            }

            a:after {
                content: '';
                position: absolute;
                background-color: #3CA6A6;
                height: 3px;
                width: 0;
                left: 0;
                bottom: -15px;
                transition: 0.2s;
            }

            a:hover:after {
                width: 100%;
                transform: translate(0, -0.8rem);
            }

        }
    }

    @media (max-width: 1024px) {
        justify-content: flex-end;
        margin: 0 1em;
    }

    @media (max-width: 820px) {
        flex-direction: column;
        align-items: flex-start;
        ul {
            flex-direction: column;
            align-items: flex-start;
            display: ${(props) => (props.open ? 'flex' : 'none')};
            padding: 2em;

        }

    }
    @media (max-width: 562px) {
        margin: 3em 0 0 0;
    }

`

export const DivPaiDoMenuEBotaoMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    @media (max-width: 820px) {
        margin-right: 10px;
        flex-direction: column;
        align-items: flex-start;
    }

    @media (max-width: 562px) {
        display: flex;
        align-items: flex-end;
    }
`