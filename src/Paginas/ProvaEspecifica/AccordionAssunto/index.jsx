import Accordion from "../../../componentes/Accordion";
import { BotaorCard } from "../../../componentes/ComponentesHome";
import styled from "styled-components";

import { FaPencilAlt, FaQuestion } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useProvaContext } from "../../../Hooks/useProvaContext";
import { DivBotoesCrudMateria } from "../ComponentesProvaEspecifica";
import useUserContext from "../../../Hooks/useUserContext";
import { RiCloseLargeFill } from "react-icons/ri";

export const LiAcorddionEstilizado = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    text-align: left;
    padding: 1em 3em;

    @media (max-width: 820px) {
        margin: auto;

    }
    @media (max-width: 562px) {
        align-items: flex-start;
        justify-content: space-evenly;
        gap: 1em;
        padding: 1em 0;
    }
`

const SectionBotoesCrudAccordion = styled.section`
    display: flex;
    gap: 1em;
    max-width: 50%;

    
    @media (max-width: 1500px) { 
        flex-direction: column;
        justify-content: flex-start;
        
    }
    @media (max-width:820px) {
        max-width: 346px;
    }
    @media (max-width: 562px) {
        width: 50%;
    }
`

const SectionDadosDoAssuntoEstilizado = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h5 {
        font-size: 20px;
        max-width: 480px;  
        color: ${props => props.$darkMode ? "#ffffff" : "#000000"}
    }

    p{
        color: ${props => props.$darkMode ? "#ffffff" : "#000000"};
        font-size: 16px;
    }
    
    @media (max-width: 820px) {
        margin: auto;
        h5, p {
            text-align: center;
            width: 100%;
        }
        gap: 1em;
    }

    @media (max-width: 562px) {
        max-width: 50%;
        
        h5, p {
            font-size: 16px !important;
            word-wrap: break-word;
            max-width: 100%;
        }
    }
`

export default function AccordionAssunto({
    excluirMateria,
    excluirAssunto,
    setModalIsOpen,
    setAcaoUsuario }) {

    const navigate = useNavigate();

    const {
        setIdAssunto,
        setIdMateria,
        prova
    } = useProvaContext();

    function adicionarAssunto(idMateria) {
        setAcaoUsuario("adicionar_assunto")
        setIdMateria(idMateria);
        setModalIsOpen();
    }
    function editarMateria(idMateria) {
        setIdMateria(idMateria);
        setAcaoUsuario("editar_materia")
        setModalIsOpen()
    }
    function editarAssunto(idMateria, idAssunto) {
        setIdMateria(idMateria);
        setIdAssunto(idAssunto);
        setAcaoUsuario("editar_assunto")
        setModalIsOpen();
    }
    function adicionarQuestao(idMateria, idAssunto) {
        setIdMateria(idMateria);
        setIdAssunto(idAssunto);
        setAcaoUsuario("adicionar_questao")
        setModalIsOpen();
    }

    const { usuarioPrefereModoDark } = useUserContext();
    return (
        prova.listaDeMaterias.map(materia => {
            return (
                <Accordion key={materia.id} titulo={`Matéria: ${materia.nome}`} corDaBorda={prova.corDaProva}>
                    <input type="number" defaultValue={materia.id} hidden id="idMateria" />
                    <ul>
                        {/* feito sort no front / NÃO ESQUECER DE PASSAR PRO BACKEND */}
                        {materia.listaDeAssuntos.sort(function (a, b) {
                            if (a.nome < b.nome) {
                                return -1;
                            }
                            if (a.nome > b.nome) {
                                return 1;
                            }
                            return 0;
                        }).map(assunto => {
                            return (
                                <LiAcorddionEstilizado key={assunto.id}>
                                    <SectionDadosDoAssuntoEstilizado $darkMode={usuarioPrefereModoDark}>
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
                                                Resumo: <span style={{ color: 'red' }}>Não possui</span>
                                            </p>

                                        }

                                    </SectionDadosDoAssuntoEstilizado>
                                    <SectionBotoesCrudAccordion>
                                        <BotaorCard
                                            onClick={(e) => excluirAssunto(assunto.id, materia.id)}
                                            $type="excluir"
                                            name="excluir_assunto"
                                        >
                                            <RiCloseLargeFill size={20} />
                                            Excluir Assunto
                                        </BotaorCard>
                                        <BotaorCard
                                            $type="editar"
                                            onClick={() => editarAssunto(materia.id, assunto.id)}
                                            name="editar_assunto"
                                        >
                                            <FaPencilAlt size={20} />
                                            Editar Assunto
                                        </BotaorCard>
                                        <BotaorCard
                                            onClick={(e) => adicionarQuestao(materia.id, assunto.id)}
                                            $type="questao"
                                            name="adicionar_questao"
                                        >
                                            <FaQuestion size={20} />
                                            Estatística de Questões
                                        </BotaorCard>
                                        <BotaorCard
                                            onClick={() => navigate(`/provas/${prova.id}/materias/${materia.id}/assuntos/${assunto.id}`)}
                                            $type="adicionar"
                                            name="detalhes_assunto"
                                        >
                                            <TbListDetails size={20} />
                                            {
                                                assunto.comentarios
                                                    ?
                                                    "Ver Resumo"
                                                    :
                                                    "Criar Resumo"
                                            }
                                        </BotaorCard>
                                    </SectionBotoesCrudAccordion>
                                </LiAcorddionEstilizado>
                            );
                        })}
                    </ul>
                    <DivBotoesCrudMateria>
                        <BotaorCard
                            onClick={() => adicionarAssunto(materia.id)}
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
                            <RiCloseLargeFill size={15} />
                            Excluir Materia
                        </BotaorCard>
                        <BotaorCard
                            onClick={() => editarMateria(materia.id)}
                            $type="editar"
                            name="editar_materia"
                        >
                            <FaPencilAlt size={15} />
                            Editar Materia
                        </BotaorCard>
                        <BotaorCard $type="detalhar" onClick={() => navigate(`/provas/${prova.id}/materias/${materia.id}/questoes-dashboard`)}>
                            <FaQuestion size={15} color="red" />
                            Menu questões
                        </BotaorCard>
                    </DivBotoesCrudMateria>
                </Accordion>
            );
        })
    );
}