import React from 'react'
import styled from 'styled-components'

export const SectionQuestionario = styled.section`
    min-width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        font-size: 20px;
    }
 
`
export const H2QuestionarioEstilizado = styled.h2`
    text-align: center;
    font-size: 24px;
    margin-bottom: 1em;
`

export const FormEstilizadoQuestionario = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.$darkMode ? "var(--bg-cinza-dark-mode)" : "var(--bg-cinza-light-mode)"};
    border-radius: 5px;
    width: 100%;
    max-width: 100%;
    padding: 2rem;

    ul {
        list-style: none;
        padding: 0.5em;

        li {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1em;
            margin: 1em 0;
        }
    }

    text-align: justify;

    @media (max-width:562px) {
        padding: 1em;
    }
`