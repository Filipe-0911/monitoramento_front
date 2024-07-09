import React, { useEffect, useState } from "react";
import UserService from "../../services/Usuario";
import { useNavigate } from "react-router-dom";

const userService = new UserService();

const ProtectedRoutes = (props) => {
    const [logado, setLogado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioAutenticado = userService.verificaHaQuantoTempoFoiFeitoOLogin();
        setLogado(usuarioAutenticado);

        if (!usuarioAutenticado) {
            navigate("/login");
        }
    }, [logado, navigate]);

    return logado ? props.children : null;
}

export default ProtectedRoutes;
