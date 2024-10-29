import { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { verificaCode } from '../../api/user';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };
  const [code, setCode] = useState(''); 
  const [numeroCelular, setNumeroCelular] = useState('');
  const [codigoArea, setCodigoArea] = useState('47'); 

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
          
      // Formatar o número celular para enviar ao backend
      const formattedNumber = `+55${codigoArea}9${numeroCelular}`;

      const responseApi = await verificaCode({numeroCelular: formattedNumber,code});
      if (responseApi=='1') {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (error.status === 403) {
        return toast("Sem permissão.");
      }
      if (error.status === 401 || error.status === 404) {
        return toast('Codigo incorreto');
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
    <div className="valid-code-container">
      <form className="valid-form" onSubmit={handleSubmit}>
        <h2>Autenticação</h2> 
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
          <label htmlFor="number">CODIGO:</label>
          <input type="number" id="codigo" required value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <button className="button" type="submit">Continuar</button>
        <button className="button back-button" onClick={handleBackClick}>
          Voltar
        </button>
      </form>
    </div>
  );
}
