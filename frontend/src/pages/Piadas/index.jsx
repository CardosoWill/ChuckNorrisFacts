import './styles.css';
import React, { useState } from 'react';
import translate from "translate";
translate.engine = "google";//"yandex", "libre", "deepl"

export default function Piadas() {

    const [piada, setPiada] = useState('Clique no botão para ouvir uma piada aleatória!');

    async function carregarPiada() {
        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            const data = await response.json();
            const traduzido = await translate(data.value, "pt");
            setPiada(traduzido);
        } catch (error) {
            console.error('Erro ao carregar piada:', error);
            setPiada('Ocorreu um erro ao carregar a piada. Tente novamente.');
        }
    }

    return (
        <main className='piada'>
            <h2>Algumas <s>piadas</s> FATOS sobre o Chuck Norris</h2>
            <div className='controle' >
                <p>{piada}</p>
                <button onClick={carregarPiada}>Contar Fato</button>
            </div>
        </main>
    )
}