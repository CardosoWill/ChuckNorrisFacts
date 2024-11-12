import { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/user';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      const responseApi = await createUser({ nome, email, password });
      if (responseApi.id) {
        navigate('/login');
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

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="signup-title">Cadastre-se</p>
        
        <input className="signup-input" type="text" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
        <input className="signup-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="signup-input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
        
        <button className="signup-btn" type="submit">Cadastrar-se</button>
        <button className="signup-btn back-button" type="button" onClick={(e) => { e.preventDefault(); handleBackClick(); }}>Voltar</button>
      </form>
    </div>
  );
}
