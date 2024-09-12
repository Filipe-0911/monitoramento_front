import React from 'react'
import styled from 'styled-components'

export const SectionQuestionario = styled.section`
    min-width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
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
    background-color: ${props => props.$darkMode ? "#201d1d" : "#d9d9d9"};
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