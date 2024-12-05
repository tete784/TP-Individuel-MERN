import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/Ads.css";
import FilterBar from "./FilterBar";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/ads");
        setAds(response.data);
        setFilteredAds(response.data); 
      } catch (error) {
        console.error("Erreur lors du chargement des annonces", error);
      }
    };

    fetchAds();
  }, []);

  const handleFilter = (category) => {
    setFilter(category);
    if (category === "") {
      setFilteredAds(ads);
    } else {
      const filtered = ads.filter((ad) => ad.category === category);
      setFilteredAds(filtered);
    }
  };

  return (
    <div className="ads-container">
      <h1>Annonces</h1>
      <FilterBar filter={filter} setFilter={handleFilter} />
      <div className="ads-list">
        {filteredAds.map((ad) => (
          <div className="ad-card" key={ad._id}>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            <p>Catégorie : {ad.category}</p>
            <p>Prix : {ad.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ads;
