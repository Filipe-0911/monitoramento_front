import Cabecalho from "../../componentes/Cabecalho";

const Home = () => {
    const nomeUsuario = localStorage.getItem('nome').toString();
    return (
        <>
            <Cabecalho nome={JSON.parse(nomeUsuario)} />
            <h1>Você está na Home</h1>
        </>
    );
}

export default Home;