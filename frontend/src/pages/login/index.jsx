import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const apertaBotao = (event) => {
    event.preventDefault();
    navigate('/piadas');
  };

  return (
    <main>
      <div className="login-container">
        <form className="login-form" onSubmit={apertaBotao}>
          <p className="login-title">Login de Usuário</p>

          <input className="login-input" type="email" placeholder="Email" required />
          <input className="login-input" type="password" placeholder="Senha" required />

          <button className="login-btn" type="submit">Login</button>

          <p className="login-signin">Não tem um login? <a href="/register" className="login-link">Clique aqui</a></p>
        </form>
      </div>
    </main>
  );
}
