import React from "react";
import Login from "../Paginas/Login";
import ProtectedRoutes from "./ProtectedRoutes";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "../Paginas/Cadastro";

const Routering = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro/>} />
                <Route path="/home" element={
                    <ProtectedRoutes>
                        <h1>Home</h1>
                    </ProtectedRoutes>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default Routering;