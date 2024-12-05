import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/ManageStyles.css";


const ManageAds = () => {
  const [ads, setAds] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", category: "", price: "" });
  const [editMode, setEditMode] = useState(false); // Gérer le mode édition
  const [editAdId, setEditAdId] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/api/ads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAds(response.data);
      } catch (error) {
        alert("Erreur lors du chargement des annonces.");
      }
    };
    fetchAds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      if (editMode) {
        // Mettre à jour une annonce
        await axios.put(`http://localhost:8080/api/ads/${editAdId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Annonce mise à jour !");
      } else {
        // Créer une annonce
        await axios.post("http://localhost:8080/api/ads", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Annonce créée !");
      }
      setFormData({ title: "", description: "", category: "", price: "" }); // Réinitialise le formulaire
      setEditMode(false);
      setEditAdId(null);
    } catch (error) {
      alert("Erreur lors de la soumission de l'annonce.");
    }
  };
  

  const handleEdit = (ad) => {
    setFormData({ title: ad.title, description: ad.description, category: ad.category, price: ad.price });
    setEditMode(true);
    setEditAdId(ad._id);
  };

  const handleDelete = async (adId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/ads/${adId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Annonce supprimée !");
      setAds(ads.filter((ad) => ad._id !== adId));
    } catch (error) {
      alert("Erreur lors de la suppression de l'annonce.");
    }
  };

  return (
    <div className="container">
      <h1>Gérer les annonces</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Catégorie</option>
          <option value="Immobilier">Immobilier</option>
          <option value="Véhicules">Véhicules</option>
          <option value="Électronique">Électronique</option>
          <option value="Maison et Mobilier">Maison et Mobilier</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <button type="submit">{editMode ? "Mettre à jour" : "Créer"}</button>
      </form>
      <h2>Liste des annonces</h2>
      <ul>
        {ads.map((ad) => (
          <li key={ad._id}>
            {ad.title} - {ad.category} - {ad.price} €
            <button onClick={() => handleEdit(ad)}>Modifier</button>
            <button onClick={() => handleDelete(ad._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAds;
