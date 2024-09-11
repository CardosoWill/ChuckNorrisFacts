import './styles.css';
import React, { useState, useEffect } from 'react';
import translate from "translate";
translate.engine = "google";//"yandex", "libre", "deepl"

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
        if (!categoria) return 
        
        const idade = 10;
        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`);
            const data = await response.json();

            const traduzido = await translate(data.value, "pt");
            
            if(categoria == "religion"){
                const correcao = "Essa píada é muito pesada para que possa ser exibida infelismente chuck Norris não tem filtros";
                setPiada(correcao);
            }else if(categoria == "explicit"){
                if(idade > 1000){
                    setPiada(traduzido);
                }else{
                    const correcao = "Essa píada é muito pesada você precisa ter mais de 1000 anos para ler";
                    setPiada(correcao);
                }
            }else{
                setPiada(traduzido);
            }
            
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
