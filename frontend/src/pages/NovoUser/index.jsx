import { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { getUserById, createUser, updateAdmin, deleteAdmin } from '../../api/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NovoUser() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleBackClick = () => {
    navigate('/fatos');
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    if (nome && email && password) {
      try {
        setIsLoading(true);
        const response = await createUser({ nome, email, password });
        toast.success('Usuário cadastrado com sucesso!');
        setNome('');
        setEmail('');
        setPassword('');
      } catch (error) {
        toast.error('Erro ao cadastrar usuário');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Preencha todos os campos para cadastrar o usuário.');
    }
  };

  const handleAlterClick = async () => {
    if (!userId) {
      toast.error('Nenhum usuário selecionado para alteração.');
      return;
    }

    if (nome && email) {

      try {
        console.log(userId, { nome, email })
        setIsLoading(true);
        const update = await updateAdmin(userId, { nome, email });
        toast.success('Usuário atualizado com sucesso!');
        setUserData(update);
        setNome(update.nome);
        setEmail(update.email);
      } catch (error) {
        toast.error('Erro ao atualizar usuário.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Preencha os campos obrigatórios para atualizar o usuário.');
    }
  };

  const handleSearchClick = async () => {
    const userId = prompt('Por favor, insira o ID do usuário que deseja buscar:');
    if (userId) {
      setIsLoading(true);
      try {
        const response = await getUserById(userId);
        if (response && response.users) {
          const user = response.users;
          setUserData(user);
          setNome(user.nome || '');
          setEmail(user.email || '');
          setPassword(user.password || '');
          setUserId(userId);
          setIsPasswordDisabled(true);
        } else {
          toast.error('Usuário não encontrado');
        }
      } catch (error) {
        toast.error('Erro ao buscar usuário');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteClick = async () => {
    const userIdToDelete = prompt('Por favor, insira o ID do usuário que deseja excluir:');
    if (userIdToDelete) {
      setIsLoading(true);
      try {
        await deleteAdmin(userIdToDelete);
        toast.success('Usuário excluído com sucesso!');
        setNome('');
        setEmail('');
        setPassword('');
        setUserData(null);
        setUserId(null);
      } catch (error) {
        toast.error('Erro ao excluir usuário');
        console.error('Erro ao excluir usuário:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Por favor, forneça um ID válido para excluir um usuário.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form">
        <p className="signup-title">Cadastrar Admin</p>

        <input
          className="signup-input"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          className="signup-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="signup-input"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          disabled={isPasswordDisabled}
        />

        <div className="signup-btn-container">
          <div className="btn-row">
            <button className="signup-btn" type="button" onClick={handleRegisterClick}>
              Cadastrar
            </button>
            <button className="signup-btn" type="button" onClick={handleSearchClick}>
              Buscar
            </button>
          </div>
          <div className="btn-row">
            <button className="signup-btn" type="button" onClick={handleAlterClick}>
              Alterar
            </button>
            <button className="signup-btn" type="button" onClick={handleDeleteClick}>
              Excluir
            </button>
          </div>
          <button className="signup-btn back-btn" type="button" onClick={handleBackClick}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}