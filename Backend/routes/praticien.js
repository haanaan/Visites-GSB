const express = require('express');
const router = express.Router();

const praticienController = require('../controllers/praticienController');

router.get('/', praticienController.getAllPraticiens);
router.post('/', praticienController.createPraticien);
router.get('/:id', praticienController.getOnePraticien);
router.put('/:id', praticienController.modifyPraticien);
router.delete('/:id', praticienController.deletePraticien);

module.exports = router;
