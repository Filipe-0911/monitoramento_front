import { FormEstilizado } from "../ContainerLoginEstilizado";
import CampoForm from "../CampoForm";
import TextAreaEstilizado from "../TextAreaEstilizado";
import BotaoEstilizado from "../Botao";

const FormEstilizadoTarefa = ({ onClick, form, handleChanger, tituloEBotao }) => {
    return (
        <FormEstilizado onSubmit={e => e.preventDefault()}>
        <input
            defaultValue={form.id}
            type="number"
            hidden
        />
        <p>Editar</p>
        <label>Título</label>
        <CampoForm
            defaultValue={form.titulo}
            onChange={handleChanger}
            type="text"
            name="titulo"
            placeholder="Título"
        />
        <label>Descrição</label>
        <TextAreaEstilizado
            defaultValue={form.descricao}
            onChange={handleChanger}
            placeholder="Descrição"
            name="descricao"
        />
        <label>Data de conclusão</label>
        <CampoForm
            defaultValue={form.data}
            onChange={handleChanger}
            type="datetime-local"
            name="data"
            placeholder="Data de conclusão"
        />
        <BotaoEstilizado $disable={false} type="submit" onClick={(e) => onClick(e)}>
            {tituloEBotao}
        </BotaoEstilizado>
    </FormEstilizado>
    );
}

export default FormEstilizadoTarefa;