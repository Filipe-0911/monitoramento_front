import JoditEditor from "jodit-react";
import { useRef } from "react";
import "./EditorDeTexto.css"

import React from 'react'

export default function EditorDeTexto({ handleUpdate, defaultValue }) {
    const editor = useRef(null);

    const content = `
    <h1 style="color: #333; font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        Resumo sobre Props, State e Componentes em React
    </h1>

    <h2 style="color: #444; font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        1. Props (Propriedades)
    </h2>
    <p style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        <strong>O que são:</strong> As <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">props</code> (abreviação de "properties") são valores que você pode passar para componentes React. Elas permitem que você passe dados de um componente pai para um componente filho.
    </p>
    <p style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        <strong>Como funcionam:</strong> As <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">props</code> são imutáveis dentro do componente. Isso significa que, uma vez que as <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">props</code> são passadas para um componente, o componente não pode alterá-las. Em vez disso, ele pode usá-las para renderizar conteúdo dinâmico.
    </p>
    <div style="font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; margin: 20px;">
        <strong>Exemplo:</strong>
        <pre style="background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto;">
            <code>function Greeting(props) {
    return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

function App() {
    return &lt;Greeting name="Filipe" /&gt;;
}</code></pre>
    </div>

    <h2 style="color: #444; font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        2. State (Estado)
    </h2>
    <p style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        <strong>O que é:</strong> O <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">state</code> é um objeto que permite a um componente React manter e gerenciar seus próprios dados internos, que podem mudar ao longo do tempo. Diferente das <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">props</code>, o <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">state</code> é mutável, ou seja, pode ser atualizado e essas atualizações podem desencadear uma nova renderização do componente.
    </p>
    <p style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        <strong>Como funciona:</strong> Você pode inicializar o <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">state</code> de um componente e, ao longo do tempo, atualizá-lo usando a função <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">setState</code> (ou o <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">useState</code> hook em componentes funcionais). Quando o <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">state</code> muda, o componente é re-renderizado com os novos valores de estado.
    </p>
    <div style="font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; margin: 20px;">
        <strong>Exemplo:</strong>
        <pre style="background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto;">
            <code>import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        &lt;div&gt;
            &lt;p&gt;You clicked {count} times&lt;/p&gt;
            &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
                Click me
            &lt;/button&gt;
        &lt;/div&gt;
    );
}

function App() {
    return &lt;Counter /&gt;;
}</code></pre>
    </div>

    <h2 style="color: #444; font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        3. Declarando Componentes
    </h2>
    <p style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        No React, você pode declarar componentes de duas maneiras principais: <strong>Componentes Funcionais</strong> e <strong>Componentes de Classe</strong>.
    </p>

    <h3 style="color: #444; font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        Componentes Funcionais
    </h3>
    <p style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        São funções JavaScript que recebem <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">props</code> como argumento e retornam elementos React. Usam hooks (<code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">useState</code>, <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">useEffect</code>, etc.) para gerenciar estado e efeitos.
    </p>
    <div style="font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; margin: 20px;">
        <strong>Exemplo:</strong>
        <pre style="background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto;">
            <code>function MyComponent(props) {
    return &lt;div&gt;{props.message}&lt;/div&gt;;
}</code></pre>
    </div>

    <h3 style="color: #444; font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        Componentes de Classe
    </h3>
    <p style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        São classes que estendem <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">React.Component</code> e precisam ter um método <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">render</code> que retorna elementos React. Podem gerenciar estado diretamente usando <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">this.state</code> e <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">this.setState</code>.
    </p>
    <div style="font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; margin: 20px;">
        <strong>Exemplo:</strong>
        <pre style="background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto;">
            <code>import React, { Component } from 'react';

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    render() {
        return &lt;div&gt;{this.props.message}&lt;/div&gt;;
    }
}</code></pre>
    </div>

    <h2 style="color: #444; font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        Resumo
    </h2>
    <ul style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">
        <li><strong>Props:</strong> Dados imutáveis passados de um componente pai para um filho.</li>
        <li><strong>State:</strong> Dados mutáveis que representam o estado interno de um componente e podem ser atualizados para causar re-renderizações.</li>
        <li><strong>Componentes Funcionais:</strong> Mais simples, utilizam hooks para estado e efeitos.</li>
        <li><strong>Componentes de Classe:</strong> Mais antigos, utilizam classes e <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 1.1em;">this</code> para gerenciar estado e ciclo de vida.</li>
    </ul>
`;


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

