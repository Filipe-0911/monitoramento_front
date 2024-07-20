import styled from "styled-components";

const FooterEstilizado = styled.footer`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1.9em 0;
    background-color: #3CA6A6;
    p {
        color: #fff;
        font-size: 18px;
        box-sizing:border-box;
    }
`

const Footer = () => {
    const anoAtual = new Date().getFullYear();
    return(
        <FooterEstilizado>
            <p>Todos os direitos reservados &copy; {anoAtual}</p>
        </FooterEstilizado>
    );
}

export default Footer;