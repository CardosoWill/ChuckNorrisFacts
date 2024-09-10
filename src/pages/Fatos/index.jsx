import './styles.css';
import React, { useState, useEffect } from 'react';

export default function ChuckNorrisJokes() {
    const [categoria, setCategoria] = useState('');
    const [piada, setPiada] = useState('Escolha uma categoria para ouvir um Fato!');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function carregarCategorias() {
            try {
                const response = await fetch('https://api.chucknorris.io/jokes/categories');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        }
        carregarCategorias();
    }, []);

    async function carregarPiada() {
        if (!categoria) return;

        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`);
            const data = await response.json();
            setPiada(data.value);
        } catch (error) {
            console.error('Erro ao carregar piada:', error);
            setPiada('Ocorreu um erro ao carregar a piada. Tente novamente.');
        }
    }

    return (
        <div className="piadas">
            <div className='controle'>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <button onClick={carregarPiada} disabled={!categoria}>
                    Contar Fato
                </button>
            </div>
            <p>{piada}</p>
        </div>
    );
}
