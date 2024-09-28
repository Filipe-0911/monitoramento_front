import React, { useState } from 'react'
import { FieldsetEstilizado } from '../../../../../componentes/Fieldset'
import CampoForm from '../../../../../componentes/CampoForm'
import { InputRadioEstilizado } from '../../../../../componentes/InputRadioEstilizado'
export default function InputAlternativaQuestao({ index, valorAlternativaDefault, setAlternativa, setEhCorreto }) {

    return (
        <FieldsetEstilizado>
            <label>
                Alternativa {index} {index > 1 && "(Opcional)"}:
                <div style={{ display: "flex", gap: "10px" }}>
                    <CampoForm
                        nome="respostaCerta"
                        placeholder={`Escreva a Alternativa ${index}`}
                        defaultValue={valorAlternativaDefault.textoAlternativa}
                        onChange={e => setAlternativa(e.target.value, index)}
                    />
                    <input
                        type="radio"
                        name='alternativaCorreta'
                        defaultChecked={valorAlternativaDefault.ehCorreto}
                        onChange={e => setEhCorreto(e.target.checked, index)}
                    />
                </div>
            </label>
        </FieldsetEstilizado>
    )
}
