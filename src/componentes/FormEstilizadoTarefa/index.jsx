import { FormEstilizado } from "../ContainerLoginEstilizado";
import CampoForm from "../CampoForm";
import TextAreaEstilizado from "../TextAreaEstilizado";
import BotaoEstilizado from "../Botao";
import { FieldsetEstilizado } from "../Fieldset";

const FormEstilizadoTarefa = ({ onClick, form, handleChanger, tituloEBotao }) => {
    return (
        <FormEstilizado onSubmit={e => e.preventDefault()}>
            <input
                defaultValue={form.id || ""}
                type="number"
                hidden
            />
            <p>{tituloEBotao}</p>
            <FieldsetEstilizado>
                <label>Título</label>
                <CampoForm
                    defaultValue={form.titulo}
                    onChange={handleChanger}
                    type="text"
                    name="titulo"
                    placeholder="Título"
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>Descrição</label>
                <TextAreaEstilizado
                    defaultValue={form.descricao}
                    onChange={handleChanger}
                    placeholder="Descrição"
                    name="descricao"
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>Data de conclusão</label>
                <CampoForm
                    defaultValue={form.data}
                    onChange={handleChanger}
                    type="datetime-local"
                    name="data"
                    placeholder="Data de conclusão"
                />
            </FieldsetEstilizado>
            <BotaoEstilizado $disable={false} type="submit" onClick={(e) => onClick(e)}>
                {tituloEBotao}
            </BotaoEstilizado>
        </FormEstilizado>
    );
}

export default FormEstilizadoTarefa;
