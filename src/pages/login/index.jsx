import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // Função que será chamada ao submeter o formulário
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão, mas só é chamada se os campos estiverem válidos
    // Redireciona para a página /home após validação
    navigate('/home');
  };

  return (
    <main>
      <div className="container">
        {/* Mude o onClick do botão para onSubmit no form */}
        <form className="form" onSubmit={handleFormSubmit}>
          <p className="title">Login de Usuario</p>
          <input className="input" type="email" placeholder="Email" required />

          <input className="input password" type="password" placeholder="Senha" required />

          {/* Botão sem onClick, a lógica é gerida pelo onSubmit do form */}
          <button className="btn" type="submit">
            Login
          </button>

          <p className="signin">
            Não tem um login? <a href="/register" className="link">Clique aqui</a>
          </p>
        </form>
      </div>
    </main>
  );
}
