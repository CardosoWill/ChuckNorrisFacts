import { Link } from 'react-router-dom';
import './styles.css';

export default function Header() {
    return (
        <header id="cabecalho">
            <h1>Página dedicada aos feitos inéditos de Chuck Norris</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">Sobre</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
