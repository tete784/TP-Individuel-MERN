const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Vérifier si l'en-tête Authorization est présent
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send("Token manquant.");

    // Extraire le token de l'en-tête
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).send("Token manquant.");

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stocker les infos utilisateur dans req.user
    next();
  } catch (err) {
    res.status(403).send("Token invalide.");
  }
};

module.exports = authMiddleware;
