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

export default function FormAdicionarAssuntos({ adicionarAssunto }) {

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



    return (
        <>
            <FormEstilizado onSubmit={e => e.preventDefault()}>
                <h3>Adicionar Assunto</h3>
                <InputAssunto
                    input={{ name: "nome", placeholder: "Insira o titulo do assunto" }}
                    onChange={handleChanger}
                />

                <BotaoEstilizado disabled={false} onClick={() => adicionarAssunto(formularioAdicionarAssuntos)}>
                    Adicionar
                </BotaoEstilizado>

            </FormEstilizado>
        </>
    );
}