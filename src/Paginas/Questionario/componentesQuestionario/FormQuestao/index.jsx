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
import { useParams } from "react-router-dom";
import QuestoesService from "../../../../services/QuestoesService";
import useAlertContext from "../../../../Hooks/useAlertContext";
import Alert from "../../../../componentes/Alert";

const DivFinalForm = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`
export default function FormQuestao() {
    const params = useParams();
    const questoesService = new QuestoesService();
    const { dadosAlerta, setAlertaError, setAlertaSuccess } = useAlertContext();

    const [questao, setQuestao] = useState({
        textoQuestao: "",
        respostaCerta: "",
        listaAlternativas: [
            {textoAlternativa: ""},
            {textoAlternativa: ""},
            {textoAlternativa: ""},
        ]
    });

    function setAlternativa1 (alternativa) {
        setQuestao(prevState => ({
            ...prevState,
            listaAlternativas: [
                {textoAlternativa: alternativa},
                prevState.listaAlternativas[1],
                prevState.listaAlternativas[2],
                prevState.listaAlternativas[3],
            ]
        }))
    }

    function setAlternativa2 (alternativa) {
        setQuestao(prevState => ({
            ...prevState,
            listaAlternativas: [
                prevState.listaAlternativas[0],
                {textoAlternativa: alternativa},
                prevState.listaAlternativas[2],
                prevState.listaAlternativas[3]
            ]
        }))
    }

    function setAlternativa3 (alternativa) {
        setQuestao(prevState => ({
            ...prevState,
            listaAlternativas: [
                prevState.listaAlternativas[0],
                prevState.listaAlternativas[1],
                {textoAlternativa: alternativa},
                prevState.listaAlternativas[3]
            ]
        }))
    }
    
    function setRespostaCerta(e) {
        setQuestao(prevState => {
            const indiceRespostaCerta = 3;
            const novasAlternativas = [...prevState.listaAlternativas];
            novasAlternativas[indiceRespostaCerta] = { textoAlternativa: e.target.value };
    
            return {
                ...prevState,
                respostaCerta: e.target.value, 
                listaAlternativas: novasAlternativas 
            };
        });
    }
    

    function adicionaAlternativa(alternativa) {
        setQuestao(prevState => ({
            ...prevState,
            listaAlternativas: [...prevState.listaAlternativas, alternativa]
        }));
    }


    function setTextoQuestao(e) {
        setQuestao(prevState => ({
            ...prevState,
            textoQuestao: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(questao)

        questoesService.adicionaQuestao(params.idProva, params.idMateria, verificaSeAlternativaEhBlankERemoveSeFor(questao)).then(() => {
            limparDadosQuestao();
            setAlertaSuccess("Questão adicionada com sucesso!");
        })
        .catch(err => {
            if (err.response.data.length > 1) {
                for (let i = 0; i < err.response.data.length; i ++) {
                    setAlertaError("O campo " + err.response.data[i].campo + " " + err.response.data[i].mensagem);
                }
            }
        });
    }

    function verificaSeHaTextoQuestaoEDuasAlternativas () {
        return !(questao.textoQuestao !== "" && questao.respostaCerta !== "" && questao.listaAlternativas.length > 0);
    }

    function verificaSeAlternativaEhBlankERemoveSeFor (questao) {
        let listaAlternativasFiltrada = questao.listaAlternativas.filter(alternativa => alternativa.textoAlternativa !== "");
        return {...questao, listaAlternativas: listaAlternativasFiltrada}
    }

    async function limparDadosQuestao () {
        setAlternativa1("");
        setAlternativa2("");
        setAlternativa3("");

        setQuestao(prevState => ({
            ...prevState,
            textoQuestao: "",
            respostaCerta: "",
        }));
    }

    return (
        <FormEstilizado onSubmit={e => handleSubmit(e)} style={{ maxHeight: "95vh" }}>
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
                    placeholder="Escreva a Alternativa 1"
                    onChange={e => setAlternativa1(e.target.value)}
                    defaultValue={questao.listaAlternativas[0].textoAlternativa}
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>
                    Alternativa 2 (Opcional):
                </label>
                <CampoForm
                    nome="respostaCerta"
                    placeholder="Escreva a Alternativa 2"
                    onChange={e => setAlternativa2(e.target.value)}
                    defaultValue={questao.listaAlternativas[1].textoAlternativa}
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>
                    Alternativa 3 (Opcional):
                </label>
                <CampoForm
                    nome="respostaCerta"
                    placeholder="Escreva a Alternativa 3"
                    onChange={e => setAlternativa3(e.target.value)}
                    defaultValue={questao.listaAlternativas[2].textoAlternativa}
                />
            </FieldsetEstilizado>
            <BotaoEstilizado disabled={verificaSeHaTextoQuestaoEDuasAlternativas()}>
                Salvar Questão
            </BotaoEstilizado>
        </FormEstilizado>
    )
}