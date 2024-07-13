import React, { useState } from "react";
import styled from "styled-components";
import styles from "./Accordion.module.css";
import { GoChevronDown } from "react-icons/go";
import { BotaorCard } from "../ComponentesHome";

const IconeSetaEstilizado = styled(GoChevronDown)`
  width: 30px;
  color: black !important;
  transition: transform 0.2s linear;
  &.rotated {
    transform: rotate(180deg);
  }
`;

const DivBotoesCrudMateria = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;

    @media (max-width: 562px) {
        justify-content: space-between
    }
`;

const AccordionMaterias = ({ listaDeMaterias, excluirMateria }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    
    return (
        <div className={styles.container} id="container">
            {listaDeMaterias.map((materia, index) => (
                <div key={materia.id} className={styles.accordion}>
                    <button
                        className={styles.accordionHeader}
                        onClick={() => toggleAccordion(index)}
                    >
                        <span>Matéria: {materia.nome}</span>
                        <IconeSetaEstilizado
                            size={30}
                            className={`${styles.arrow} ${activeIndex === index ? 'rotated' : ''}`}
                        />
                    </button>

                    <div className={`${styles.accordionBody} ${activeIndex === index ? styles.active : ""}`}>
                        <ul>
                            {materia.listaDeAssuntos.map((assunto) => (
                                <li key={assunto.id}>
                                    <section>
                                        <h5>
                                            {assunto.nome}
                                        </h5>
                                        <p>
                                            Quantidade de pdfs: {assunto.quantidadePdf}
                                        </p>
                                        <p>
                                            Questões feitas: {assunto.idQuestoes.length}
                                        </p>

                                    </section>
                                    <section style={{ display: 'flex', gap: "10px" }}>
                                        <BotaorCard $type="excluir">
                                            Excluir Assunto
                                        </BotaorCard>
                                        <BotaorCard $type="editar">
                                            Editar Assunto
                                        </BotaorCard>
                                    </section>
                                </li>
                            ))}
                        </ul>
                        <DivBotoesCrudMateria>
                            <BotaorCard $type="adicionar">
                                Adicionar Assunto
                            </BotaorCard>
                            <BotaorCard onClick={() => excluirMateria(materia.id)} $type="excluir">
                                Excluir Materia
                            </BotaorCard>
                            <BotaorCard $type="editar">
                                Editar Materia
                            </BotaorCard>
                        </DivBotoesCrudMateria>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccordionMaterias;
