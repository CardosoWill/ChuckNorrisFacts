import './styles.css';
import React, { useState, useEffect, useContext } from 'react';
import { getAll, updatePiada, deletePiada } from '../../api/fatos';
import { AuthContext } from '../../auth/Context';

const PIADAS_POR_PAGINA = 5;

export default function Piadas() {
    const { role } = useContext(AuthContext);
    const [piadas, setPiadas] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [editandoId, setEditandoId] = useState(null);
    const [novaPiada, setNovaPiada] = useState('');

    useEffect(() => {
        async function carregarPiadas() {
            try {
                const response = await getAll();
                if (response) {
                    setPiadas(response);
                }
            } catch (error) {
                console.error('Erro ao buscar piadas:', error);
                alert('Erro ao buscar piadas!');
            }
        }
        carregarPiadas();
    }, []);

    const indiceInicial = (paginaAtual - 1) * PIADAS_POR_PAGINA;
    const indiceFinal = indiceInicial + PIADAS_POR_PAGINA;
    const piadasPagina = piadas.slice(indiceInicial, indiceFinal);

    const totalPaginas = Math.ceil(piadas.length / PIADAS_POR_PAGINA);

    function iniciarEdicao(id, texto) {
        setEditandoId(id);
        setNovaPiada(texto);
    }

    async function salvarEdicao(id) {
        if (novaPiada.trim()) {
            try {
                await updatePiada(id, novaPiada);
                setPiadas((prev) =>
                    prev.map((piada) =>
                        piada.id === id ? { ...piada, texto: novaPiada } : piada
                    )
                );
                setEditandoId(null);
                setNovaPiada('');
            } catch (error) {
                console.error('Erro ao salvar edição:', error);
                alert('Erro ao salvar edição!');
            }
        } else {
            alert('A piada não pode estar vazia!');
        }
    }

    async function deletarPiada(id) {
        try {
            await deletePiada(id);
            setPiadas((prev) => prev.filter((piada) => piada.id !== id));
        } catch (error) {
            console.error('Erro ao deletar piada:', error);
            alert('Erro ao deletar piada!');
        }
    }

    return (
        <main className='piada'>
            <h2>Lista de <s>piadas</s> FATOS sobre o Chuck Norris</h2>
            <table className='tabela-piadas'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Texto</th>
                        {role === 'admin' && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {piadasPagina.map((piada) => (
                        <tr key={piada.id}>
                            <td>{piada.id}</td>
                            <td>
                                {editandoId === piada.id ? (
                                    <input
                                        type='text'
                                        value={novaPiada}
                                        onChange={(e) => setNovaPiada(e.target.value)}
                                    />
                                ) : (
                                    piada.texto
                                )}
                            </td>
                            {role === 'admin' && (
                                <td>
                                    {editandoId === piada.id ? (
                                       <div className="actions">
                                            <button onClick={() => salvarEdicao(piada.id)}>Salvar</button>
                                            <button onClick={() => setEditandoId(null)}>Cancelar</button>
                                         </div>
                                    ) : (

                                        <div className="actions">
                                       <button onClick={() => iniciarEdicao(piada.id, piada.texto)}>Editar</button>
                                       <button onClick={() => deletarPiada(piada.id)}>Deletar</button>
                                    </div>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='paginacao'>
                <button
                    disabled={paginaAtual === 1}
                    onClick={() => setPaginaAtual((prev) => prev - 1)}>Anterior</button>
                <span>Página {paginaAtual} de {totalPaginas}</span>
                <button
                disabled={paginaAtual === totalPaginas}
                    onClick={() => setPaginaAtual((prev) => prev + 1)}>Próxima</button>
            </div>
        </main>
    );
}
