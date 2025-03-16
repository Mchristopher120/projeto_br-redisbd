import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import "./crud.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", age: "" });

  // Carregar usuários ao iniciar
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleEdit(user)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <h2>Editar Usuário</h2>
          <input
            type="text"
            placeholder="Nome"
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <button type="submit">Atualizar</button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;
