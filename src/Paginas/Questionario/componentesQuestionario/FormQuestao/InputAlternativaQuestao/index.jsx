import React, { useState, useEffect } from 'react'
import { FieldsetEstilizado } from '../../../../../componentes/Fieldset'
import CampoForm from '../../../../../componentes/CampoForm'

export default function InputAlternativaQuestao({ index, valorAlternativaDefault, setAlternativa, setEhCorreto }) {
    // Estado local para controlar o valor do campo de radio
    const [checked, setChecked] = useState(false);

    // Atualiza o estado 'checked' quando o valorAlternativaDefault mudar
    useEffect(() => {
        if (valorAlternativaDefault && typeof valorAlternativaDefault.ehCorreta === 'boolean') {
            setChecked(valorAlternativaDefault.ehCorreta); // Atualizei para ehCorreta, como no valor recebido
        }
    }, [valorAlternativaDefault]);

    const handleRadioChange = (e) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);
        setEhCorreto(isChecked, index);
    };

    return (
        <FieldsetEstilizado>
            <label>
                Alternativa {index} {index > 1 && "(Opcional)"}:
                <div style={{ display: "flex", gap: "10px" }}>
                    <CampoForm
                        nome="respostaCerta"
                        placeholder={`Escreva a Alternativa ${index}`}
                        defaultValue={valorAlternativaDefault?.textoAlternativa || ''}
                        onChange={e => setAlternativa(e.target.value, index)}
                    />
                    <input
                        type="radio"
                        name='alternativaCorreta'
                        checked={checked} // Usando 'checked' ao invés de 'defaultChecked'
                        onChange={handleRadioChange}
                    />
                </div>
            </label>
        </FieldsetEstilizado>
    )
}
