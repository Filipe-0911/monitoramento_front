import Accordion from "../../../componentes/Accordion";
import { BotaorCard } from "../../../componentes/ComponentesHome";
import styled from "styled-components";

import { FaClock, FaPencilAlt, FaQuestion, FaTrashAlt } from "react-icons/fa";
import { FaClock, FaPencilAlt, FaQuestion, FaTrashAlt } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useProvaContext } from "../../../Hooks/useProvaContext";
import { DivBotoesCrudMateria } from "../ComponentesProvaEspecifica";
import useUserContext from "../../../Hooks/useUserContext";

export const LiAcorddionEstilizado = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    border-bottom: ${props => props.$darkMode ? "1px solid rgba(255, 255, 255, 0.4)" : "1px solid rgba(0, 0, 0, 0.4)"} ;
    text-align: left;
    padding: 1em 3em;

    @media (max-width: 820px) {
        margin: auto;

    }
    @media (max-width: 562px) {
        align-items: center;
        justify-content: space-evenly;
        gap: 1em;
        padding: 1em 0;
    }
`

const ContainerAcoesAssunto = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75em;
    max-width: 50%;

    @media (max-width: 820px) {
    @media (max-width: 820px) {
        max-width: 346px;
    }
    @media (max-width: 562px) {
        width: 50%;
    }
`;

const SectionBotoesCrudAccordion = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75em;
`

const WrapperBotaoComTooltip = styled.div`
    position: relative;
    display: inline-flex;

    &::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%) translateY(4px);
        background-color: rgba(20, 20, 20, 0.92);
        color: #ffffff;
        padding: 6px 10px;
        border-radius: 5px;
        font-size: 13px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
        z-index: 20;
    }

    &:hover::after {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }
`;

const SectionDadosDoAssuntoEstilizado = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    h5 {
        font-size: 20px;
        max-width: 480px;  
        color: ${props => props.$darkMode ? "#ffffff" : "#000000"}
    }

    p {
        color: ${props => props.$darkMode ? "#ffffff" : "#000000"};
        font-size: 16px;
        margin: 5px 0;
    }
    
    @media (max-width: 820px) {
        margin: auto;
        
        h5 {
            text-align: center;
        }
        h5, p {
            width: 100%;
        }
        gap: 1em;
    }

    @media (max-width: 562px) {
        max-width: 50%;

        h5, p {
            text-align: left;
            font-size: 16px !important;
            word-wrap: break-word;
            max-width: 100%;
        }
    }
`

const LabelCheckboxConcluido = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin: 6px 0;
    color: ${props => props.$concluido ? "#42AB84" : (props.$darkMode ? "#ffffff" : "#000000")};

    input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: #42AB84;
    }
`;

export default function AccordionAssunto({
    excluirMateria,
    excluirAssunto,
    alterarStatusConcluidoAssunto,
    alterarStatusConcluidoAssunto,
    setModalIsOpen,
    setAcaoUsuario }) {

    const {
        setIdAssunto,
        setIdMateria,
        prova,
    } = useProvaContext();

    const navigate = useNavigate();

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
    function gerenciarEstudos(idMateria, idAssunto) {
        setIdMateria(idMateria);
        setIdAssunto(idAssunto);
        setAcaoUsuario("gerenciar_estudos");
        setModalIsOpen();
    }
    function calcularTempoTotalEstudo(assunto) {
        const estudos = assunto.listaDeEstudos || [];
        if (estudos.length === 0) {
            return "Nenhum estudo registrado";
        }
        const totalMinutos = estudos.reduce(
            (acc, est) => acc + (Number(est.horas) || 0) * 60 + (Number(est.minutos) || 0),
            0
        );
        const horas = Math.floor(totalMinutos / 60);
        const minutos = totalMinutos % 60;
        return `${horas}h ${minutos}min (${estudos.length} ${estudos.length === 1 ? "registro" : "registros"})`;
    }

    const { usuarioPrefereModoDark } = useUserContext();

    return (
        prova.listaDeMaterias.map(materia => {

            return (
                <Accordion key={materia.id} titulo={`Matéria: ${materia.nome}`} corDaBorda={prova.corDaProva}>
                    <input type="number" defaultValue={materia.id} hidden id="idMateria" />
                    <ul>
                        {materia.listaDeAssuntos.sort(function (a, b) {
                            if (a.nome < b.nome) {
                                return -1;
                            }
                            if (a.nome > b.nome) {
                                return 1;
                            }
                            return 0;
                        }).map(assunto => {
                            const textoBotaoResumo = assunto.comentarios ? "Ver Resumo" : "Criar Resumo";
                            return (
                                <LiAcorddionEstilizado key={assunto.id} $darkMode={usuarioPrefereModoDark}>
                                    <SectionDadosDoAssuntoEstilizado $darkMode={usuarioPrefereModoDark}>
                                        <h5 style={{ textDecoration: assunto.concluido ? "line-through" : "none" }}>
                                        <h5 style={{ textDecoration: assunto.concluido ? "line-through" : "none" }}>
                                            {assunto.nome}
                                        </h5>
                                        <p>
                                            Quantidade páginas no PDF: {assunto.quantidadePdf}
                                        </p>
                                        <p>
                                            Questões respondidas: {assunto.quantidadeQuestoes ?? 0}
                                            Questões respondidas: {assunto.quantidadeQuestoes ?? 0}
                                        </p>
                                        <p>
                                            Porcentagem de acertos: {
                                                assunto.estatisticas 
                                                ? <span style={{
                                                    color: assunto.estatisticas.porcentagem >= 70 
                                                            ? 'green' 
                                                            : assunto.estatisticas.porcentagem < 70 && assunto.estatisticas.porcentagem > 60 
                                                            ? "orange" 
                                                            : 'red'
                                                }}>
                                                    {
                                                        assunto.estatisticas.porcentagem.toFixed(2)
                                                    }%
                                                </span>
                                                : "Sem rendimentos registrados"
                                            }
                                        </p>

                                        <p>
                                            Tempo de estudo: {calcularTempoTotalEstudo(assunto)}
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
                                    <ContainerAcoesAssunto>
                                        <SectionBotoesCrudAccordion>
                                            <WrapperBotaoComTooltip data-tooltip="Excluir Assunto">
                                                <BotaorCard
                                                    onClick={(e) => excluirAssunto(assunto.id, materia.id)}
                                                    $type="excluir"
                                                    name="excluir_assunto"
                                                >
                                                    <FaTrashAlt size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                            <WrapperBotaoComTooltip data-tooltip="Editar Assunto">
                                                <BotaorCard
                                                    $type="editar"
                                                    onClick={() => editarAssunto(materia.id, assunto.id)}
                                                    name="editar_assunto"
                                                >
                                                    <FaPencilAlt size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                            <WrapperBotaoComTooltip data-tooltip="Estatística de Questões">
                                                <BotaorCard
                                                    onClick={(e) => adicionarQuestao(materia.id, assunto.id)}
                                                    $type="questao"
                                                    name="adicionar_questao"
                                                >
                                                    <FaQuestion size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                            <WrapperBotaoComTooltip data-tooltip="Horas de Estudo">
                                                <BotaorCard
                                                    onClick={() => gerenciarEstudos(materia.id, assunto.id)}
                                                    $type="estudo"
                                                    name="gerenciar_estudos"
                                                >
                                                    <FaClock size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                            <WrapperBotaoComTooltip data-tooltip={textoBotaoResumo}>
                                                <BotaorCard
                                                    onClick={() => navigate(`/provas/${prova.id}/materias/${materia.id}/assuntos/${assunto.id}`)}
                                                    $type="adicionar"
                                                    name="detalhes_assunto"
                                                >
                                                    <TbListDetails size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                        </SectionBotoesCrudAccordion>
                                        <LabelCheckboxConcluido
                                            $concluido={Boolean(assunto.concluido)}
                                            $darkMode={usuarioPrefereModoDark}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={Boolean(assunto.concluido)}
                                                onChange={(e) => alterarStatusConcluidoAssunto(materia.id, assunto.id, e.target.checked)}
                                            />
                                            {assunto.concluido ? "Matéria concluída" : "Marcar matéria como concluída"}
                                        </LabelCheckboxConcluido>
                                    </ContainerAcoesAssunto>
                                    <ContainerAcoesAssunto>
                                        <SectionBotoesCrudAccordion>
                                            <WrapperBotaoComTooltip data-tooltip="Excluir Assunto">
                                                <BotaorCard
                                                    onClick={(e) => excluirAssunto(assunto.id, materia.id)}
                                                    $type="excluir"
                                                    name="excluir_assunto"
                                                >
                                                    <FaTrashAlt size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                            <WrapperBotaoComTooltip data-tooltip="Editar Assunto">
                                                <BotaorCard
                                                    $type="editar"
                                                    onClick={() => editarAssunto(materia.id, assunto.id)}
                                                    name="editar_assunto"
                                                >
                                                    <FaPencilAlt size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                            <WrapperBotaoComTooltip data-tooltip="Estatística de Questões">
                                                <BotaorCard
                                                    onClick={(e) => adicionarQuestao(materia.id, assunto.id)}
                                                    $type="questao"
                                                    name="adicionar_questao"
                                                >
                                                    <FaQuestion size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                            <WrapperBotaoComTooltip data-tooltip="Horas de Estudo">
                                                <BotaorCard
                                                    onClick={() => gerenciarEstudos(materia.id, assunto.id)}
                                                    $type="estudo"
                                                    name="gerenciar_estudos"
                                                >
                                                    <FaClock size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                            <WrapperBotaoComTooltip data-tooltip={textoBotaoResumo}>
                                                <BotaorCard
                                                    onClick={() => navigate(`/provas/${prova.id}/materias/${materia.id}/assuntos/${assunto.id}`)}
                                                    $type="adicionar"
                                                    name="detalhes_assunto"
                                                >
                                                    <TbListDetails size={20} />
                                                </BotaorCard>
                                            </WrapperBotaoComTooltip>
                                        </SectionBotoesCrudAccordion>
                                        <LabelCheckboxConcluido
                                            $concluido={Boolean(assunto.concluido)}
                                            $darkMode={usuarioPrefereModoDark}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={Boolean(assunto.concluido)}
                                                onChange={(e) => alterarStatusConcluidoAssunto(materia.id, assunto.id, e.target.checked)}
                                            />
                                            {assunto.concluido ? "Matéria concluída" : "Marcar matéria como concluída"}
                                        </LabelCheckboxConcluido>
                                    </ContainerAcoesAssunto>
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
                            <FaTrashAlt size={15} />
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
                            <FaQuestion size={15} />
                            Menu questões
                        </BotaorCard>
                    </DivBotoesCrudMateria>
                </Accordion>
            );
        })
    );
}

