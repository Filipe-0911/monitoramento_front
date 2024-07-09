import React from "react";
import Login from "../Paginas/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const Routering = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="/home" element={
                    <h1>Tela Home</h1>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default Routering;