import { Link } from 'react-router-dom';
import './styles.css';

export default function Header() {
    return (
        <header className="cabecalho">
            <h1>feitos de Chuck Norris</h1>
            
            <nav>
                <ul>
                    <Link to="/piadas">
                        <li>Piadas</li>
                    </Link>
                    <Link to="/user">
                        <li>Perfil</li>
                    </Link>
                    <Link to="/fatos">
                        <li>Fatos</li>
                    </Link>
                    <Link to="/novoUser">
                        <li>Criar</li>
                    </Link>

                </ul>
            </nav>
        </header>
    );
}
