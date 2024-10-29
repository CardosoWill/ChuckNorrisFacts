import { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/user';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/login');
  };

  const [nome, setNome] = useState('');
  const [numeroCelular, setNumeroCelular] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codigoArea, setCodigoArea] = useState('47'); 

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      // Formatar o número celular para enviar ao backend
      const formattedNumber = `+55${codigoArea}9${numeroCelular}`;
      
      const responseApi = await createUser({ nome, numeroCelular: formattedNumber, email, password });
      console.log(responseApi);
      if (responseApi.id) {
        navigate('/verify-code');
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

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    // Limita o número a 8 dígitos
    if (input.length <= 8) {
      setNumeroCelular(input);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Cadastre-se</h2>
        <div className="input-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="numeroCelular">Número Celular:</label>
          <div>
            <select id="codigoArea" value={codigoArea} onChange={(e) => setCodigoArea(e.target.value)}>
              <option value="47">SC</option> {/* Santa Catarina */}
              <option value="11">SP</option> {/* São Paulo */}
              <option value="21">RJ</option> {/* Rio de Janeiro */}
            </select>
            <input
              type="text"
              id="numeroCelular"
              required
              placeholder="Digite o número"
              value={numeroCelular}
              onChange={handlePhoneChange}
              maxLength={8} // Limita a entrada do usuário a 8 dígitos
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="button" type="submit">Cadastrar-se</button>
        <button className="button back-button" onClick={handleBackClick}>
          Voltar
        </button>
      </form>
    </div>
  );
}
