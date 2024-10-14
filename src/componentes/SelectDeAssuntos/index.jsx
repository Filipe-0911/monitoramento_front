import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import CampoForm from '../CampoForm';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  `;

const StyledSelect = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: 2px solid #6a6a6a;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: transparent;
  color: white;
  opacity: 0.7;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
`;

const Options = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #201d1d;
  border: 2px solid #6a6a6a;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 10;
  max-height: 300px;
  overflow-y: auto; 
`;

const Option = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  background-color: transparent;
  text-align: left;
  color: white;
  &:hover {
    background-color: #f0f0f0;
    color: #201d1d;;
  }
`;

const HiddenSelect = styled.select`
  display: none;
`;

const SelectDeAssuntos = ({ options, onChange, defaultValue = null }) => {
  const [valorParaBusca, setValorParaBusca] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState({
    id: null,
    nome: "Escolha uma opção"
  });

  useEffect(() => {
    defaultValue !== null && setSelectValue(defaultValue);
  }, [defaultValue])


  const handleSelect = (option) => {
    let eventoOpcaoEscolhida = { target: { name: "idAssunto", value: option.id } }
    setSelectValue(option);
    onChange(eventoOpcaoEscolhida);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <StyledSelect onClick={() => setIsOpen(!isOpen)}>
        {selectValue.nome}
      </StyledSelect>
      {isOpen && (
        <Options>
          <div style={{ display: 'flex', alignItems: "center" }}>
            <CampoForm
              type="search"
              defaultValue={valorParaBusca}
              onChange={(e) => setValorParaBusca(e.target.value)}
              placeholder="Buscar assunto"
              name="busca"
              autoFocus={true}
            />
            {valorParaBusca.length === 0 && <FaSearch style={{ position: 'absolute', right: "10px" }} />}
          </div>
          {
            valorParaBusca
              ? options.filter(assunto => assunto.nome.toLowerCase().includes(valorParaBusca.toLowerCase()))
                .map((assunto) => (
                  <Option key={assunto.id} onClick={() => handleSelect(assunto)}>
                    {assunto.nome}
                  </Option>
                ))
              : options.map((assunto) => (
                <Option key={assunto.id} onClick={() => handleSelect(assunto)}>
                  {assunto.nome}
                </Option>
              ))
          }
        </Options>
      )}
      <HiddenSelect value={selectValue.nome} onChange={(e) => handleSelect(e)} >

        {options.map((assunto) => (
          <option key={assunto.id} value={assunto} name={assunto.nome}>
            {assunto.nome}
          </option>
        ))}
      </HiddenSelect>
    </Wrapper>
  );
};

export default SelectDeAssuntos;
