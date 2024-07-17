import styled from "styled-components";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";

export const ContainerAccordionEstilizado = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    color: #000;
`

export const DivAccordionEstilizado = styled.div`
    background-color: #fff;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
`

export const ButtonAccordionHeaderEstilizado = styled.button`
    width: 100%;
    min-height: 42px;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;

    span {
        font-size: 20px;
    }

`

export const ArrowEstilizado = styled(GoChevronDown)`
    transform: ${(props) => (props.$activeIndex === true ? 'rotate(180deg)' : 'none')};
    transition: transform .2s linear;
    color: black;
`

export const AccordionBodyEstilizado = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    color: #444;
    font-size: 14px;
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: opacity .3s, height .3s;

    ${(props) => (props.$activeIndex ? `
        height: auto;
        opacity: 1;
        padding: 5px 0px;
    ` : "")}
    
    li {
        color: black;
        text-align: left;
        padding: 1em 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            font-size: 16px;
        }

        h5 {
            font-size: 20px;
        }
    }
`

export const DivBotoesCrudEstilizado = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;

    @media (max-width: 562px) {
        justify-content: space-between
    }
`;

export default function Accordion({ children, titulo }) {
    const [activeIndex, setActiveIndex] = useState(false);

    const toggleAccordion = () => {
        setActiveIndex(!activeIndex);
    };

    return (
        <ContainerAccordionEstilizado>
            <DivAccordionEstilizado>
                <ButtonAccordionHeaderEstilizado
                    onClick={() => toggleAccordion(!activeIndex)}
                >
                    <span>{titulo}</span>
                    <ArrowEstilizado

                        $activeIndex={activeIndex}
                    />
                </ButtonAccordionHeaderEstilizado>
                <AccordionBodyEstilizado $activeIndex={activeIndex}>
                    {children}
                </AccordionBodyEstilizado>
            </DivAccordionEstilizado>
        </ContainerAccordionEstilizado>
    );
}