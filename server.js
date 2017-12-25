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
var bodyParser = require('body-parser');

//express.static donne l'ordre au serveur d'aller chercher les fichiers(html,css,js)
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(request, response){
  console.log("J'ai recu une request GET");

  db.contacts.find(function(err, docs){
      console.log(docs);
      //renvoie la réponse Json au controleur qui réagit à la request get /contactlist
      response.json(docs);
  });
});

app.post('/contactlist', function(request, response){
  console.log("J'ai recu une request POST");
  console.log(request.body);

  // request.body parse the body to json
  db.contacts.insert(request.body, function(err, doc){
      response.json(doc); //renvoie l'objet ajouté à la bd
  });
});

//-- localhost://3000
app.listen(3000);
console.log("Le serveur écoute le port 3000");
