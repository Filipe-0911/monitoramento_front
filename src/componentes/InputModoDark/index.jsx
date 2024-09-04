import React from 'react'
import useUserContext from '../../Hooks/useUserContext';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "./InputModoDark.css";

export default function InputModoDark() {
    const {modificaModoDarkOuWhite, usuarioPrefereModoDark} = useUserContext();
    return (
        <div style={{padding: '10px 0px'}}>
            <label className="switch">
                <input type="checkbox" id="theme-toggle" onChange={modificaModoDarkOuWhite} checked={usuarioPrefereModoDark}/>
                <span className="slider round" style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                    <MdLightMode color='yellow' />
                    <MdDarkMode />
                </span>
            </label>
        </div>
    )
}
