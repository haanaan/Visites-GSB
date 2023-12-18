const asyncHandler = require('express-async-handler');
const Motif = require('../models/motif'); // Assurez-vous d'avoir correctement défini votre modèle Motif

exports.createMotif = asyncHandler(async (req, res, next) => {
  const { libelle } = req.body;

  const motif = new Motif({
    libelle,
  });

  await motif.save();

  res.status(201).json({
    message: 'Motif saved successfully!',
    motif_id: motif.id
  });
});

exports.getOneMotif = asyncHandler(async (req, res, next) => {
  const motif = await Motif.findOne({ _id: req.params.id });
  if (motif) {
    res.status(200).json(motif);
  } else {
    res.status(404).json({
      error: 'Motif not found'
    });
  }
});

exports.modifyMotif = asyncHandler(async (req, res, next) => {
  const { libelle } = req.body;

  const motif = new Motif({
    _id: req.params.id,
    libelle,
  });

  await Motif.updateOne({ _id: req.params.id }, motif);

  res.status(201).json({
    message: 'Motif updated successfully!'
  });
});

exports.deleteMotif = asyncHandler(async (req, res, next) => {
  await Motif.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: 'Motif deleted successfully!'
  });
});

exports.getAllMotifs = asyncHandler(async (req, res, next) => {
  const motifs = await Motif.find();
  res.status(200).json(motifs);
});
