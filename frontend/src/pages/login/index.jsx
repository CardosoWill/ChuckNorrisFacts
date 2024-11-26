import { useContext, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/Context';
import { loginUser } from '../../api/user';

export default function Login() {
  const  { login }  = useContext(AuthContext)
  const navigate = useNavigate();

  const apertaBotao = (event) => {
    event.preventDefault();
    navigate('/');
  };
  const cadastrese = (event) => {
    event.preventDefault();
    navigate('/register');
  };
  /*
    const handleBackClick = () => {
      navigate('/')
    };
  
    const handleCreateAccont = () => {
      navigate('/login')
    };
  */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Informe o E-mail e senha para continuar!");
    }

    try {
      const response = await loginUser(email, password);
      if (response.token) {
        login(response.token);
        navigate('/piadas');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Email ou senha inválido");
      } else {
        alert("Ocorreu um erro. Tente novamente mais tarde.");
      }
    }
};

  return (
    <main>
      <div className="login-container">
        <form className="login-form" onSubmit={apertaBotao}>
          <p className="login-title">Login de Usuário</p>

          <input className="login-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="login-input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />

          <button className="login-btn" type="submit" onClick={handleSubmit}>Login</button>

          <p className="login-signin">Não tem um login? </p>
          <button className="btn-cadastro" onClick={cadastrese} >Clique aqui</button>
        </form>
      </div>
    </main>
  );
}
