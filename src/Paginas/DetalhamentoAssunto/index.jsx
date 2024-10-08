import { useNavigate, useParams } from "react-router-dom";
import BotaoEstilizado from "../../componentes/Botao";
import AssuntoService from "../../services/AssuntoService";
import { useEffect, useState } from "react";
import styled from "styled-components";
import EditorDeTexto from "../../componentes/EditorDeTexto";
import useAlertContext from "../../Hooks/useAlertContext";
import Alert from "../../componentes/Alert"

const SectionDetalhamentoAssuntoEstilizada = styled.section`
    width: 90%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: #000;
    border: 1px solid transparent;
    border-radius: 8px;

    background-color: rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: 30px 29px 25px 0px rgba(0,0,0,0.6);
    -moz-box-shadow: 30px 29px 25px 0px rgba(0,0,0,0.6);
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.6);

    @media (max-width: 820px) {
        width: 90%;
        
    }
    @media (max-width: 562px) {
        width: 100%; 
    }
`
const FormularioDeAdicaoDeComentariosAoAssunto = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 100%;
    min-height: 100%;
    padding: 2em;

    label {
        font-size: 24px;
        color: #6a6a6a;
        font-weight: bold;
    }

    @media (max-width: 820px) {
        padding: 0;
        width: 100%;
    }
`

const DetalhamentoAssunto = () => {
    const assuntoService = new AssuntoService();
    const [assunto, setAssunto] = useState("");
    const parametros = useParams();
    const navigate = useNavigate();
    const { dadosAlerta, setAlertaError, setAlertaSuccess } = useAlertContext();

    useEffect(() => {
        const { idProva, idMateria, idAssunto } = parametros;
        try {
            assuntoService.buscaAssuntoEspecifico(idProva, idMateria, idAssunto).then(response => {
                setAssunto(response);
            });

        } catch (error) {
            console.log(error);
        }
    }, [parametros.id]);

    const handleChanger = (event) => {
        setAssunto(prevAssunto => ({
            ...prevAssunto,
            comentarios: event
        }));
    }

    const adicionarComentarios = (event) => {
        event.preventDefault();
        const dadosParaEnvioDeComentario = { idProva: parametros.idProva, idMateria: parametros.idMateria, idAssunto: assunto.id, comentarios: assunto.comentarios }
        try {
            assuntoService.adicionarComentarios(dadosParaEnvioDeComentario).then(response => {
                setAssunto({
                    ...assunto,
                    comentarios: response.comentarios
                });
                setAlertaSuccess("Comentário adicionado com sucesso!");
            }).catch(error => console.log(error));
        } catch (error) {
            setAlertaError(error.response?.data);
        }
    }

    return (
        <>
            <h1>{assunto.nome}</h1>
            <SectionDetalhamentoAssuntoEstilizada>
                <section style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '30%', margin: '1em 0' }}>
                        <BotaoEstilizado
                            onClick={() => navigate(-1)}
                        >
                            Voltar
                        </BotaoEstilizado>

                    </div>
                </section>
                <FormularioDeAdicaoDeComentariosAoAssunto>
                    <label>
                        Comentários:
                    </label>
                    <EditorDeTexto
                        handleUpdate={handleChanger}
                        defaultValue={assunto.comentarios}
                    />
                    <BotaoEstilizado
                        onClick={(e) => adicionarComentarios(e)}
                    >
                        Adicionar Comentários
                    </BotaoEstilizado>
                </FormularioDeAdicaoDeComentariosAoAssunto>

            </SectionDetalhamentoAssuntoEstilizada>
            <Alert dados={dadosAlerta}/>
        </>
    );

}

export default DetalhamentoAssunto;