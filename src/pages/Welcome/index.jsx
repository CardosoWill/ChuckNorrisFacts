import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Welcome() {
    return (
        <div className="welcome">
            <div className="welcome-content">
                <h1>Bem-vindo ao Site de Fatos Chuck Norris!</h1>
                <p>
                    Prepare-se para ouvir os fatos mais incríveis e engraçados sobre Chuck Norris!
                    Clique no botão abaixo para começar a ouvir algumas piadas incríveis.
                </p>
                <Link to="/login" className="login-link">Ir para Login</Link>
            </div>
        </div>
    );
}
