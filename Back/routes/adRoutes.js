const express = require("express");
const { getAds, createAd, updateAd, deleteAd } = require("../controllers/adController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAds); // Récupérer toutes les annonces
router.post("/", authMiddleware, createAd); // Créer une annonce
router.put("/:id", authMiddleware, updateAd); // Mettre à jour une annonce
router.delete("/:id", authMiddleware, deleteAd); // Supprimer une annonce

module.exports = router;
