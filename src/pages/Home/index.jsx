import { useEffect, useState } from 'react';
import './styles.css';

export default function ApiChuckNorris() {
    const [fato, setFato] = useState(<>Carregando...</>);
    const [error, setError] = useState(null);

    // Função para carregar um fato aleatório sobre Chuck Norris
    async function carregarFatoChuckNorris() {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random', requestOptions);

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const data = await response.json();
            return data.value; // Retorna o fato em inglês
        } catch (err) {
            setError('Erro ao carregar o fato.');
            return null;
        }
    }

    // Função para atualizar o estado com um novo fato
    async function atualizarFato() {
        const novoFato = await carregarFatoChuckNorris();
        setFato(novoFato || 'Nenhum fato disponível');
    }

    // Carrega o primeiro fato ao montar o componente
    useEffect(() => {
        atualizarFato();
    }, []);

    return (
        <div className='container'>
            <h2>Fato sobre Chuck Norris</h2>
            <p>{error ? error : fato}</p>
            <button className='btn-load' onClick={atualizarFato}>Mostrar outro fato</button>
        </div>
    );
}
