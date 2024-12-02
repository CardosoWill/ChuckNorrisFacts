import { Link } from 'react-router-dom';
import './styles.css';
import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';

export default function Header() {
    const { role } = useContext(AuthContext);
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
                    <Link to="/todasPiadas">
                        <li>Todas as Piadas</li>
                    </Link>
                    
                    {role === 'admin'?<Link to="/fatos"><li>Criar Fatos</li></Link>: null}
                    {role === 'admin'?<Link to="/novoUser"><li>Criar</li></Link>: null}
                    {role === 'admin'?<Link to="/buscarUsers"> <li>Buscar Usuarios</li></Link>: null}
                </ul>
            </nav>
        </header>
    );
}
