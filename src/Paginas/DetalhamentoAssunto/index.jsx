import { useNavigate, useParams } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import BotaoEstilizado from "../../componentes/Botao";
import AssuntoService from "../../services/AssuntoService";
import { useEffect, useState } from "react";
import TextAreaEstilizado from "../../componentes/TextAreaEstilizado";
import styled from "styled-components";

const SectionDetalhamentoAssuntoEstilizada = styled.section`
    width: 70%;
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
    box-shadow: 30px 29px 25px 0px rgba(0,0,0,0.6);

    @media (max-width: 820px) {
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
            comentarios: event.target.value
        }));
    }

    const adicionarComentarios = (event) => {
        event.preventDefault();
        console.log(assunto.comentarios)
        const dadosParaEnvioDeComentario = { idProva: parametros.idProva, idMateria: parametros.idMateria, idAssunto: assunto.id, comentarios: assunto.comentarios}
        try {
            assuntoService.adicionarComentarios(dadosParaEnvioDeComentario).then(response => {
                console.log(response);

                setAssunto({
                    ...assunto,
                    comentarios: response.comentarios
                });
            }).catch(error => console.log(error));
        } catch (error) {
            
        }
    }

    return (
        <>
            <Cabecalho />
            <MainEstilizada>
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
                        <TextAreaEstilizado 
                            style={{ color: 'black' }} 
                            defaultValue={assunto.comentarios}
                            onChange={handleChanger}
                        />
                        <BotaoEstilizado
                            onClick={(e) => adicionarComentarios(e)}
                        >
                            Adicionar Comentários
                        </BotaoEstilizado>
                    </FormularioDeAdicaoDeComentariosAoAssunto>

                </SectionDetalhamentoAssuntoEstilizada>

            </MainEstilizada>
        </>
    );

}

export default DetalhamentoAssunto;