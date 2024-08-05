import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import { useState } from "react";
import { FieldsetEstilizado } from "../../../componentes/Fieldset";

const FormEditarMaterias = ({ editarMateria }) => {
    const [dadosFormularioEditarMateria, setDadosFormularioEditarMateria] = useState({ nome: '' })

    const handleChange = (event) => {
        setDadosFormularioEditarMateria({ ...dadosFormularioEditarMateria, [event.target.name]: event.target.value });
    }

    return (
        <>
            <FormEstilizado onSubmit={e => e.preventDefault()}>
                <h3>Editar Materia</h3>
                <FieldsetEstilizado>
                    <label>Nome da matéria</label>
                    <CampoForm
                        name="nome"
                        onChange={handleChange}
                        placeholder="Nome da matéria"
                    />
                </FieldsetEstilizado>
                <BotaoEstilizado
                    disabled={dadosFormularioEditarMateria.nome.length < 0}
                    onClick={() => editarMateria(dadosFormularioEditarMateria)}>
                    Editar Matéria
                </BotaoEstilizado>
            </FormEstilizado>
        </>
    );
}

export default FormEditarMaterias;