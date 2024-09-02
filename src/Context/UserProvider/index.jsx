import { createContext, useState } from "react";

export const UserContext = createContext();
UserContext.displayName = "User";

export default function UserProvider ({ children }) {
    const [usuarioPrefereModoDark, setUsuarioPrefereModoDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
    const [user, setUser] = useState({
        login: "",
        Authorization: "",
        nome: "",
        horarioLogin: "",
        id: null,
    });

    return (
        <UserContext.Provider 
        value={{ 
            user, 
            setUser,
            usuarioPrefereModoDark,
            setUsuarioPrefereModoDark
         }}
        >
            {children}
        </UserContext.Provider>
    );

}