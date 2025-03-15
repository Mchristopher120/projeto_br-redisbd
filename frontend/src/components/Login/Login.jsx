import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(username, email, password, age);

    alert(`Usuário cadastrado com sucesso!\nNome: ${username}\nEmail: ${email}\nIdade: ${age}`);

    // Redireciona para a página do CRUD após o cadastro
    navigate("/crud");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="number"
            placeholder="Idade"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="recall-forget">
          <Link to="/crud">Consultar Usuários</Link>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Login;
