const Visite = require('../models/visite');
const asyncHandler = require('express-async-handler');

// Créer une visite
exports.createVisite = asyncHandler(async (req, res, next) => {
  const { date_visite, commentaire, visiteur, praticien, motif } = req.body;

  const visite = new Visite({
    date_visite,
    commentaire,
    visiteur,
    praticien,
    motif,
  });

  await visite.save();

  res.status(201).json({
    message: 'Visite créée avec succès!',
    visite: visite
  });
});

// Obtenir une visite par ID
exports.getOneVisite = asyncHandler(async (req, res, next) => {
  const visite = await Visite.findOne({ _id: req.params.id })
    .populate('visiteur')
    .populate('praticien');

  if (visite) {
    res.status(200).json(visite);
  } else {
    res.status(404).json({
      error: 'Visite non trouvée'
    });
  }
});

// Mettre à jour une visite
exports.modifyVisite = asyncHandler(async (req, res, next) => {
  const { date_visite, commentaire, visiteur, praticien, motif } = req.body;

  const visite = new Visite({
    _id: req.params.id,
    date_visite,
    commentaire,
    visiteur,
    praticien,
    motif,
  });

  await Visite.updateOne({ _id: req.params.id }, visite);

  res.status(201).json({
    message: 'Visite mise à jour avec succès!'
  });
});

// Supprimer une visite
exports.deleteVisite = asyncHandler(async (req, res, next) => {
  await Visite.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: 'Visite supprimée avec succès!'
  });
});

// Obtenir toutes les visites
exports.getAllVisites = asyncHandler(async (req, res, next) => {
  const visites = await Visite.find()
    .populate('visiteur')
    .populate('praticien');

  res.status(200).json(visites);
});
