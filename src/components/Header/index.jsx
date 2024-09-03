import { Link } from 'react-router-dom';
import './styles.css';

export default function Header(){
    return(
        
            <header id="cabecalho">
                <h1>Página dedicada aos feitos inéditos de Chuck Norris</h1>
                
                <nav>
                    <ul>
                        <Link to="/">
                            <li>Home</li>
                        </Link>
                        <Link to="/about">
                            <li>Sobre</li>
                        </Link>
                    </ul>
                </nav>
            </header>
           
    )
}