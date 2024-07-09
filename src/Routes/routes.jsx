import React from "react";
import Login from "../Paginas/Login";
import ProtectedRoutes from "./ProtectedRoutes";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const Routering = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/cadastrar" element={<h1>Cadastrar</h1>} />
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