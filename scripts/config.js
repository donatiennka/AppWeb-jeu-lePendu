/*********************************************************************************
 * 
 * Ce fichier contient toutes les constantes nécessaires au fonctionnement du jeu.
 * En particulier les listes de mots et de phrases proposés à l'utilisateur
 * 
 *********************************************************************************/

// Nombre de coups par partie
const nbCoups = 1

//les autres variables
let motTrouver 
let motADeviner 
let coupRestant = 1
let nbMotsProposes 
let score 
let gains 
let deja = ""

// On se donne trois minutes pour déviner le mot proposé
const departMinutes = 60

// Variable pour le stockage de l'Id de setInterval
let myTimerId

// Déclaration de la liste contenant les mots proposés à l'utilisateur
const listeMots = [
"BONJOUR", "VOYAGE", "BIC", "SOURIS", "CHAISE", 
"LISTES", "BALLONS", "LOI", "JUSTICE", "POLICE",
 "MAISON", "WAGONS", "TRAIN", "PLUIES", "NEIGE",
  "ACAJOU", "ANANAS", "ELEVE", "ECOLIERE",
 "BANANE", "TABLE", "LAMPE", "VOITURE", "SIX", 
 "LE", "VIE", "VELO", "PORTE", "ROUTE", 
 "VERRE", "DE", "TARO", "BLE", "THE", "TE", "GARE",
  "BUS", "AVION", "ARME", "PATATE",
 "FRUITS", "SOL", "SOLIDE", "EAU", "GLACE", "CAHIER",
  "JUS", "BIERE", "SUCRE", "UN",
 "ON", "NOUS", "TETE", "COU", "MAIN", "VENTRE", "ANGE",
  "RENE", "KAKI", "BLANCHE",
 "ROUGE", "BLEU", "BETES", "BAR", "BOUE", "CLAVIER",
  "ECRAN", "SOINS", "CLE", "TISSUS", "TAXI", "VIN",
  "PRISE", "POUTRE", "DISQUE", "CACAO", "FEVES",
  "NOTE", "BLOC", "SALLE", "AGENDA", "POMME", 
  "CARREAU", "BILLET", "BANQUE", "PAPIER", "SAC",
"PAGES", "MIROIR", "KIWI", "ZOO", "LION", "STADE",
"LIT", "TAPIS", "ALIMENT", "CIEL", "NUAGE", "PIERRE",
"JOUR", "NUIT", "SABLE", "GRAVIER", "PEINTURE", "LIVRE",
"BIBLE", "MOT", "LETTRE", "BEBE", "FEMMES", "HOMMES", "SOLEIL"
]

// Déclaration de la liste contenant les indices des mots proposés à l'utilisateur
const listeDesIndices = [
    "L'aurore", "Tourisme", "Fourniture scolaire", "Matériel informatique", "Le mobilier", 
    "Suite de choses", "Objet de forme sphérique", "Règle, obligations", "Ce que je mérite", 
    "Sentiment de sécurité", "A l'abri", "Véhicule très lourd", "Locomotive", "Météorologie", 
    "Météorologie", "Arbre d'Afrique et d'Amérique", "Faux-fruit comestible à la peau épaisse", 
    "Contraire de précepteur", "L'école maternelle", "Sacoche portée sur le ventre", "Le mobilier", 
    "Le jour est tombé", "Mode de transport", "Sex", "Déterminant", "De la naissance à la mort", 
    "Véhicule de tous les âges", "Dans un mur", "... le développement suit", "C'est transparent", 
    "J'ai six faces", "Cartes", "Boulangerie", "Boisson", "Pronom personnel", "Chemin de fer",
    "Transport de masse", "J'imite l'oiseau", "Pour me défendre", "Comme la pomme de terre",
    "C'est bon pour la santé", "Surface", "Comme un rock", "C'est vital", "Base température", 
    "Fourniture scolaire", "Rafraîchissant", "Suite à la fermentation", "Extrait de la betterave", 
    "Unique", "Nous", "On", "Du corps", "Du corps", "Du corps", "Du corps", "... gardien",
    "... Descartes", "Figuier des jardin, couleur", "Couleur", "Couleur", "Le ciel est ...", "Jungle", 
    "Boissons alcolisées", "Eau et terre", "Matériel informatique", "Matériel informatique", 
    "En bon état", "Porte", "Coton", "Uber", "Raisin", "Port de données", "... dans ton oeil, la paille...", 
    "Matériel informatique", "Chocolat", "Graines", "Inscrire une marque", "Assemblage de diverses choses", 
    "Classe", "Emploi du temps", "Fruit rond", "Habillage du sol", "Ticket de concert", "Crédit", 
    "Fourniture de bureau", "Contenant portable", "Feuilles", "Reflet", "Surnom des Néo-Zélandais", "Parc",
    "Indomptable", "Sport", "Le mobilier", "Produit de Syrie", "Il sert à entretinir la vie", "Terre", 
    "Amas d'eau en suspension", "Cailloux", "Le soleil se lève", "La lune est visible", "Des fleuves et des mers", 
    "la pierre", "Sur les murs", "Bibliothèque", "Réligion", "Phrase", "Alphabet", "Un adulte", 
    "Venus", "Adam", "Que la lumière soit"
]

// Liste des lettres de l'alphabet
const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 
    'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 
    'V', 'W', 'X', 'Y', 'Z'
]