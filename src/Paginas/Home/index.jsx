import styled from "styled-components";
import Cabecalho from "../../componentes/Cabecalho";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const MainEstilizada = styled.main`
    margin: 3em 0 !important;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const ContainerTarefas = styled.section`
    display: flex;
    flex-wrap: wrap;
`

const CardTarefasEstilizado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    max-width: 266px;
    background-color: ${(props) => (props.concluido === true ? "#004F4D" : "#BDE038")};
        
    h4 {
        padding: 1em;
        color: #000;

    }
    div.principal {
        padding: 1em;
        border-radius: 5px;
        margin-bottom: 1em;
        cursor: pointer;

        p {
            color: #000;
        }
    }
    div.rodape_card {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 2em;
    }
`

const BotaorCard = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0.5em 1em;
    border: none;
    background-color: ${(props) => (props.tipe === "concluir"? "#44803F" : "#FF5A33")};
    color: white;
    border-radius: 5px;
    cursor: pointer;
`

const Home = (props) => {
    const {concluido} = props;
    const nomeUsuario = localStorage.getItem('nome').toString();
    return (
        <>
            <Cabecalho nome={JSON.parse(nomeUsuario)} />
            <MainEstilizada>
                <h1>Home</h1>
                <ContainerTarefas>
                    <CardTarefasEstilizado concluido={concluido}>
                        <h4>Lavar a louça</h4>
                        <div className="principal">
                            <p>29/07/2024</p>
                            <p>Colocar a louça suja dentro da máquina</p>
                        </div>
                        <div className="rodape_card">
                            <BotaorCard tipe="concluir">
                                <FaCheckCircle /> Concluir
                            </BotaorCard>
                            <BotaorCard tipe="excluir">
                                <MdCancel /> Excluir
                            </BotaorCard>

                        </div>
                    </CardTarefasEstilizado>
                </ContainerTarefas>
            </MainEstilizada>
        </>
    );
}

export default Home;