const Footer = () => {
    const anoAtual = new Date().getFullYear();
    return(
        <footer>
            <p>Todos os direitos reservados &copy; {anoAtual}</p>
        </footer>
    );
}

export default Footer;