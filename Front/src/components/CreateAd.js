import React, { useState } from "react";
import axios from "axios";

const CreateAd = () => {
  const [adData, setAdData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    setAdData({ ...adData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté pour créer une annonce !");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/ads", adData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Annonce créée avec succès !");
      setAdData({
        title: "",
        description: "",
        category: "",
        price: "",
      });
    } catch (error) {
      alert("Erreur lors de la création de l'annonce.");
    }
  };

  return (
    <div className="container">
      <h1>Créer une annonce</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={adData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={adData.description}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={adData.category}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="Immobilier">Immobilier</option>
          <option value="Véhicules">Véhicules</option>
          <option value="Électronique">Électronique</option>
          <option value="Maison et Mobilier">Maison et Mobilier</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={adData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Créer l'annonce</button>
      </form>
    </div>
  );
};

export default CreateAd;
