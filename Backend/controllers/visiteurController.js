const Visiteur = require('../models/visiteur');
const asyncHandler = require('express-async-handler');

// Créer un visiteur
exports.createVisiteur = asyncHandler(async (req, res, next) => {
  const { nom, prenom, tel, email, date_embauche } = req.body;

  const visiteur = new Visiteur({
    nom,
    prenom,
    tel,
    email,
    date_embauche,
  });

  await visiteur.save();

  res.status(201).json({
    message: 'Visiteur créé avec succès!',
    visiteur: visiteur
  });
});

// Obtenir un visiteur par ID
exports.getOneVisiteur = asyncHandler(async (req, res, next) => {
  const visiteur = await Visiteur.findOne({ _id: req.params.id })
    .populate('visites');

  if (visiteur) {
    res.status(200).json(visiteur);
  } else {
    res.status(404).json({
      error: 'Visiteur non trouvé'
    });
  }
});

// Mettre à jour un visiteur
exports.modifyVisiteur = asyncHandler(async (req, res, next) => {
  const { nom, prenom, tel, email, date_embauche } = req.body;

  const visiteur = new Visiteur({
    _id: req.params.id,
    nom,
    prenom,
    tel,
    email,
    date_embauche,
  });

  await Visiteur.updateOne({ _id: req.params.id }, visiteur);

  res.status(201).json({
    message: 'Visiteur mis à jour avec succès!'
  });
});

// Supprimer un visiteur
exports.deleteVisiteur = asyncHandler(async (req, res, next) => {
  await Visiteur.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: 'Visiteur supprimé avec succès!'
  });
});

// Obtenir tous les visiteurs
exports.getAllVisiteurs = asyncHandler(async (req, res, next) => {
  const visiteurs = await Visiteur.find()
    .populate('visites');

  res.status(200).json(visiteurs);
});
