import { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const Botao = (event) => {
    event.preventDefault();
    navigate('/piadas');
  };

  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createUser({nome, email, senha})
    console.log(response)
    
    if(response.id){
      navigate('/login')
    }
  }
  return (
    <main>
      <div className="register-container">
        <form className="register-form" onSubmit={Botao}>
          <p className="register-title">Cadastro de Usuário</p>

          <input className="register-input" type="text" placeholder="Nome Completo" required />
          <input className="register-input" type="date" placeholder="Idade" required />
          <input className="register-input" type="email" placeholder="Email" required />
          <input className="register-input" type="password" placeholder="Senha" required />
          <input className="register-input" type="password" placeholder="Confirmar Senha" required />

          <button className="register-btn">Cadastrar</button>
          <p className="register-signin">Possui uma conta? <a href="/login" className="register-link">Clique aqui</a></p>
        </form>
      </div>
    </main>
  );
}
