import React from 'react';
import { SectionQuestionario, H2QuestionarioEstilizado, FormEstilizadoQuestionario } from './componentesQuestionario/SectionQuestionario';
import { BotaorCard } from '../../componentes/ComponentesHome';
import { FormEstilizado } from '../../componentes/ContainerLoginEstilizado';
import useUserContext from '../../Hooks/useUserContext';

export default function Questionario() {
  const { usuarioPrefereModoDark } = useUserContext();
  return (
    <SectionQuestionario>
      <FormEstilizadoQuestionario $questionario $darkMode={usuarioPrefereModoDark} >
        <H2QuestionarioEstilizado>
          Nome Matéria
        </H2QuestionarioEstilizado>
        <p>
          Texto do questionário
        </p>
        <ul>
          <li>
            <BotaorCard $type="detalhar">
              a)
            </BotaorCard> 
            <span>
              resposta 1
            </span>
          </li>

          <li>
            <BotaorCard $type="detalhar">
              b)
            </BotaorCard> 
            <span>
              resposta 2
            </span>
          </li>

          <li>
            <BotaorCard $type="detalhar">
              c)
            </BotaorCard> 
            <span>
              resposta 3
            </span>
          </li>

          <li>
            <BotaorCard $type="detalhar">
              d)
            </BotaorCard> 
            <span>
              resposta 4
            </span>
          </li>

        </ul>
        <section style={{ display: 'flex', justifyContent: 'space-evenly', margin: "1em 0" }}>
          <BotaorCard $type="detalhar">
            Questão anterior
          </BotaorCard>
          <BotaorCard $type="concluir">
            Salvar Resposta
          </BotaorCard>
          <BotaorCard $type="detalhar">
            Próxima questão
          </BotaorCard>
        </section>
      </FormEstilizadoQuestionario>
    </SectionQuestionario>
  )
}
