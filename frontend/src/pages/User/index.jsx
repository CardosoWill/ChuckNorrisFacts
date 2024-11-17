import { useEffect, useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser, getContext, udateUser } from '../../api/user';

export default function Profile() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [updNome, setUpdNome] = useState('');
  const [updEmail, setUpdEmail] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  async function carregarPerfil() {
    try {
      const response = await getContext()
      if(response.id) {
        setId(response.id)
        setNome(response.nome)
        setEmail(response.email)
      }
    } catch (error) {
      toast('Erro inesperado, tente novamente mais tarde!')
    }
  }

  const handleSaveUpdate = async () => {
    try {
      // deverá alterar o usuário
      const response = await udateUser(id, {nome: updNome, email: updEmail});
      if(response.id){
        // se der certo redireciona
        setNome(updNome)
        setEmail(updEmail)
        setIsUpdate(false)
      }
    } catch (error) {
      toast('Erro inesperado, tente novamente mais tarde!')
    }
  }

  const handleClickUpdate = () => {
    setIsUpdate(true)
    setUpdNome(nome)
    setUpdEmail(email)
  }

  const handleClickDelete = async () => {
    try {
      const response = prompt("Para confirmar exclusão digite seu email:")

      if(response === email) {      
        // Devera deletar usuario
        const response = await deleteUser(id)
        if(response){
          // se der certo redireciona
          toast("Usuário destruido")
          navigate('/')
        }
      } else {
        toast("Nome Inválido, processo cancelado.")
      }
    } catch (error) {
      toast('Erro inesperado, tente novamente mais tarde!')
    }
  }

  useEffect(() => {
    // Carregar dados do usuário ao abrir a página
    async function getConteudo() {
        carregarPerfil()
    }
    // Executar o carregamento ao abrir a página
    getConteudo()
  }, [])

  return (
    // Layout do componente Profile com os dados do usuário e botões de ação.
    <div className='profile'>
      <div className='info'>
        <h1>Dados do seu perfil</h1>
        <p>Nome: {!isUpdate ? nome: <input type='text' id="nome" value={updNome} onChange={(e) => setUpdNome(e.target.value)}/>} </p>
        <p>Email: {!isUpdate ? email : <input type='email' id="email" value={updEmail} onChange={(e) => setUpdEmail(e.target.value)}/>} </p>
        {
        !isUpdate ? 
          <div className='actions'>
            <button
              onClick={handleClickDelete}
            >Excluir Conta</button>
            <button
              className='primary'
              onClick={handleClickUpdate}
            >Alterar Dados</button>
          </div>
        : <div className='actions'>
            <button
              onClick={() => setIsUpdate(false)}
            >Cancelar</button>
            <button
              className='primary'
              onClick={handleSaveUpdate}
            >Salvar</button>
          </div>
        }
      </div>
    </div>
  )
}
