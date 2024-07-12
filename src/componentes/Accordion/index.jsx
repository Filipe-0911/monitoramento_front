import React, { useState } from "react";
import styled from "styled-components";
import styles from "./Accordion.module.css";
import { GoChevronDown } from "react-icons/go";

const IconeSetaEstilizado = styled(GoChevronDown)`
  width: 30px;
  color: black !important;
  transition: transform 0.2s linear;
  &.rotated {
    transform: rotate(180deg);
  }
`;

const Accordion = ({ listaDeMaterias }) => {
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

                    <div
                        className={`${styles.accordionBody} ${activeIndex === index ? styles.active : ""
                            }`}
                    >
                        <ul>
                            {materia.listaDeAssunto.map((assunto) => (
                                <li key={assunto.id}>
                                    <h5>
                                        {assunto.nome}
                                    </h5>
                                    <p>
                                        Quantidade de pdfs: {assunto.quantidadePdf}
                                    </p>
                                    <p>
                                        Questões feitas: {assunto.idQuestoes.length}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
