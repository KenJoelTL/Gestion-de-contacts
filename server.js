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

var mongojs = require('mongojs');
var db = mongojs('gestion_contacts',['contacts']);


//express.static donne l'ordre au serveur d'aller chercher les fichiers(html,css,js)
app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function(request, response){
  console.log("J'ai recu une request GET");

  db.contacts.find(function(err, docs){
      console.log(docs);
      //revoie la réponse Json au controleur qui réagit à la request get /contactlist
      response.json(docs);
  });
});

app.listen(3000);

//-- localhost://3000
console.log("Le serveur écoute le port 3000");
