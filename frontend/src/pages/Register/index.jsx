import { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { createUser, verificaCode } from '../../api/user';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();

  // Estado para alternar entre o formulário de cadastro e o de MFA
  const [isSignUp, setIsSignUp] = useState(true);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenMFA, setTokenMFA] = useState('');

  const handleBackClick = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const responseApi = await createUser({ nome, email, password });
      console.log(responseApi);
      if (responseApi.id) {
        setIsSignUp(false);  // Alterna para o formulário de MFA
      } else {
        console.log(responseApi);
      }
    } catch (error) {
      console.log(error);
      if (error.status === 403) {
        return toast("Sem permissão.");
      }
      if (error.status === 401 || error.status === 404) {
        return toast('Email ou password inválido, tente novamente!');
      }
      toast('Erro inesperado, tente novamente mais tarde!');
    }
  };

  // Função para enviar o token para verificação
  const handleVerifyToken = async (e) => {
    try {
      e.preventDefault();

      const responseApi = await verificaCode({ tokenMFA });
      console.log(responseApi);
      if (responseApi) {
        navigate('/login'); // Redireciona para o login após verificação bem-sucedida
      } else {
        toast('Token inválido, tente novamente!');
      }
    } catch (error) {
      console.log(error);
      if (error.status === 403) {
        return toast("Sem permissão.");
      }
      if (error.status === 401 || error.status === 404) {
        return toast('Token inválido, tente novamente!');
      }
      toast('Erro inesperado, tente novamente mais tarde!');
    }
  };

  return (
    <div className="form-container">
      {/* Formulário de Cadastro */}
      {isSignUp && (
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Cadastre-se</h2>
            <div className="input-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button" type="submit">
              Cadastrar-se
            </button>
            <button className="button back-button" onClick={handleBackClick}>
              Voltar
            </button>
          </form>
        </div>
      )}

      {/* Formulário de MFA (Token) */}
      {!isSignUp && (
        <div className="MFA-container">
          <form className="MFA-form" onSubmit={handleVerifyToken}>
            <h2>MFA</h2>
            <div className="input-group">
              <label htmlFor="MFA">Token:</label>
              <input
                type="text"
                id="MFA"
                required
                value={tokenMFA}
                onChange={(e) => setTokenMFA(e.target.value)}
              />
            </div>
            <button className="button" type="submit">
              Entrar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
