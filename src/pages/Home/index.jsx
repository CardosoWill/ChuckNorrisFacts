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
        <main className='home'>
            <h2>Algumas <s>piadas</s> FATOS sobre o Chuck Norris</h2>
            <div className='controle' >
                <p>{piada}</p>
                <button onClick={carregarPiada}>Contar Fato</button>
            </div>
        </main>
    )
}