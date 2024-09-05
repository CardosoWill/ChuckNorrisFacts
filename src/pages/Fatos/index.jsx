import React, { useState, useEffect } from 'react';

export default function ChuckNorrisJokes() {
    const [categoria, setCategoria] = useState('');
    const [piada, setPiada] = useState('Escolha uma categoria para ouvir uma piada!');
    const [categorias, setCategorias] = useState([]);

    // Carregar as categorias disponíveis da API ao montar o componente
    useEffect(() => {
        async function carregarCategorias() {
            const response = await fetch('https://api.chucknorris.io/jokes/categories');
            const data = await response.json();
            setCategorias(data);
        }
        carregarCategorias();
    }, []);

    // Função para buscar uma piada com base na categoria
    async function carregarPiada() {
        if (!categoria) return;

        const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`);
        const data = await response.json();
        setPiada(data.value);
    }

    return (
        <div className="chuck-norris-jokes">
            <h1>Piadas do Chuck Norris</h1>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <button onClick={carregarPiada} disabled={!categoria}>
                Contar Piada
            </button>
            <p>{piada}</p>
        </div>
    );
}
