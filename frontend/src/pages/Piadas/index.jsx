import './styles.css';
import React, { useState } from 'react';
import { getContext} from '../../api/fatos';

export default function Piadas() {

    const [piada, setPiada] = useState('Clique no botão para ver uma piada aleatória!');

    async function carregarPiada() {
        try {
            const response = await getContext()
            if(response) {
                setPiada(response.joke)
            }
          } catch (error) {
            toast('Erro ao busccar piada!')
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