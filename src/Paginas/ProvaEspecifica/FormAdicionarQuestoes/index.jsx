import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import { useState } from "react";
import DataService from "../../../services/DataService";

const InputQuestoes = ({ input, onChange, dadosFormulario }) => {
    return (
        <>
            <label>Data hora de preenchimento</label>
            <CampoForm
                type="datetime-local"
                onChange={onChange}
                name={input.name}
                placeholder={input.placeholder}
                defaultValue={dadosFormulario.dataPreenchimento}
            />
            <label>Questões respondidas</label>
            <CampoForm
                type="number"
                onChange={onChange}
                name={`questoesFeitas`}
                placeholder="Digite o número de questões respondidas"
            />
            <label>Questões corretas</label>
            <CampoForm
                type="number"
                onChange={onChange}
                name={`questoesAcertadas`}
                placeholder="Digite o número de questões corretas"
            />
        </>
    );
}

export default function FormAdicionarQuestoes({ prova, idMateria, adicionaQuestaoAMateria, adicionarQuestoesAoAssunto }) {
    const dataService = new DataService();

    const [formularioAdicionarQuestoes, setFormularioAdicionarQuestoes] = useState({
        dataPreenchimento: dataService.transformaDataEmStringParaInserirEmInputDateTimeLocal(new Date()),
        questoesAcertadas: 0,
        questoesFeitas: 0
    })

    const handleChanger = (e) => {
        setFormularioAdicionarQuestoes(prevForm => {
            return {
                ...prevForm,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <>
            <FormEstilizado onSubmit={e => e.preventDefault()}>
                <h3>Adicionar Questões</h3>
                <InputQuestoes
                    input={{ name: "dataPreenchimento", placeholder: "Selecione a data e hora" }}
                    onChange={handleChanger}
                    dadosFormulario={formularioAdicionarQuestoes}
                />

                <BotaoEstilizado
                    disabled={false}
                    onClick={() => adicionarQuestoesAoAssunto(formularioAdicionarQuestoes)}
                >
                    Adicionar
                </BotaoEstilizado>

            </FormEstilizado>
        </>
    );
}