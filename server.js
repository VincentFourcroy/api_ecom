// Chargement des variables d'environnement.
require('dotenv').config();

// Import des modules nécessaires.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import des routes pour l'authentification.
const authRoutes = require('./routes/auth.route');

// Import des routes pour la création des produits.
const productRoutes = require('./routes/product.route');

// Import de la configuration de la BDD.
const connectDB = require('./config/db');

// Import de Cloudinary.
const cloudinary = require('cloudinary').v2;

// Initialisation de l'application Express.
const app = express();

// Middleware pour traiter les requêtes JSON.
app.use(express.json());

// Middleware pour parser les cors de requêtes.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration des options cors.
const corsOptions = {
	origin: '*',
	credentials: true,
	optionsSuccessStatus: 200,
	methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
	preflightContinue: false,
};

// Middleware pour gérer les cors.
app.use(cors(corsOptions));

// Utilisation des routes pour l'authentification.
app.use('/', authRoutes);

// Utilisation des routes pour la création de produits.
app.use('/', productRoutes);

// Configuration de Cloudinary.
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

// Définition du port de démarrage du serveur.
const PORT = process.env.PORT || 5200;

// Fonction pour démarrer le serveur.
const start = async () => {
	try {
		// Connexion à la BDD.
		await connectDB();
		// Démarrage du serveur sur le port spécifié.
		app.listen(PORT, () => console.log(`Le serveur a démarré sur le port ${PORT}.`));
	} catch (error) {
		console.log(error);
	}
};

// Appel de la fonction pour démarrer le serveur.
start();

module.exports = app;
