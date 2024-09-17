import { Link } from 'react-router-dom';
import './styles.css';

export default function Header() {
    return (
        <header className="cabecalho">
            <h1>feitos de Chuck Norris</h1>
            
            <nav>
                <ul>
                   <Link to="/">
                        <li>Welcome</li>
                    </Link>
                    <Link to="/login">
                        <li>Logout</li>
                    </Link>
                    <Link to="/piadas">
                        <li>Piadas</li>
                    </Link>
                    <Link to="/about">
                        <li>Sobre</li>
                    </Link>
                    <Link to="/fatos">
                        <li>Fatos</li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}
