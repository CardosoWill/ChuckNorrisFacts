import './styles.css'; 
import React, { useState } from 'react';
import { saveJoke } from '../../api/fatos';

export default function Piadas() {
    const [categoria, setCategoria] = useState('');
    const [texto, setTexto] = useState('');
    const [mensagem, setMensagem] = useState('');

    const categorias = [
        "animal", 
        "celebridade", 
        "desenvolvimento", 
        "moda", 
        "comida", 
        "história", 
        "dinheiro", 
        "filme", 
        "música", 
        "ciência", 
        "esporte", 
        "viagem"
    ];

    async function salvarPiada() {
        if (!categoria || !texto) {
            setMensagem('Por favor, preencha todos os campos!');
            return;
        }

        try {
            const response = await saveJoke({ categoria, texto });
            if (response.id) {
                setMensagem('Fato salvo com sucesso!');
                setCategoria('');
                setTexto('');
            } else {
                setMensagem('Erro ao salvar fato!');
            }
        } catch (error) {
            setMensagem('Erro asdao salvar fato!');
        }
    }

    return (
         <main className="piada">
            <h2>Crie suas <s>piadas</s> FATOS sobre o Chuck Norris</h2>
            <div className="criar-piada">
                <br/>
                <div className = "centro"> 
                    <label>
                        Categoria:
                        <select 
                            value={categoria} 
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <br/>
                <label>
                    <textarea 
                        value={texto} 
                        onChange={(e) => setTexto(e.target.value)} 
                        placeholder="Digite o texto do fato"
                    />
                </label>
                {mensagem && <p className="mensagem">{mensagem}</p>}
                <div className = "centro">
                    <button onClick={salvarPiada}>Salvar Fato</button>
                </div>
            </div>
        </main>
    );
}
