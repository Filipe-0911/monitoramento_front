import React from "react";
import Login from "../Paginas/Login";
import ProtectedRoutes from "./ProtectedRoutes";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "../Paginas/Cadastro";
import Home from "../Paginas/Home";
import Provas from "../Paginas/Provas";
import ProvaEspecifica from "../Paginas/ProvaEspecifica";
import DetalhamentoAssunto from "../Paginas/DetalhamentoAssunto";

const Routering = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/home" element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                } />
                <Route path="/provas" element={
                    <ProtectedRoutes>
                        <Provas />
                    </ProtectedRoutes>
                } />
                <Route path="/provas/:id/*" element={
                    <ProtectedRoutes>
                        <ProvaEspecifica />
                    </ProtectedRoutes>
                } />
                <Route path="/provas/:idProva/materias/:idMateria/assuntos/:idAssunto/*" element={
                    <ProtectedRoutes>
                        <DetalhamentoAssunto />
                    </ProtectedRoutes>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default Routering;