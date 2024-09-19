import styled from "styled-components";
import CampoForm from "../../../../componentes/CampoForm";
import { BotaorCard } from "../../../../componentes/ComponentesHome";
import { FormEstilizado } from "../../../../componentes/ContainerLoginEstilizado";
import { FaPlus } from "react-icons/fa";
import { FieldsetEstilizado } from "../../../../componentes/Fieldset";
import { useState } from "react";
import { forEachChild } from "typescript";
import BotaoEstilizado from "../../../../componentes/Botao";
import TextAreaEstilizado from "../../../../componentes/TextAreaEstilizado";

const DivFinalForm = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

export default function FormQuestao() {
    const [questao, setQuestao] = useState({
        textoQuestao: "",
        respostaCerta: "",
        listaAlternativas: []
    });
    const [alternativa1, setAlternativa1] = useState({textoAlternativa: ""});
    const [alternativa2, setAlternativa2] = useState({textoAlternativa: ""});
    const [alternativa3, setAlternativa3] = useState({textoAlternativa: ""});

    function pegaDadosDaAlternativa(dadosAlternativa) {
        setQuestao(prevState => {
            return {
                ...prevState,
                listaAlternativas: [...prevState.listaAlternativas, dadosAlternativa]
            }
        })
    }

    function adicionaAlternativa(alternativa) {
        setQuestao(prevState => ({
            ...prevState,
            listaAlternativas: [...prevState.listaAlternativas, alternativa]
        }));
    }

    function setRespostaCerta(e) {
        setQuestao(prevState => ({
            ...prevState,
            respostaCerta: e.target.value
        }))
    }

    function setTextoQuestao(e) {
        setQuestao(prevState => ({
            ...prevState,
            textoQuestao: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setaAlternativas().then(() => limparDadosQuestao());

        //Adicionar ao banco de dados

                
    }

    async function setaAlternativas () {
        if (alternativa1.textoAlternativa !== "") {
            adicionaAlternativa(alternativa1);
        }
        if (alternativa2.textoAlternativa !== "") {
            adicionaAlternativa(alternativa2);
        }
        if (alternativa3.textoAlternativa !== "") {
            adicionaAlternativa(alternativa3);
        }
    }
    async function limparDadosQuestao () {
        setQuestao({
            textoQuestao: "",
            respostaCerta: "",
            listaAlternativas: []
        });
    }

    return (
        <FormEstilizado onSubmit={e => handleSubmit(e)}>
            <h2>
                Formulário de questão
            </h2>
            <FieldsetEstilizado>
                <label>
                    Texto Questão:
                </label>
                <TextAreaEstilizado
                    name="textoQuestao"
                    placeholder="Escreva a questão"
                    onChange={e => setTextoQuestao(e)}
                    defaultValue={questao.textoQuestao}
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>
                    Resposta Correta:
                </label>
                <CampoForm
                    nome="respostaCerta"
                    placeholder="Escreva a resposta correta"
                    onChange={e => setRespostaCerta(e)}
                    defaultValue={questao.respostaCerta}
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>
                    Alternativa 1:
                </label>
                <CampoForm
                    nome="respostaCerta"
                    placeholder="Escreva a resposta correta"
                    onChange={e => setAlternativa1({textoAlternativa: e.target.value})}
                    defaultValue={alternativa1.textoAlternativa}
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>
                    Alternativa 2 (Opcional):
                </label>
                <CampoForm
                    nome="respostaCerta"
                    placeholder="Escreva a resposta correta"
                    onChange={e => setAlternativa2({textoAlternativa: e.target.value})}
                    defaultValue={alternativa2.textoAlternativa}
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>
                    Alternativa 3 (Opcional):
                </label>
                <CampoForm
                    nome="respostaCerta"
                    placeholder="Escreva a resposta correta"
                    onChange={e => setAlternativa3({textoAlternativa: e.target.value})}
                    defaultValue={alternativa3.textoAlternativa}
                />
            </FieldsetEstilizado>
            <BotaoEstilizado>
                Salvar Questão
            </BotaoEstilizado>

        </FormEstilizado>
    )
}
