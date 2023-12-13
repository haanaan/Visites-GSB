const express = require('express');
const mongoose = require('mongoose');

const motifRoutes = require('./routes/motif');
const visiteRoutes = require('./routes/visite');
const visiteurRoutes = require('./routes/visiteur');
const praticienRoutes = require('./routes/praticien');

const app = express();

mongoose.connect('mongodb+srv://hananashrafi:hYbMQ9kpWY6awNiw@cluster0.vgdnvyp.mongodb.net/gsb-visites?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/motif', motifRoutes);
app.use('/api/visite', visiteRoutes);
app.use('/api/visiteur', visiteurRoutes);
app.use('/api/praticien', praticienRoutes);

module.exports = app;