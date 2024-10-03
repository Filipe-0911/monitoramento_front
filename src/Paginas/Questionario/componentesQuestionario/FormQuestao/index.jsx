import styled from "styled-components";
import CampoForm from "../../../../componentes/CampoForm";
import { BotaorCard } from "../../../../componentes/ComponentesHome";
import { FormEstilizado } from "../../../../componentes/ContainerLoginEstilizado";
import { FaPlus } from "react-icons/fa";
import { FieldsetEstilizado } from "../../../../componentes/Fieldset";
import { useEffect, useState } from "react";
import { forEachChild } from "typescript";
import BotaoEstilizado from "../../../../componentes/Botao";
import TextAreaEstilizado from "../../../../componentes/TextAreaEstilizado";
import { useParams } from "react-router-dom";
import QuestoesService from "../../../../services/QuestoesService";
import useAlertContext from "../../../../Hooks/useAlertContext";
import Alert from "../../../../componentes/Alert";
import { InputRadioEstilizado } from "../../../../componentes/InputRadioEstilizado";
import InputAlternativaQuestao from "./InputAlternativaQuestao";

const DivFinalForm = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`
export default function FormQuestao({ $questaoParaEditar = null, setQuestaoParaEditar = null }) {
    const params = useParams();
    const questoesService = new QuestoesService();
    const { dadosAlerta, setAlertaError, setAlertaSuccess } = useAlertContext();

    const [questao, setQuestao] = useState({
        textoQuestao: "",
        listaAlternativas: [
            {textoAlternativa: "", ehCorreta: false},
            {textoAlternativa: "", ehCorreta: false},
            {textoAlternativa: "", ehCorreta: false},
            {textoAlternativa: "", ehCorreta: false},
        ]
    });

    useEffect(() => {
        $questaoParaEditar !== null && setQuestao($questaoParaEditar)
    },[])

    function setTextoAlternativa(textoAlternativaRecebido, index) {
        setQuestao((prevState) => ({
            ...prevState,
            listaAlternativas: prevState.listaAlternativas.map((alternativa, indexAlternativa) => 
                indexAlternativa === index 
                    ? { ...alternativa, textoAlternativa: textoAlternativaRecebido } 
                    : alternativa
            )
        }));
    }
    
    function setEhCorreto(checked, index) {
        setQuestao((prevState) => ({
            ...prevState,
            listaAlternativas: prevState.listaAlternativas.map((alternativa, indexAlternativa) => 
                indexAlternativa === index 
                    ? { ...alternativa, ehCorreta: checked } 
                    : { ...alternativa, ehCorreta: false }
            )
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
        if ($questaoParaEditar) {
            questoesService.editarQuestao(params.idProva, params.idMateria, $questaoParaEditar.id, questao).then((res) => {
                setAlertaSuccess("Questão editada com sucesso!");
                setQuestaoParaEditar(res.data);
            })
            return;
        }

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
        return !(questao.textoQuestao !== "" && questao.listaAlternativas.length > 1 );
    }

    function verificaSeAlternativaEhBlankERemoveSeFor (questao) {
        let listaAlternativasFiltrada = questao.listaAlternativas.filter(alternativa => alternativa.textoAlternativa !== "");
        return {...questao, listaAlternativas: listaAlternativasFiltrada}
    }

    async function limparDadosQuestao () {
        setQuestao({
            textoQuestao: "",
            listaAlternativas: [
                {textoAlternativa: "", ehCorreta: false},
                {textoAlternativa: "", ehCorreta: false},
                {textoAlternativa: "", ehCorreta: false},
                {textoAlternativa: "", ehCorreta: false},
            ]
        });
    }

    return (
        <FormEstilizado onSubmit={e => handleSubmit(e)} style={{ maxHeight: "95vh", minWidth:"50vw" }}>
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
            <h3>
                Marque a alternativa correta
            </h3>
            {
                questao.listaAlternativas.map((alternativa, index) => (
                    <InputAlternativaQuestao
                        key={index}
                        index={index}
                        valorAlternativaDefault={alternativa}
                        setEhCorreto={setEhCorreto}
                        setAlternativa={setTextoAlternativa}
                    />
                ))
            }

            <BotaoEstilizado disabled={verificaSeHaTextoQuestaoEDuasAlternativas()}>
                Salvar Questão
            </BotaoEstilizado>
        </FormEstilizado>
    )
}