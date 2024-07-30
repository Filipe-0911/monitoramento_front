import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import { BotaorCard } from "../../../componentes/ComponentesHome";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { useProvaContext } from "../../../Hooks/useProvaContext";

const InputAssunto = ({ input, index, onChange }) => {
    return (
        <>
            <label>Nome Assunto</label>
            <CampoForm onChange={onChange} name={input.name} placeholder={input.placeholder} />
            <label>Quantidade de PDFs</label>
            <CampoForm onChange={onChange} type="number" name={`quantidade_input_${index}`} placeholder="Digite a quantidade" />
        </>
    );
}

const FormAdicionarMaterias = ({ adicionaMateria, handleChanger }) => {

    const { verificaSePodeAdicionarInputAssunto, quantidadeDeInputs, setQuantidadeDeInputs } = useProvaContext();

    const adicionaInputDeAssunto = () => {
        let name = `nome_assunto_${quantidadeDeInputs.length}`;
        setQuantidadeDeInputs([...quantidadeDeInputs, { name: name, placeholder: "Digite o nome do assunto" }]);
    }

    return (
        <>
            <FormEstilizado onSubmit={e => e.preventDefault()}>
                <h3>Adicionar Materia</h3>
                <label>Nome da matéria</label>
                <CampoForm
                    name="nome"
                    onChange={handleChanger}
                    placeholder="Nome da matéria"
                />
                {quantidadeDeInputs.length > 0 && <h3>Assuntos</h3>}
                {
                    quantidadeDeInputs.map((input, index) => {
                        return (
                            <InputAssunto input={input} key={index} index={index} onChange={handleChanger} />
                        )
                    })
                }
                <BotaoEstilizado
                    disabled={false}
                    onClick={adicionaMateria}>
                    Adicionar
                </BotaoEstilizado>
            </FormEstilizado>
            <section style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 1em 1em 0' }}>
                <BotaorCard
                    name="adicionar"
                    $type="adicionar"
                    onClick={e => adicionaInputDeAssunto()}
                    disabled={verificaSePodeAdicionarInputAssunto()}
                >
                    <MdOutlineAddToPhotos
                        id="adicionar"
                        size={15}
                        style={{ cursor: 'pointer' }}
                    />
                    Adicionar Assuntos
                </BotaorCard>
            </section>
        </>
    );
}

export default FormAdicionarMaterias;