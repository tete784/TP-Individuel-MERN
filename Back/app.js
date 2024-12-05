const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// CORS 
app.use(cors({ origin: "http://localhost:3000" }));

// Connecter à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB :", err);
    process.exit(1);
  });


const authRoutes = require("./routes/authRoutes");
const adRoutes = require("./routes/adRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes); // Routes pour l'authentification
app.use("/api/ads", adRoutes);   // Routes pour les annonces
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
