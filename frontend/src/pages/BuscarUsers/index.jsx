import { useState, useEffect } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { getUserById, getAllUsers, createUser, updateAdmin, deleteAdmin } from '../../api/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USUARIOS_POR_PAGINA = 5; // Quantidade de usuários por página

export default function NovoUser() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        setIsLoading(true);
        const response = await getAllUsers();
        setUsuarios(response.users || []);
      } catch (error) {
        toast.error('Erro ao carregar usuários');
      } finally {
        setIsLoading(false);
      }
    }
    carregarUsuarios();
  }, []);

  // Função de paginação
  const indiceInicial = (paginaAtual - 1) * USUARIOS_POR_PAGINA;
  const indiceFinal = indiceInicial + USUARIOS_POR_PAGINA;
  const usuariosPagina = usuarios.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(usuarios.length / USUARIOS_POR_PAGINA);

  // Funções de gerenciamento de usuários
  const handleBackClick = () => navigate('/fatos');

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    if (nome && email && password) {
      try {
        setIsLoading(true);
        await createUser({ nome, email, password });
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
        setIsLoading(true);
        await updateAdmin(userId, { nome, email });
        toast.success('Usuário atualizado com sucesso!');
        setNome('');
        setEmail('');
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

  const handleDeleteClick = async (userIdToDelete) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este usuário?');
    if (confirmDelete) {
      try {
        setIsLoading(true);
        await deleteAdmin(userIdToDelete);
        toast.success('Usuário excluído com sucesso!');
        setUsuarios(usuarios.filter(user => user.id !== userIdToDelete));
      } catch (error) {
        toast.error('Erro ao excluir usuário');
        console.error('Erro ao excluir usuário:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="signup-container">
      {/* Tabela de usuários com paginação */}
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPagina.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(paginaAtual - 1)}
          >
            Anterior
          </button>
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual(paginaAtual + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
