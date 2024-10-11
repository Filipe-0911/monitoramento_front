import { SectionQuestionario } from "../Questionario/componentesQuestionario/SectionQuestionario";
import Loader from "../../componentes/Loader";
import { FormEstilizadoQuestionario } from "../Questionario/componentesQuestionario/SectionQuestionario";
import { H2QuestionarioEstilizado } from "../Questionario/componentesQuestionario/SectionQuestionario";
import { BotaorCard } from "../../componentes/ComponentesHome";
import BotaoEstilizado from "../../componentes/Botao";
import { DivMensagemQuestoesNaoEncontradas } from "../Questionario";
import QuestoesService from "../../services/QuestoesService";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useUserContext from "../../Hooks/useUserContext";
import { Alternativas } from "../Questionario/componentesQuestionario/Alternativas";
import Alert from "../../componentes/Alert";
import useAlertContext from "../../Hooks/useAlertContext";
import FormQuestao from "../Questionario/componentesQuestionario/FormQuestao";
import ModalComponent from "../../componentes/Modal";
import { RiCloseLargeFill } from "react-icons/ri";
import styled from "styled-components";

const DivEditarExcluirQuestao = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.$darkMode ? "var(--bg-cinza-dark-mode)" : "var(--bg-cinza-light-mode)"};
    border-radius: 5px;
    width: 100%;
    padding: 2rem;

    ul {
        list-style: none;
        padding: 0.5em;

        li {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1em;
            margin: 1em;
        }
    }
`

export default function EditarQuestoes() {
    const questoesService = new QuestoesService();
    const [isLoading, setIsLoading] = useState(true);
    const { usuarioPrefereModoDark } = useUserContext()
    const params = useParams();
    const { dadosAlerta, setAlertaError, setAlertaSuccess } = useAlertContext()
    const [enviouResposta, setEnviouResposta] = useState(false);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function buscaProxQuestao(paginaParaBusca) {
        setEnviouResposta(false);
        questoesService.buscaQuestoesParaEditar(params.idProva, params.idMateria, paginaParaBusca).then((res) => {
            setQuestao(res.data);
        }).catch(err => console.error(err));
    }
    function closeModal() {
        setModalIsOpen(false)
    }
    const [questao, setQuestao] = useState({
        content: [],
        page: {
            number: 0,
            size: 0,
            totalElements: 0,
            totalPages: 0,
        }
    });

    function deletaQuestao () {
        questoesService.deletaQuestao(params.idProva, params.idMateria, questao.content[0].id).then(res => {
            setAlertaSuccess("Questão excluída com sucesso!");
            setEnviouResposta(true);
        })
    }

    function modificaQuestao(questaoModificada) {
        setQuestao(prevState => ({
            ...prevState,
            content: [
               questaoModificada
            ]
        }))
    }

    const estaNaPrimeiraPaginaDeQuestoes = !(questao.page.number > 0);
    const naoHaProximaQuestao = !(questao.page.totalElements > 1 && questao.page.number < questao.page.totalPages - 1);

    useEffect(() => {
        questoesService.buscaQuestoesParaEditar(params.idProva, params.idMateria).then((res) => {
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


    return (
        <SectionQuestionario>
            {
                isLoading ? <Loader /> :
                    questao.content.length > 0 &&
                    <>
                        <DivEditarExcluirQuestao $darkMode={usuarioPrefereModoDark}>
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
                                            darkMode={usuarioPrefereModoDark}
                                        />
                                    ))
                                }
                            </ul>
                            <section style={{ display: 'flex', justifyContent: 'space-evenly', margin: "1em 0" }}>
                                <BotaorCard $type="editar" disabled={enviouResposta} onClick={() => setModalIsOpen(true)}>
                                    Editar questão
                                </BotaorCard>
                                <BotaorCard $type="excluir" disabled={enviouResposta} onClick={deletaQuestao}>
                                    Excluir questão
                                </BotaorCard>

                            </section>
                        </DivEditarExcluirQuestao>
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
            <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <BotaorCard $type="excluir" onClick={closeModal}>
                        <RiCloseLargeFill />
                    </BotaorCard>
                </div>
                <FormQuestao $questaoParaEditar={questao.content[0]} setQuestaoParaEditar={modificaQuestao} />
            </ModalComponent>
        </SectionQuestionario>
    )
}
