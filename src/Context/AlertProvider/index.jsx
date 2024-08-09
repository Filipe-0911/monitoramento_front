import { createContext, useState } from "react";

export const AlertContext = createContext();
AlertContext.displayName = "Alerta";

export default function AlertProvider({ children }) {
    const [dadosAlerta, setDadosAlerta] = useState({
        success: false,
        error: false,
        message: "",
    });

    return (
        <AlertContext.Provider value={{ dadosAlerta, setDadosAlerta }}>
            {children}
        </AlertContext.Provider>
    );
}