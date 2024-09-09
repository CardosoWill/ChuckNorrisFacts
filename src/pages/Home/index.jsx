import './styles.css';
import React, { useState } from 'react';

export default function Home() {

    const [piada, setPiada] = useState('Clique no botão para ouvir uma piada aleatória!');

    async function carregarPiada() {
        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            const data = await response.json();
            setPiada(data.value);
        } catch (error) {
            console.error('Erro ao carregar piada:', error);
            setPiada('Ocorreu um erro ao carregar a piada. Tente novamente.');
        }
    }

    return (
        <main>
            <h2>Algumas <s>piadas</s> FATOS sobre o Chuck Norris</h2>
            <div className="chuck-norris-jokes">
                <h1>Piadas do Chuck Norris</h1>
                <button onClick={carregarPiada}>Contar Piada</button>
                <p>{piada}</p>
            </div>
        </main>
    )
}