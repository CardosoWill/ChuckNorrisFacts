import './styles.css';

export default function Register() {
  return (
    <main>
      <div className="container">
        <form className="form">
          <p className="title">Cadastro de Usuario</p>

          <div className="flex">
            <input className="input" type="text" placeholder="Nome Completo" required />
          </div>

          <input className="input" type="email" placeholder="Email" required />
          <input className="input" type="senha" placeholder="Senha" required />
          <input className="input" type="senha" placeholder="Confirmar Senha" required />

          <button className="btn">Cadastrar</button>
          <p className="signin">Possui uma conta? <a href="/" className="link">Clique aqui</a></p>
        </form>
      </div>
    </main>
  );
}
