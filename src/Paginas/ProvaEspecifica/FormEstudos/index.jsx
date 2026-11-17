import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import { FieldsetEstilizado } from "../../../componentes/Fieldset";
import { BotaorCard } from "../../../componentes/ComponentesHome";
import DataService from "../../../services/DataService";

const ListaEstudosContainer = styled.div`
    width: 100%;
    margin-top: 1.5em;
    max-height: 260px;
    overflow-y: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 1em;
`;

const ItemEstudoEstilizado = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    padding: 0.75em;
    margin-bottom: 0.5em;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.08);
    color: #fff;
    flex-wrap: wrap;
`;

const BotoesItemContainer = styled.div`
    display: flex;
    gap: 0.5em;
`;

export default function FormEstudos({
    retornaValoresAssunto,
    adicionarEstudoAoAssunto,
    editarEstudoDoAssunto,
    excluirEstudoDoAssunto,
}) {
    const dataService = new DataService();
    const assuntoAtual = retornaValoresAssunto();
    const listaDeEstudos = assuntoAtual?.listaDeEstudos || [];

    const estadoInicialFormulario = () => ({
        id: null,
        dataEstudo: dataService.transformaDataEmStringParaInserirEmInputDateTimeLocal(new Date()),
        horas: 0,
        minutos: 30,
    });

    const [modoOperacao, setModoOperacao] = useState("Adicionar");
    const [formEstudo, setFormEstudo] = useState(estadoInicialFormulario);

    useEffect(() => {
        setModoOperacao("Adicionar");
        setFormEstudo(estadoInicialFormulario());
    }, [assuntoAtual?.id]);

    const handleChanger = (e) => {
        const { name, value } = e.target;
        setFormEstudo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const selecionarParaEdicao = (estudo) => {
        setModoOperacao("Editar");
        setFormEstudo({
            id: estudo.id,
            dataEstudo: estudo.dataEstudo ? estudo.dataEstudo.substring(0, 16) : dataService.transformaDataEmStringParaInserirEmInputDateTimeLocal(new Date()),
            horas: estudo.horas,
            minutos: estudo.minutos,
        });
    };

    const cancelarEdicao = () => {
        setModoOperacao("Adicionar");
        setFormEstudo(estadoInicialFormulario());
    };

    const handleSubmit = async () => {
        if (modoOperacao === "Editar" && formEstudo.id !== null) {
            await editarEstudoDoAssunto(formEstudo.id, formEstudo);
            cancelarEdicao();
        } else {
            await adicionarEstudoAoAssunto(formEstudo);
            setFormEstudo(estadoInicialFormulario());
        }
    };

    const horasNum = Number(formEstudo.horas);
    const minutosNum = Number(formEstudo.minutos);
    const formularioInvalido =
        !formEstudo.dataEstudo ||
        isNaN(horasNum) ||
        isNaN(minutosNum) ||
        horasNum < 0 ||
        minutosNum < 0 ||
        minutosNum > 59 ||
        (horasNum === 0 && minutosNum === 0);

    return (
        <FormEstilizado onSubmit={(e) => e.preventDefault()}>
            <h3>{modoOperacao} Estudo — {assuntoAtual?.nome}</h3>

            <FieldsetEstilizado>
                <label>Data e hora do estudo</label>
                <CampoForm
                    type="datetime-local"
                    name="dataEstudo"
                    onChange={handleChanger}
                    value={formEstudo.dataEstudo}
                />
            </FieldsetEstilizado>

            <FieldsetEstilizado>
                <label>Horas estudadas (pode ser 0 para menos de 1h)</label>
                <CampoForm
                    type="number"
                    name="horas"
                    min="0"
                    placeholder="Ex: 0"
                    onChange={handleChanger}
                    value={formEstudo.horas}
                />
            </FieldsetEstilizado>

            <FieldsetEstilizado>
                <label>Minutos estudados (0 a 59)</label>
                <CampoForm
                    type="number"
                    name="minutos"
                    min="0"
                    max="59"
                    placeholder="Ex: 45"
                    onChange={handleChanger}
                    value={formEstudo.minutos}
                />
            </FieldsetEstilizado>

            <div style={{ display: "flex", gap: "1em", width: "100%", justifyContent: "center" }}>
                <BotaoEstilizado
                    disabled={formularioInvalido}
                    onClick={handleSubmit}
                >
                    {modoOperacao === "Editar" ? "Salvar Alterações" : "Registrar Estudo"}
                </BotaoEstilizado>
                {modoOperacao === "Editar" && (
                    <BotaorCard $type="excluir" onClick={cancelarEdicao}>
                        Cancelar
                    </BotaorCard>
                )}
            </div>

            <ListaEstudosContainer>
                <h4>Histórico de Estudos ({listaDeEstudos.length})</h4>
                {listaDeEstudos.length === 0 ? (
                    <p style={{ color: "#ccc", marginTop: "0.5em" }}>Nenhum estudo registrado neste assunto.</p>
                ) : (
                    listaDeEstudos.map((estudo) => (
                        <ItemEstudoEstilizado key={estudo.id}>
                            <div>
                                <strong>Data:</strong> {dataService.transformarDataEmString(estudo.dataEstudo)}
                                <br />
                                <strong>Duração:</strong> {estudo.horas}h {estudo.minutos}min
                            </div>
                            <BotoesItemContainer>
                                <BotaorCard
                                    $type="editar"
                                    name="Editar"
                                    onClick={() => selecionarParaEdicao(estudo)}
                                >
                                    <FaPencilAlt size={14} />
                                    Editar
                                </BotaorCard>
                                <BotaorCard
                                    $type="excluir"
                                    name="Excluir"
                                    onClick={() => excluirEstudoDoAssunto(estudo.id)}
                                >
                                    <FaTrashAlt size={14} />
                                    Excluir
                                </BotaorCard>
                            </BotoesItemContainer>
                        </ItemEstudoEstilizado>
                    ))
                )}
            </ListaEstudosContainer>
        </FormEstilizado>
    );
}
