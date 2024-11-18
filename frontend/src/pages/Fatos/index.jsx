import './styles.css';
import React, { useState, useEffect } from 'react';
import { getContext} from '../../api/fatos';

export default function ChuckNorrisJokes() {
    const [categoria, setCategoria] = useState('');
    const [texto, setTexto] = useState('Escolha uma categoria para ouvir um Fato!');
    const [categorias, setCategorias] = useState([]);

    async function carregarPiadas() {
        try {
            const response = await getContext()
            if(response.id) {
              setId(response.id)
              setNome(response.nome)
              setEmail(response.email)
            }
          } catch (error) {
            toast('Tente novamente mais tarde!')
          }
    }
    useEffect(() => {
    }, []);
      
    

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
