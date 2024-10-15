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
import Loader from '../../componentes/Loader';
import { Alternativas } from './componentesQuestionario/Alternativas';
import ParagrafoPreWrap from '../../componentes/ParagrafoPreWrap';

export const DivMensagemQuestoesNaoEncontradas = styled.div`
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
export default function Questionario() {
  const [isLoading, setIsLoading] = useState(true);
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
      if (res.status === 200) {
        setQuestao(res.data);
      } else {
        setEnviouResposta(false);
      }
      setIsLoading(false);

    }).catch(err => {
      console.error(err);
      setIsLoading(false)
    });
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
  const estaNaPrimeiraPaginaDeQuestoes = !(questao.page.number > 0);
  const naoHaProximaQuestao = !(questao.page.totalElements > 1 && questao.page.number < questao.page.totalPages - 1);

  return (
    <SectionQuestionario>
      {
        isLoading ? <Loader /> :
          questao.content.length > 0 &&
          <>
            <FormEstilizadoQuestionario $questionario $darkMode={usuarioPrefereModoDark} onSubmit={(e) => handleSubmit(e)}>
              <H2QuestionarioEstilizado>
                {questao.content[0].nomeMateria}
              </H2QuestionarioEstilizado>
              <section style={{ display: 'flex', width: "100%", justifyContent: "space-between", marginBottom: "1em" }}>
                <h3>
                  Assunto: <u>{questao.content[0].nomeAssunto}</u>
                </h3>
                <p>
                  {questao.page.number + 1}/{questao.page.totalElements}
                </p>
              </section>
              <ParagrafoPreWrap>
                {questao.content[0].textoQuestao}
              </ParagrafoPreWrap>
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
                disabled={estaNaPrimeiraPaginaDeQuestoes}
                onClick={() => buscaProxQuestao(questao.page.number - 1)}
              >
                Questão anterior
              </BotaoEstilizado>
              <BotaoEstilizado
                disabled={naoHaProximaQuestao}
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
        questao.content.length === 0 && isLoading === false &&
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
