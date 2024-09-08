import { Link } from 'react-router-dom';
import './styles.css';

export default function Header() {
    return (
        <header id="cabecalho">
            <h1>feitos de Chuck Norris</h1>
            
            <nav>
                <ul>
                    <Link to="/">
                        <li>Login</li>
                    </Link>
                    <Link to="/home">
                        <li>Home</li>
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
