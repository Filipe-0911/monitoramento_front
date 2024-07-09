import React from "react";
import Login from "../Paginas/Login";
import ProtectedRoutes from "./ProtectedRoutes";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "../Paginas/Cadastro";
import Home from "../Paginas/Home";

const Routering = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro/>} />
                <Route path="/home" element={
                    <ProtectedRoutes>
                        <Home/>
                    </ProtectedRoutes>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default Routering;