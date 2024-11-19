import { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { getUserById, createUser, updateUser, deleteUser } from '../../api/user'; // Agora estamos importando deleteUser
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
  const [userId, setUserId] = useState(null); // Armazena o ID do usuário para alterações e exclusões

  const handleBackClick = () => {
    navigate('/');
  };

  // Função para cadastrar um novo usuário
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
    const userId = prompt('Por favor, insira o ID do usuário que deseja alterar:');
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
          setUserId(userId); // Armazena o ID do usuário para futuras atualizações
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error('Nenhum usuário selecionado para alteração.');
      return;
    }

    if (nome && email && password) {
      try {
        setIsLoading(true);

        // Chama a API para atualizar o usuário
        const updatedUser = await updateUser(userId, { nome, email, password });

        toast.success('Usuário atualizado com sucesso!');
        setUserData(updatedUser); // Atualiza os dados do usuário na interface
        setNome('');
        setEmail('');
        setPassword('');
      } catch (error) {
        toast.error('Erro ao atualizar usuário');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Preencha todos os campos para atualizar o usuário.');
    }
  };

  // Função para excluir um usuário
  const handleDeleteClick = async () => {
    const userIdToDelete = prompt('Por favor, insira o ID do usuário que deseja excluir:');
    if (userIdToDelete) {
      setIsLoading(true);
      try {
        // Chama a função deleteUser passando o ID do usuário
        await deleteUser(userIdToDelete);

        toast.success('Usuário excluído com sucesso!');
        // Limpar os campos e redirecionar ou dar algum outro feedback
        setNome('');
        setEmail('');
        setPassword('');
        setUserData(null);
        setUserId(null);
      } catch (error) {
        toast.error('Erro ao excluir usuário');
        console.error('Erro ao excluir usuário:', error); // Log para identificar o erro
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Por favor, forneça um ID válido para excluir um usuário.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="signup-title">Cadastrar ou Alterar Cadastro</p>

        <button
          className="signup-btn"
          type="button"
          onClick={handleRegisterClick}
        >
          Cadastrar Usuário
        </button>

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
          disabled={isPasswordDisabled} // Desabilita o campo senha após carregar os dados
        />

        <button className="signup-btn" type="submit">
          Salvar Alterações
        </button>

        <button
          className="signup-btn alter-button"
          type="button"
          onClick={handleAlterClick}
        >
          Buscar Usuário
        </button>

        {/* Botão para excluir usuário */}
        <button
          className="signup-btn delete-button"
          type="button"
          onClick={handleDeleteClick}
        >
          Excluir Usuário
        </button>

        <button
          className="signup-btn back-button"
          type="button"
          onClick={(e) => { e.preventDefault(); handleBackClick(); }}
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
