import React, { useEffect, useState } from 'react';
import { SectionQuestionario, H2QuestionarioEstilizado, FormEstilizadoQuestionario } from './componentesQuestionario/SectionQuestionario';
import { BotaorCard } from '../../componentes/ComponentesHome';
import { FormEstilizado } from '../../componentes/ContainerLoginEstilizado';
import useUserContext from '../../Hooks/useUserContext';
import { useNavigate, useParams } from 'react-router-dom';
import QuestoesService from '../../services/QuestoesService';
import styled from 'styled-components';
import BotaoEstilizado from '../../componentes/Botao';
import useAlertContext from '../../Hooks/useAlertContext';
import Alert from '../../componentes/Alert';
import { InputRadioEstilizado } from '../../componentes/InputRadioEstilizado';


const DivMensagemQuestoesNaoEncontradas = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  width: 60%;
`
const DivEstatisticasEstilizada = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    gap: 0.5em;
    align-items: center;
    h2, p {
      font-size: 22px;
    }
  }
  
`

function Alternativas({ index, alternativa, setAlternativasSelecionadas, alternativasSelecionadas, darkMode }) {
  const { textoAlternativa } = alternativa;
  const opcoesAlternativas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const handleChange = (e) => {
    setAlternativasSelecionadas(alternativa);
  }
  let corDaLetra = darkMode ? "white" : "black";
  let corDeFundo = darkMode ? "rgba(217, 217, 217, 0.5)" : "rgba(106, 106, 106, 0.5)";

  return (
    <li>
      <label style={{ display: 'flex', gap: '5px' }}>
        <InputRadioEstilizado type='radio' name='opcao' onChange={e => handleChange(e)} />
        <p>{opcoesAlternativas[index]}) </p>
        <p id='resposta_escolhida' style={{
          backgroundColor: alternativasSelecionadas.textoAlternativa === textoAlternativa && corDeFundo,
          color: alternativasSelecionadas.textoAlternativa === textoAlternativa && corDaLetra,
          cursor: 'pointer'
        }}>{textoAlternativa}</p>
      </label>
    </li>
  )
}


export default function Questionario() {
  const { usuarioPrefereModoDark } = useUserContext();
  const [alternativasSelecionadas, setAlternativasSelecionadas] = useState({ id: 0, textoAlternativa: "" });
  const questoesService = new QuestoesService();
  const params = useParams();
  const navigate = useNavigate();
  const { setAlertaError, dadosAlerta, setAlertaSuccess } = useAlertContext();
  const [enviouResposta, setEnviouResposta] = useState(false);

  const [questoesRespondidas, setQuestoesRespondidas] = useState({ questoesFeitas: 0, questoesCorretas: 0 })

  const [questao, setQuestao] = useState({
    content: [],
    page: {
      number: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    }
  });

  useEffect(() => {
    questoesService.buscaQuestoes(params.idProva, params.idMateria).then((res) => {
      if (res.status === 200) return setQuestao(res.data);
      setEnviouResposta(false);

    }).catch(err => console.error(err));
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    if (alternativasSelecionadas !== "") {
      questoesService.verificaSeRepostaEstaCorreta(params.idProva, params.idMateria, questao.content[0].id, alternativasSelecionadas)
        .then(response => {
          if (response.acertou) {
            setAlertaSuccess(response.resposta)
            setEnviouResposta(true);
          } else {
            setAlertaError(response.resposta)
          }
          setQuestoesRespondidas((prevState) => ({
            questoesFeitas: prevState.questoesFeitas + 1,
            questoesCorretas: prevState.questoesCorretas + (response.acertou ? 1 : 0)
          }))
        })

    } else {
      setAlertaError("Você deve escolher pelo menos uma alternativa antes de enviar a resposta");
    }
  }

  function buscaProxQuestao(paginaParaBusca) {
    setEnviouResposta(false);
    questoesService.buscaQuestoes(params.idProva, params.idMateria, paginaParaBusca).then((res) => {
      setQuestao(res.data);
    }).catch(err => console.error(err));
  }

  return (
    <SectionQuestionario>
      {
        questao.content.length > 0 &&
        <>
          <FormEstilizadoQuestionario $questionario $darkMode={usuarioPrefereModoDark} onSubmit={(e) => handleSubmit(e)}>
            <H2QuestionarioEstilizado>
              {questao.content[0].nomeMateria}
            </H2QuestionarioEstilizado>
            <p>
              {questao.content[0].textoQuestao}
            </p>
            <ul>
              {
                questao.content[0].listaAlternativas.map((alternativa, index) => (
                  <Alternativas
                    index={index}
                    alternativa={alternativa}
                    key={alternativa.id}
                    setAlternativasSelecionadas={setAlternativasSelecionadas}
                    alternativasSelecionadas={alternativasSelecionadas}
                    darkMode={usuarioPrefereModoDark}
                  />
                ))
              }
            </ul>
            <section style={{ display: 'flex', justifyContent: 'space-evenly', margin: "1em 0" }}>
              <BotaorCard $type="concluir" disabled={enviouResposta}>
                Salvar Resposta
              </BotaorCard>

            </section>
          </FormEstilizadoQuestionario>
          <section style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', gap: "1em" }}>
            <BotaoEstilizado
              disabled={false}
              onClick={() => navigate(-1)}
            >
              Voltar
            </BotaoEstilizado>
            <BotaoEstilizado
              disabled={(questao.page.number < (questao.page.totalPages - 1))}
              onClick={() => buscaProxQuestao(questao.page.number - 1)}
            >
              Questão anterior
            </BotaoEstilizado>
            <BotaoEstilizado
              disabled={!(questao.page.totalElements > 1 && questao.page.number < questao.page.totalPages - 1)}
              onClick={() => buscaProxQuestao(questao.page.number + 1)}
            >
              Próxima questão
            </BotaoEstilizado>
          </section>
          <DivEstatisticasEstilizada>
            <div>
              <h2>
                Questões respondidas:
              </h2>
              <p>
                {questoesRespondidas.questoesFeitas.toString()}
              </p>
            </div>
            <div>
              <h2>
                Questões corretas:
              </h2>
              <p>
                {questoesRespondidas.questoesCorretas.toString()}
              </p>
            </div>
          </DivEstatisticasEstilizada>
          <Alert dados={dadosAlerta} />
        </>
      }
      {
        questao.content.length === 0 &&
        <DivMensagemQuestoesNaoEncontradas>
          <h2>
            Ops...
          </h2>
          <p>
            Você não tem questões adicionadas a esta matéria
          </p>
          <BotaoEstilizado
            disabled={false}
            onClick={() => navigate(-1)}
          >
            Voltar
          </BotaoEstilizado>
        </DivMensagemQuestoesNaoEncontradas>
      }
    </SectionQuestionario>
  )
}
