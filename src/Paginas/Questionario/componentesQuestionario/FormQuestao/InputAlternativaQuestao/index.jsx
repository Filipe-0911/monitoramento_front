import React, { useState, useEffect } from 'react'
import { FieldsetEstilizado } from '../../../../../componentes/Fieldset'
import CampoForm from '../../../../../componentes/CampoForm'

export default function InputAlternativaQuestao({ index, valorAlternativaDefault, setAlternativa, setEhCorreto }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (valorAlternativaDefault && typeof valorAlternativaDefault.ehCorreta === 'boolean') {
            setChecked(valorAlternativaDefault.ehCorreta); 
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
                Alternativa {index + 1} {index > 1 && "(Opcional)"}:
                <div style={{ display: "flex", gap: "10px" }}>
                    <CampoForm
                        nome="respostaCerta"
                        placeholder={`Escreva a Alternativa ${index + 1}`}
                        defaultValue={valorAlternativaDefault?.textoAlternativa || ''}
                        onChange={e => setAlternativa(e.target.value, index)}
                    />
                    <input
                        type="radio"
                        name='alternativaCorreta'
                        checked={valorAlternativaDefault.ehCorreta}
                        onChange={handleRadioChange}
                    />
                </div>
            </label>
        </FieldsetEstilizado>
    )
}
