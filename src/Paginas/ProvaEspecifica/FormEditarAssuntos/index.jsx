import { useState } from "react";
import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import { useProvaContext } from "../../../Hooks/useProvaContext";

const InputAssunto = ({ input, onChange, defaultValue }) => {
    return (
        <>
            <label>Nome Assunto</label>
            <CampoForm
                onChange={onChange}
                name={input.name}
                placeholder={input.placeholder}
                defaultValue={defaultValue.nome}
            />
            <label>Quantidade de PDFs</label>
            <CampoForm
                onChange={onChange}
                type="number"
                name={`quantidadePdf`}
                placeholder="Digite a quantidade de pdfs"
                defaultValue={defaultValue.quantidadePdf}
            />
        </>
    );
}

export default function FormEditarAssuntos({ retornaValoresAssunto, aoEnviar }) {
    const defaultValue = retornaValoresAssunto();
    const { prova, idMateria } = useProvaContext()

    const [formularioEditarAssuntos, setFormularioEditarAssuntos] = useState({
        nome: defaultValue.nome,
        quantidadePdf: defaultValue.quantidadePdf
    })

    const handleChanger = (e) => {
        setFormularioEditarAssuntos(prevForm => {
            return {
                ...prevForm,
                [e.target.name]: e.target.value
            }
        })
    }

    const capturaDadosDeAlteracao = () => {
        let dadosIdEAlteracoesAssunto = {
            idProva: prova.id,
            idMateria: idMateria,
            idAssunto: defaultValue.id,

            assunto: {
                nome: formularioEditarAssuntos.nome,
                quantidadePdf: parseInt(formularioEditarAssuntos.quantidadePdf)
            }
        };
        
        aoEnviar(dadosIdEAlteracoesAssunto);
    }

    return (
        <>
            <FormEstilizado onSubmit={e => e.preventDefault()}>
                <h3>Editar Assunto</h3>
                <InputAssunto
                    input={{ name: "nome", placeholder: "Insira o titulo do assunto" }}
                    onChange={handleChanger}
                    defaultValue={formularioEditarAssuntos}
                />

                <BotaoEstilizado 
                disabled={false}
                onClick={() => capturaDadosDeAlteracao()}>
                    Editar
                </BotaoEstilizado>

            </FormEstilizado>
        </>
    );
}