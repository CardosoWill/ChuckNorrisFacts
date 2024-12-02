import './styles.css';
import React, { useState, useContext  } from 'react';
import { getContext, updatePiada, deletePiada} from '../../api/fatos';
import { AuthContext } from '../../auth/Context';

export default function Piadas() {
    const { role } = useContext(AuthContext); 
    console.log('Role atual:', role);
    const [id, setID] = useState();
    const [piada, setPiada] = useState('Clique no botão para ver uma piada aleatória!');
    const [editando, setEditando] = useState(false);
    const [novaPiada, setNovaPiada] = useState('');

    async function carregarPiada() {
        try {
            const response = await getContext();
            if (response) {
                setPiada(response.texto);
                setID(response.id);
            }
        } catch (error) {
            console.error('Erro ao buscar piada:', error);
            alert('Erro ao buscar piada!');
        }
    }

    function editarPiada() {
        setEditando(true);
        setNovaPiada(piada); 
    }

    function salvarEdicao() {
        if (novaPiada.trim()) {
            setPiada(novaPiada);
            updatePiada(id,novaPiada)
            setEditando(false);
        } else {
            alert('A piada não pode estar vazia!');
        }
    }

    function deletarPiada() {
        setPiada('A piada foi removida.');
        deletePiada(id);

    }

    return (
        <main className='piada'>
            <h2>Algumas <s>piadas</s> FATOS sobre o Chuck Norris</h2>
            <div className='centro'>
                {editando ? (
                    <div className='edicao'>
                        <textarea 
                            type='text'
                            value={novaPiada}
                            onChange={(e) => setNovaPiada(e.target.value)}
                        />
                        <div className='centro'>
                            <button onClick={salvarEdicao}>Salvar</button>
                            <button onClick={() => setEditando(false)}>Cancelar</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p>{piada}</p>
                        <button onClick={carregarPiada}>Contar Fato</button>

                        {role === 'admin' && (
                            <>
                                <button onClick={editarPiada}>Editar</button>
                                <button onClick={deletarPiada}>Deletar</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
