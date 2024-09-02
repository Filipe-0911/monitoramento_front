import React from 'react';
import { FaCheckCircle, FaPencilAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { CardTarefasEstilizado } from "../ComponentesHome";
import { BotaorCard } from '../ComponentesHome';
import useUserContext from '../../Hooks/useUserContext';

export default function CardTarefas({ tarefa, transformarDataEmString, concluirTarefa, deletarTarefa, openModal }) {
    const { usuarioPrefereModoDark } = useUserContext();
    return (
        <CardTarefasEstilizado $concluido={tarefa.concluido} $darkMode={usuarioPrefereModoDark}>
            <h4>{tarefa.titulo}</h4>
            <div className="principal">
                <p>{tarefa.descricao}</p>
                <p>Concluir até: {transformarDataEmString(tarefa.data)}</p>
            </div>
            <div className="rodape_card">
                {tarefa.concluido === false ? (
                    <BotaorCard $type="concluir" onClick={() => concluirTarefa(tarefa.id)}>
                        <FaCheckCircle /> Concluir
                    </BotaorCard>
                ) : (
                    <BotaorCard $type="concluir" disabled>
                        <FaCheckCircle /> Concluído
                    </BotaorCard>
                )}
                <BotaorCard $type="excluir" onClick={() => deletarTarefa(tarefa.id)}>
                    <MdCancel /> Excluir
                </BotaorCard>
                <BotaorCard $type="editar" name="Editar" onClick={(event) => openModal(tarefa, event)}>
                    <FaPencilAlt /> Editar
                </BotaorCard>
            </div>
        </CardTarefasEstilizado>
    );
}