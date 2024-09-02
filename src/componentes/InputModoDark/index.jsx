import React from 'react'
import useUserContext from '../../Hooks/useUserContext';
import "./InputModoDark.css";

export default function InputModoDark() {
    const {modificaModoDarkOuWhite, usuarioPrefereModoDark} = useUserContext();
    return (
        <div style={{padding: '10px 0px'}}>
            <label className="switch">
                <input type="checkbox" id="theme-toggle" onChange={modificaModoDarkOuWhite} checked={usuarioPrefereModoDark}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}
