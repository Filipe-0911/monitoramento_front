import Accordion from "../../../componentes/Accordion";
import { BotaorCard } from "../../../componentes/ComponentesHome";
import { DivBotoesCrudMateria } from "..";
import { useState } from "react";

export default function AccordionAssunto({ prova, capturaCliqueBotaoUsuario, excluirMateria }) {

    return (
        prova.listaDeMaterias.map(materia => {
            return (
                <Accordion key={materia.id} titulo={`Matéria: ${materia.nome}`}>
                    <input type="number" defaultValue={materia.id} hidden id="idMateria" />
                    <ul>
                        {materia.listaDeAssuntos.map(assunto => {
                            
                            return (
                                <li key={assunto.id}>
                                    <section>
                                        <h5>
                                            {assunto.nome}
                                        </h5>
                                        <p>
                                            Quantidade de pdfs: {assunto.quantidadePdf}
                                        </p>
                                        <p>
                                            Quantidade de questões feitas: {assunto.idQuestoes.length}
                                        </p>
                                    </section>
                                    <section style={{ display: 'flex', gap: '1em' }}>
                                        <BotaorCard onClick={(e) => capturaCliqueBotaoUsuario(e, assunto.id)} $type="excluir" name="excluir_assunto">
                                            Excluir Assunto
                                        </BotaorCard>
                                        <BotaorCard $type="editar" onClick={(e) => capturaCliqueBotaoUsuario(e, assunto.id)} name="editar_assunto">
                                            Editar Assunto
                                        </BotaorCard>
                                    </section>
                                </li>
                            );
                        })}
                    </ul>
                    <DivBotoesCrudMateria>
                        <BotaorCard onClick={(e) => capturaCliqueBotaoUsuario(e)} $type="adicionar" name="adicionar_assunto">
                            Adicionar Assunto
                        </BotaorCard>
                        <BotaorCard onClick={() => excluirMateria(materia.id)} $type="excluir" name="excluir_materia">
                            Excluir Materia
                        </BotaorCard>
                        <BotaorCard onClick={(e) => capturaCliqueBotaoUsuario(e)} $type="editar" name="editar_materia">
                            Editar Materia
                        </BotaorCard>
                    </DivBotoesCrudMateria>
                </Accordion>
            );
        })
    );
}