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
import AlertProvider from "../Context/AlertProvider";
import Questionario from "../Paginas/Questionario";
import QuestoesDashboard from "../Paginas/QuestoesDashboard";
import EditarQuestoes from "../Paginas/EditaQuestoes";

const Routering = () => {
    return (
        <BrowserRouter>
            <ProvaProvider>
                <UserProvider>
                    <AlertProvider>
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
                                <Route path="provas/:idProva/materias/:idMateria/questoes-dashboard/" element={<QuestoesDashboard />} />
                                <Route path="provas/:idProva/materias/:idMateria/questoes/" element={<Questionario />} />
                                <Route path="provas/:idProva/materias/:idMateria/editar-questoes/" element={<EditarQuestoes />} />
                            </Route>
                        </Routes>
                    </AlertProvider>
                </UserProvider>
            </ProvaProvider>
        </BrowserRouter>
    );
}

export default Routering;
