#**WCC DEV AUTO COMPLETE SEARCH**

###1. Description du projet

**NB: Ce projet nécessite une connexion internet pour pouvoir le mettre en place**

Ce projet est une application de recherche basée sur React, qui utilise l'API de recherche personnalisée de Google et une base de données backend pour stocker et récupérer des suggestions de recherche précédentes.

Voici une description des principales fonctionnalités du projet :

* Barre de recherche : Les utilisateurs peuvent entrer des mots-clés dans la barre de recherche pour effectuer une recherche. À mesure que les utilisateurs saisissent leur recherche, des suggestions basées sur les recherches précédentes sont affichées.

* Suggestions de recherche précédentes : Les suggestions de recherche précédentes sont récupérées à partir d'une base de données backend et filtrées en fonction de la similarité avec la recherche en cours à l'aide de l'algorithme de distance de Levenshtein. Les suggestions sont affichées sous la barre de recherche et peuvent être sélectionnées pour effectuer une recherche.

* Recherche avec images : Lorsqu'une recherche est effectuée, l'application envoie une requête à l'API de recherche personnalisée de Google pour obtenir les résultats de recherche. Pour chaque résultat, une requête supplémentaire est effectuée pour obtenir une image correspondant au résultat de recherche. Les résultats de recherche avec leurs images correspondantes sont affichés.

* Gestion des suggestions : Les suggestions de recherche peuvent être supprimées en cliquant sur une icône de suppression associée à chaque suggestion. La suggestion est supprimée de la base de données backend et de l'état de l'application, et la liste des suggestions est mise à jour.

* Ce projet est une application web devéloppé en PERN (Postgresql Express React Node)

###2. Comment installer et exécuter le projet

* Premièrement, il faut installer le serveur de postgresql pour stocker les données dans une base de données.
Voici le lien pour le télécharger.
`https://www.postgresql.org/download/`

* Deuxièmement, il faut aussi installer nodejs sur votre pc.
Voici le lien pour le télécharger
`https://nodejs.org/fr/download`

* Troisièmement, on doit configurer le fichier server.js qui est dans le répertoire /backend/
Il faut changer quelques informations dans la partie configuration de la base de donnée comme:
> user (nom d'utilisateur dans postgresql)
> host (le serveur de la base de données)
> database (le nom de la base de données)
> password (le mot de passe de postgresql)
> port (le port que postgresql utilise par défaut c'est 5432)

*Quatrièmement, après la configuration précédente il faut mettre en place la base de donné, le script est déjà 
écrit dans le fichier script.sql et il faut l'exécuter dans le terminal de postgresql

* Cinquièmement, il faut ouvrir un terminal est faire un cd vers le dossier backend(ouvrir le dossier backend dans un terminal)
Par exemple
`cd backend/`
Après il faut lancer entrer ces lignes de commande:
`npm install`
C'est pour installer les dépendances nécessaire
Puis 
`npm start`
C'est pour lancer le serveur de node et express

* Sixièmement, ouvrir un autre terminal et faire un cd vers le dossier frontend (ouvrir le dossier frontend dans un autre terminal)
Par exemple
`cd frontend/`
Une fois dans le dossier frontend, il faut entrer quelques lignes de commandes:
`npm install`
C'est pour installer les dépendances nécessaire

Le commande pour lancer notre application:
`npm start`

Par défaut elle est lancée sur: 
`http://localhost:3000/`
Il vaut mieux le laisser comme-ci pour éviter les erreurs
