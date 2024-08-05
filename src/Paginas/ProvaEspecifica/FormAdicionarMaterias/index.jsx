import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import { BotaorCard } from "../../../componentes/ComponentesHome";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { useProvaContext } from "../../../Hooks/useProvaContext";
import { useEffect, useState } from "react";
import { FieldsetEstilizado } from "../../../componentes/Fieldset";

const InputAssunto = ({ input, onChange }) => {
    const [listaDeAssuntos, setListaDeAssuntos] = useState({ nome: "", quantidadePdf: 0 });

    const handleChanger = (event) => {
        setListaDeAssuntos(prevState => {
            if (event.target.name === "quantidadePdf") {
                return {
                   ...prevState,
                    quantidadePdf: parseInt(event.target.value),
                }
            }
            return {
                ...prevState,
                [event.target.name] : event.target.value,
            }
        })
    }
    useEffect(() => {
        onChange(new Array(listaDeAssuntos))
    }, [listaDeAssuntos])

    return (
        <FieldsetEstilizado>
            <label>Nome Assunto</label>
            <CampoForm onChange={handleChanger} name={input.name} placeholder={input.placeholder} />
            <label>Quantidade de PDFs</label>
            <CampoForm onChange={handleChanger} type="number" name={`quantidadePdf`} placeholder="Digite a quantidade" />
        </FieldsetEstilizado>
    );
}

const FormAdicionarMaterias = ({ adicionaMateria }) => {
    const { verificaSePodeAdicionarInputAssunto, quantidadeDeInputs, setQuantidadeDeInputs, prova } = useProvaContext();

    const [formularioAdicionarMaterias, setFormularioAdicionarMaterias] = useState({
        idProva: prova.id,
        nome: '',
        listaDeAssuntos: []
    });


    const adicionaInputDeAssunto = () => {
        setQuantidadeDeInputs([...quantidadeDeInputs, { name: "nome", placeholder: "Digite o nome do assunto" }]);
    }

    const pegaValorDoAssuntoCasoExista = (listaRecebida) => {
        setFormularioAdicionarMaterias(prevState => ({
            ...prevState,
            listaDeAssuntos: listaRecebida
        }))
    }

    const handleChanger = (event) => {
        console.log(event.target.name + ": " + event.target.value);
        setFormularioAdicionarMaterias(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const aoEnviar = () => {
        console.log(formularioAdicionarMaterias)
        adicionaMateria(formularioAdicionarMaterias);
        setQuantidadeDeInputs([])
    }

    return (
        <>
            <FormEstilizado onSubmit={e => e.preventDefault()}>
                <h3>Adicionar Materia</h3>
                <FieldsetEstilizado>
                    <label>Nome da matéria</label>
                    <CampoForm
                        name="nome"
                        onChange={handleChanger}
                        placeholder="Nome da matéria"
                    />
                </FieldsetEstilizado>
                {quantidadeDeInputs.length > 0 && <h3>Assuntos</h3>}
                {
                    quantidadeDeInputs.map((input, index) => {
                        return (
                            <InputAssunto input={input} key={index} index={index} onChange={pegaValorDoAssuntoCasoExista} />
                        )
                    })
                }
                <BotaoEstilizado
                    disabled={false}
                    onClick={() => aoEnviar()}>
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