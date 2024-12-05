import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/ManageStyles.css";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        alert("Erreur lors du chargement des utilisateurs.");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/api/users/${editUserId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Utilisateur mis à jour !");
      } else {
        await axios.post("http://localhost:8080/api/auth/register", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Utilisateur créé !");
      }
      setFormData({ username: "", email: "", password: "" });
      setEditMode(false);
      setEditUserId(null);
    } catch (error) {
      alert("Erreur lors de la soumission.");
    }
  };

  const handleEdit = (user) => {
    setFormData({ username: user.username, email: user.email, password: "" });
    setEditMode(true);
    setEditUserId(user._id);
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Utilisateur supprimé !");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      alert("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  return (
    <div className="container">
      <h1>Gérer les utilisateurs</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">{editMode ? "Mettre à jour" : "Créer"}</button>
      </form>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} ({user.email})
            <button onClick={() => handleEdit(user)}>Modifier</button>
            <button onClick={() => handleDelete(user._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
