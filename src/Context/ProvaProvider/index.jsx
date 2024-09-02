import { createContext, useReducer, useState } from "react"
import reducer from "../../Paginas/ProvaEspecifica/reducer";

export const ProvaContext = createContext();
ProvaContext.displayName = "Prova";

export const ProvaProvider = ({ children }) => {
    
    const estadoInicial = {
        id: "",
        titulo: "",
        data: "",
        corDaProva: "",
        listaDeMaterias: [],
    }
    
    const [quantidadeDeInputs, setQuantidadeDeInputs] = useState([]);
    const [idMateria, setIdMateria] = useState(null);
    const [idAssunto, setIdAssunto] = useState(null);
    const [prova, dispatcher] = useReducer(reducer, estadoInicial);

    const verificaSePodeAdicionarInputAssunto = () => {
        if(quantidadeDeInputs.length > 0) {
            return true;
        }
        return false;
    }

    return (
        <ProvaContext.Provider
            value={{
                prova,
                dispatcher,
                quantidadeDeInputs,
                setQuantidadeDeInputs,
                idMateria,
                setIdMateria,
                idAssunto,
                setIdAssunto,
                verificaSePodeAdicionarInputAssunto,

            }}
        >
            {children}
        </ProvaContext.Provider>
    );


}