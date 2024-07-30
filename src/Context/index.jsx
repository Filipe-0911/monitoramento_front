import { createContext, useEffect, useMemo, useReducer, useState } from "react"
import { ADICIONAR_PROVA } from "../Paginas/ProvaEspecifica/reducer"
import reducer from "../Paginas/ProvaEspecifica/reducer";
import ProvasService from "../services/Provas";
import { useParams } from "react-router-dom";

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
                setIdAssunto
            }}
        >
            {children}
        </ProvaContext.Provider>
    );


}