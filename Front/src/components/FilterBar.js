import React from "react";
import "./../styles/FilterBar.css";

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="filter-bar">
      <button onClick={() => setFilter("")} className={filter === "" ? "active" : ""}>
        Toutes
      </button>
      <button onClick={() => setFilter("Immobilier")} className={filter === "Immobilier" ? "active" : ""}>
        Immobilier
      </button>
      <button onClick={() => setFilter("Véhicules")} className={filter === "Véhicules" ? "active" : ""}>
        Véhicules
      </button>
      <button onClick={() => setFilter("Électronique")} className={filter === "Électronique" ? "active" : ""}>
        Électronique
      </button>
    </div>
  );
};

export default FilterBar;
