import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import { useState } from "react";
import DataService from "../../../services/DataService";
import { FieldsetEstilizado } from "../../../componentes/Fieldset";

const InputQuestoes = ({ input, onChange, dadosFormulario }) => {
    return (
        <>
            <FieldsetEstilizado>
                <label>Data hora de preenchimento</label>
                <CampoForm
                    type="datetime-local"
                    onChange={onChange}
                    name={input.name}
                    placeholder={input.placeholder}
                    defaultValue={dadosFormulario.dataPreenchimento}
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>Questões respondidas</label>
                <CampoForm
                    type="number"
                    onChange={onChange}
                    name={`questoesFeitas`}
                    placeholder="Digite o número de questões respondidas"
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>Questões corretas</label>
                <CampoForm
                    type="number"
                    onChange={onChange}
                    name={`questoesAcertadas`}
                    placeholder="Digite o número de questões corretas"
                />
            </FieldsetEstilizado>
        </>
    );
}

export default function FormAdicionarQuestoes({ adicionarQuestoesAoAssunto }) {
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
                <h3>Adicionar Estatísticas de Questões</h3>
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