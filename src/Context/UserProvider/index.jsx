import { createContext, useState } from "react";

export const UserContext = createContext();
UserContext.displayName = "User";

export default function UserProvider ({ children }) {
    const [user, setUser] = useState({
        login: "",
        Authorization: "",
        nome: "",
        horarioLogin: "",
        id: null,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );

}