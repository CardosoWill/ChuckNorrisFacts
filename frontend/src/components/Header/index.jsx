import { Link } from 'react-router-dom';
import './styles.css';
import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';

export default function Header() {
    const { role } = useContext(AuthContext);  // Obtém o token do contexto
    return (
        <header className="cabecalho">
            <h1>Feitos de Chuck Norris</h1>

            <nav>
                <ul>
                    <Link to="/piadas">
                        <li>Piadas</li>
                    </Link>
                    <Link to="/user">
                        <li>Perfil</li>
                    </Link>
                    
                    {/* Verifica se o token não existe e se não está na rota de login */}
                    {
                        role === 'admin'

                            ? <Link to="/novoUser"><li>Criar</li></Link> &&
                            <Link to="/fatos"> <li>Criar Fatos</li></Link>
                            : null
                    }

                </ul>
            </nav>
        </header>
    );

}
