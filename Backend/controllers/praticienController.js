const Praticien = require('../models/praticien');
const asyncHandler = require('express-async-handler');

// Créer un praticien
exports.createPraticien = asyncHandler(async (req, res, next) => {
  const { nom, prenom, tel, email, rue, code_postal, ville } = req.body;

  const praticien = new Praticien({
    nom,
    prenom,
    tel,
    email,
    rue,
    code_postal,
    ville,
  });

  await praticien.save();

  res.status(201).json({
    message: 'Praticien créé avec succès!',
    praticien: praticien
  });
});

// Obtenir un praticien par ID
exports.getOnePraticien = asyncHandler(async (req, res, next) => {
  const praticien = await Praticien.findOne({ _id: req.params.id })
    .populate('visites');

  if (praticien) {
    res.status(200).json(praticien);
  } else {
    res.status(404).json({
      error: 'Praticien non trouvé'
    });
  }
});

// Mettre à jour un praticien
exports.modifyPraticien = asyncHandler(async (req, res, next) => {
  const { nom, prenom, tel, email, rue, code_postal, ville } = req.body;

  const praticien = new Praticien({
    _id: req.params.id,
    nom,
    prenom,
    tel,
    email,
    rue,
    code_postal,
    ville,
  });

  await Praticien.updateOne({ _id: req.params.id }, praticien);

  res.status(201).json({
    message: 'Praticien mis à jour avec succès!'
  });
});

// Supprimer un praticien
exports.deletePraticien = asyncHandler(async (req, res, next) => {
  await Praticien.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: 'Praticien supprimé avec succès!'
  });
});

// Obtenir tous les praticiens
exports.getAllPraticiens = asyncHandler(async (req, res, next) => {
  const praticiens = await Praticien.find()
    .populate('visites');

  res.status(200).json(praticiens);
});
