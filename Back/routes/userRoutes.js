const express = require("express");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUsers); // Récupérer tous les utilisateurs
router.post("/", authMiddleware, createUser); // Créer un utilisateur
router.put("/:id", authMiddleware, updateUser); // Mettre à jour un utilisateur
router.delete("/:id", authMiddleware, deleteUser); // Supprimer un utilisateur

module.exports = router;
