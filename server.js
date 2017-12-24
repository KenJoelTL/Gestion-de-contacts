/*
* Auteur : Joel Lutumba
* Date de créaton : 23 décembre 2017
* But : configuration de node.js comme serveur web de l'application
* Remarque : ce fichier n'est pas obligatoire par exemple,
*            si on utilise un serveur comme apache
*/

//configuration de node.js comme serveur web
//express est un framework pour le back end.
var express = require('express');
var app = express();


//express.static donne l'ordre au serveur d'aller chercher les fichiers(html,css,js)
app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function(request, response){
  console.log("J'ai recu une request GET");
  personne1 = {
    nom : "Joel",
    courriel : "joel@mail.com",
    numero : "514-321-3214"
    };

    personne2 = {
        nom : "Caroline",
        courriel : "caroline@mail.com",
        numero : "514-321-3214"
    };

    personne3 = {
        nom : "Charles",
        courriel : "charles@mail.com",
        numero : "514-789-3564"
    };
    var listeContacts = [personne1, personne2, personne3];
    response.json(listeContacts); //revoie au controleur la réponse Json
});

app.listen(3000);

//-- localhost://3000
console.log("Le serveur écoute le port 3000");
