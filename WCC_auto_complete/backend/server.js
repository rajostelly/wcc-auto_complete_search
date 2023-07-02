const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 8080;

// Configuration de body-parser pour parser les données de requête
app.use(bodyParser.json());

// Configuration de cors pour gérer les requêtes CORS
app.use(cors());

// Configuration de la connexion à PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'auto_completion_db',
  password: 'rajo',
  port: 5432, // Port par défaut de PostgreSQL
});

// Exemple d'endpoint pour insérer des données
app.post('/insert-data', (req, res) => {
  const { searchValue } = req.body;

  // Exécutez la requête d'insertion dans la base de données
  const query = 'INSERT INTO search_history (search_value) VALUES ($1)';
  const values = [searchValue];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'insertion des données:', error);
      res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
    } else {
      console.log('Données insérées avec succès');
      res.status(200).json({ message: 'Données insérées avec succès' });
    }
  });
});

// Endpoint pour récupérer les données
app.get('/get-data', (req, res) => {
  // Exécutez la requête pour récupérer les données de la base de données
  const query = 'SELECT * FROM search_history';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    } else {
      const data = results.rows;
      res.status(200).json(data);
    }
  });
});

// Endpoint pour supprimer les données
app.post('/delete-data', (req, res) => {
  const { searchValue } = req.body;

  // Exécutez la requête de suppression dans la base de données
  const query = 'DELETE FROM search_history WHERE search_value = $1';
  const values = [searchValue];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la suppression des données:', error);
      res.status(500).json({ error: 'Erreur lors de la suppression des données' });
    } else {
      console.log('Données supprimées avec succès');
      res.status(200).json({ message: 'Données supprimées avec succès' });
    }
  });
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});