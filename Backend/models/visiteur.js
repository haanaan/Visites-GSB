const mongoose = require('mongoose');

const visiteurSchema = mongoose.Schema({
  nom: { type: String, required: false },
  prenom: { type: String, required: false },
  tel: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date_embauche: { type: Date, required: false },
  visites: { type: mongoose.Schema.Types.ObjectId, ref: 'Visiteur', required: false },
});

module.exports = mongoose.model('Visiteur', visiteurSchema);