import { useState } from "react";
import { InputRadioEstilizado } from "../../../../componentes/InputRadioEstilizado";

export function Alternativas({ index, alternativa, setAlternativasSelecionadas, alternativasSelecionadas, darkMode }) {
    const { textoAlternativa } = alternativa;
    const opcoesAlternativas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const handleChange = (e) => {
      setAlternativasSelecionadas(alternativa);
    }
    let corDaLetra = darkMode ? "white" : "black";
    let corDeFundo = darkMode ? "rgba(217, 217, 217, 0.5)" : "rgba(106, 106, 106, 0.5)";
    
    return (
      <li>
        <label style={{ display: 'flex', gap: '5px' }}>
          <input type='radio' name='opcao' onChange={e => handleChange(e)} />
          <p>{opcoesAlternativas[index]}) </p>
          <p id='resposta_escolhida' style={{
            backgroundColor: alternativasSelecionadas?.textoAlternativa === textoAlternativa && corDeFundo,
            color: alternativasSelecionadas?.textoAlternativa === textoAlternativa && corDaLetra,
            cursor: 'pointer'
          }}>{textoAlternativa}</p>
        </label>
      </li>
    )
  }