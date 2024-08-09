import JoditEditor from "jodit-react";
import { useRef } from "react";
import "./EditorDeTexto.css"

import React from 'react'

export default function EditorDeTexto({ handleUpdate, defaultValue }) {
    const editor = useRef(null);

    const config = {
        readonly: false,
        heigth: 900,
    }

    return (
        <div className="div_principal">
            <JoditEditor
                ref={editor}
                value={defaultValue}
                config={config}
                onBlur={(newContent) => handleUpdate(newContent)}
                onChange={newContent => {}}
            />

            
        </div>
    )
}

