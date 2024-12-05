import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Gère la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Déconnecté avec succès !");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Le Bon Coin</div>
      <ul className="navbar-links">
        <li><Link to="/ads">Annonces</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/manage-users">Gérer Utilisateurs</Link></li>
            <li><Link to="/manage-ads">Gérer Annonces</Link></li>
            <li><Link to="/create-ad">Créer une annonce</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
