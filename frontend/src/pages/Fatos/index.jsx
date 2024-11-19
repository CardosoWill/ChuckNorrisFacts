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

    // Função para salvar uma nova piada
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
                <h3>Adicionar Novo Fato</h3>
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
                <label>
                    Texto:
                    <textarea 
                        value={texto} 
                        onChange={(e) => setTexto(e.target.value)} 
                        placeholder="Digite o texto do fato"
                    />
                </label>
                <button onClick={salvarPiada}>Salvar Fato</button>
                {mensagem && <p className="mensagem">{mensagem}</p>}
            </div>
        </main>
    );
}
