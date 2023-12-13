const express = require('express');
const router = express.Router();

const motifController = require('../controllers/motifController'); // Assurez-vous du chemin correct vers votre contrôleur Motif

router.get('/', motifController.getAllMotifs);
router.post('/', motifController.createMotif);
router.get('/:id', motifController.getOneMotif);
router.put('/:id', motifController.modifyMotif);
router.delete('/:id', motifController.deleteMotif);

module.exports = router;
