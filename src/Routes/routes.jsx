import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../Paginas/Login";
import Cadastro from "../Paginas/Cadastro";
import Home from "../Paginas/Home";
import Provas from "../Paginas/Provas";
import ProvaEspecifica from "../Paginas/ProvaEspecifica";
import DetalhamentoAssunto from "../Paginas/DetalhamentoAssunto";
import Agendamentos from "../Paginas/Agendamentos";
import { ProvaProvider } from "../Context/ProvaProvider";
import ProtectedRoutes from "./ProtectedRoutes";
import UserProvider from "../Context/UserProvider";
import PaginaBase from "../Paginas/PaginaBase";

const Routering = () => {
    return (
        <BrowserRouter>
            <ProvaProvider>
                <UserProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/" element={
                            <ProtectedRoutes>
                                <PaginaBase />
                            </ProtectedRoutes>
                        }>
                            <Route index element={<Home />} />
                            <Route path="provas" element={<Provas />} />
                            <Route path="provas/:id" element={<ProvaEspecifica />} />
                            <Route path="provas/:idProva/materias/:idMateria/assuntos/:idAssunto" element={<DetalhamentoAssunto />} />
                            <Route path="planejador" element={<Agendamentos />} />
                        </Route>
                    </Routes>
                </UserProvider>
            </ProvaProvider>
        </BrowserRouter>
    );
}

export default Routering;
