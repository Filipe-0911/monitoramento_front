import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import { useState } from "react";
import AssuntoService from "../../../services/AssuntoService";

const InputAssunto = ({ input, onChange }) => {
    return (
        <>
            <label>Nome Assunto</label>
            <CampoForm onChange={onChange} name={input.name} placeholder={input.placeholder} />
            <label>Quantidade de PDFs</label>
            <CampoForm onChange={onChange} type="number" name={`quantidadePdf`} placeholder="Digite a quantidade de pdfs" />
        </>
    );
}

export default function FormAdicionarAssuntos({ prova, idMateria, adicionaAssuntoAMateria }) {
    const assuntoService = new AssuntoService();

    const [formularioAdicionarAssuntos, setFormularioAdicionarAssuntos] = useState({
        nome: '',
        quantidadePdf: 0
    })

    const handleChanger = (e) => {
        setFormularioAdicionarAssuntos(prevForm => {
            return {
                ...prevForm,
                [e.target.name]: e.target.value
            }
        })
    }

    const adicionarAssunto = () => {
        try {
            const dadosParaEnviar = {
                idProva: prova.id,
                idMateria: idMateria,
                ...formularioAdicionarAssuntos
            }

            assuntoService.adicionaAssunto(dadosParaEnviar).then(r => adicionaAssuntoAMateria(r, idMateria))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <FormEstilizado onSubmit={e => e.preventDefault()}>
                <h3>Adicionar Assunto</h3>
                <InputAssunto
                    input={{ name: "nome", placeholder: "Insira o titulo do assunto" }}
                    onChange={handleChanger}
                />

                <BotaoEstilizado onClick={adicionarAssunto}>
                    Adicionar
                </BotaoEstilizado>

            </FormEstilizado>
            {/* <section style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 1em 1em 0' }}>
                <BotaorCard
                    name="adicionar"
                    $type="adicionar"
                    onClick={() => adicionaInputDeAssunto()}
                >
                    <MdOutlineAddToPhotos
                        id="adicionar"
                        size={15}
                        style={{ cursor: 'pointer' }}
                    />
                    Adicionar Assuntos
                </BotaorCard>
            </section> */}
        </>
    );
}