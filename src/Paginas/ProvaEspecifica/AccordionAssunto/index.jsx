import Accordion from "../../../componentes/Accordion";
import { BotaorCard } from "../../../componentes/ComponentesHome";
import { DivBotoesCrudMateria } from "..";
import styled from "styled-components";

import { FaPencilAlt, FaQuestion } from "react-icons/fa";
import { MdCancel, MdOutlineAddToPhotos } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const LiAcorddionEstilizado = styled.li`
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    @media (max-width: 562px) {
        align-items: space-between;
        justify-content: center;
        gap: 1em;
    }
`

const SectionBotoesCrudAccordion = styled.section`
    display: flex;
    gap: 1em;
    
    @media (max-width: 820px) { 
        max-width: 346px;
        flex-direction: column;
    }
    @media (max-width: 562px) {
        width: 50%;
    }
`

const SectionDadosDoAssuntoEstilizado = styled.section`
    display: flex;
    flex-direction: column;

    h5 {
        font-size: 16px;
        max-width: 480px;  
    }
    
    @media (max-width: 820px) {
        h5, p {
            padding: 1em;
            text-align: center;
            width: 100%;
        }
        gap: 1em;
    }

    @media (max-width: 562px) {
        h5, p {
            font-size: 14px;
            width: 100%;
        }
    }
`

export default function AccordionAssunto({ prova, capturaCliqueBotaoUsuario, excluirMateria }) {
    const navigate = useNavigate();
    return (
        prova.listaDeMaterias.map(materia => {
            return (
                <Accordion key={materia.id} titulo={`Matéria: ${materia.nome}`}>
                    <input type="number" defaultValue={materia.id} hidden id="idMateria" />
                    <ul>
                        {materia.listaDeAssuntos.map(assunto => {

                            return (
                                <LiAcorddionEstilizado key={assunto.id}>
                                    <SectionDadosDoAssuntoEstilizado>
                                        <h5>
                                            {assunto.nome}
                                        </h5>
                                        <p>
                                            Quantidade de pdfs: {assunto.quantidadePdf}
                                        </p>
                                        <p>
                                            Questões feitas: {assunto.idQuestoes.length}
                                        </p>

                                        {assunto.comentarios
                                            ?
                                            <p>
                                               Resumo: Possui resumo
                                            </p>
                                            :
                                            <p>
                                                Resumo: Crie um resumo em <span style={{ color: 'red' }}>Ver Detalhes</span>
                                            </p>

                                        }

                                    </SectionDadosDoAssuntoEstilizado>
                                    <SectionBotoesCrudAccordion>
                                        <BotaorCard
                                            onClick={(e) => capturaCliqueBotaoUsuario(e, assunto.id)}
                                            $type="excluir"
                                            name="excluir_assunto"
                                        >
                                            <MdCancel size={15} color="white" />
                                            Excluir Assunto
                                        </BotaorCard>
                                        <BotaorCard
                                            $type="editar"
                                            onClick={(e) => capturaCliqueBotaoUsuario(e, assunto.id)}
                                            name="editar_assunto"
                                        >
                                            <FaPencilAlt color="orange" size={15} />
                                            Editar Assunto
                                        </BotaorCard>
                                        <BotaorCard
                                            onClick={(e) => capturaCliqueBotaoUsuario(e, assunto.id)}
                                            $type="adicionar"
                                            name="adicionar_questao"
                                        >
                                            <FaQuestion size={15} color="red" />
                                            Adicionar Questão
                                        </BotaorCard>
                                        <BotaorCard
                                            onClick={() => navigate(`/provas/${prova.id}/materias/${materia.id}/assuntos/${assunto.id}`)}
                                            $type="adicionar"
                                            name="detalhes_assunto"
                                        >
                                            <TbListDetails size={15} color="red" />
                                            Ver detalhes
                                        </BotaorCard>
                                    </SectionBotoesCrudAccordion>
                                </LiAcorddionEstilizado>
                            );
                        })}
                    </ul>
                    <DivBotoesCrudMateria>
                        <BotaorCard
                            onClick={(e) => capturaCliqueBotaoUsuario(e)}
                            $type="adicionar"
                            name="adicionar_assunto"
                        >
                            <MdOutlineAddToPhotos size={15} />
                            Adicionar Assunto
                        </BotaorCard>
                        <BotaorCard
                            onClick={() => excluirMateria(materia.id)}
                            $type="excluir"
                            name="excluir_materia"
                        >
                            <MdCancel size={15} />
                            Excluir Materia
                        </BotaorCard>
                        <BotaorCard
                            onClick={(e) => capturaCliqueBotaoUsuario(e)}
                            $type="editar"
                            name="editar_materia"
                        >
                            <FaPencilAlt size={15} />
                            Editar Materia
                        </BotaorCard>
                    </DivBotoesCrudMateria>
                </Accordion>
            );
        })
    );
}