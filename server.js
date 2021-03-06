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

  db.contacts.find(function(err, docs){
      //renvoie la réponse Json au controleur qui réagit à la request get /contactlist
      response.json(docs);
  });
});

app.post('/contactlist', function(request, response){
  console.log(request.body);

  // request.body parse the body to json
  db.contacts.insert(request.body, function(err, doc){
      response.json(doc); //renvoie l'objet ajouté à la bd
  });
});

app.delete('/contactlist/:id', function(request, response){
  var id = request.params.id;
  db.contacts.remove({_id : mongojs.ObjectId(id)}, function(err,doc){
      response.json(doc);
  });
});

app.get('/contactlist/:id', function(request, response){
  var id = request.params.id;
  db.contacts.findOne({_id : mongojs.ObjectId(id)}, function(err,doc){
      response.json(doc);
  });
});

app.put('/contactlist/:id', function(request, response){
  var id = request.params.id;
  db.contacts.findAndModify({query : {_id : mongojs.ObjectId(id)},
      update:{$set: {nom : request.body.nom, courriel :  request.body.courriel, numero : request.body.numero}},
      new: true}, function(err,doc){
        response.json(doc);
  });

});


//-- localhost://3000
app.listen(3000);
console.log("Le serveur écoute le port 3000");
