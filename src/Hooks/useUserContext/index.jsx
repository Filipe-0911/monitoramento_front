import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserProvider";
import UserService from "../../services/Usuario";
import { useNavigate } from "react-router-dom";

export default function useUserContext () {
    const { user, setUser } = useContext(UserContext);
    const userService = new UserService();
    const navigate = useNavigate();

    const login = async (dados) => {
        try {
            const response = await userService.login(dados);
            setUser(response)
            response ? navigate("/") : console.log("Login failed", response);
            return true;

        } catch (error) {
            return error.response.data;

        }
    };

    function verificaSeEstaAutenticado () {
        userService.usuarioAutenticado().then(response => {
            if (response) {
                localStorage.setItem('user', user);
            } else {
                userService.logout();
                return;
            }
        });
    }

    return {
        user, 
        setUser, 
        login, 
        verificaSeEstaAutenticado
    };
}