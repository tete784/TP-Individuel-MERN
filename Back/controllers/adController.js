const Ad = require("../models/adModel");

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).send(ads);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createAd = async (req, res) => {
    try {
      const { title, description, category, price } = req.body; // Ajout du champ price
  
      const newAd = new Ad({
        title,
        description,
        category,
        price, // Passe la valeur de price ici
        author: req.user.id, 
      });
  
      await newAd.save();
      res.status(201).send(newAd);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedAd) return res.status(404).send("Annonce introuvable.");
    res.status(200).send(updatedAd);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) return res.status(404).send("Annonce introuvable.");
    res.status(200).send("Annonce supprimée.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
