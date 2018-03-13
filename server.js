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

var mysql = require('mysql');
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gestion_contacts"
});

db.connect(function(err) {
    if (err) {
        console.log("Erreur de connexion\n" + err);
    } else {
        console.log("Connexion à la base de données établie");
    }
});
var bodyParser = require('body-parser');

//express.static donne l'ordre au serveur d'aller chercher les fichiers(html,css,js)
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(request, response) {

    var sql = "SELECT * FROM contacts";
    db.query(sql, function(err, rows, fields) {
        //renvoie la réponse Json au controleur qui réagit à la request get /contactlist
        if (err) {
            console.log(err);
        }
        response.json(rows);
    });
});

app.post('/contactlist', function(request, response) {
    /*console.log("Ajout du contact :\n");
    console.log(request.body);*/
    var sql = "INSERT INTO contacts SET ?";
    // request.body parse the body to json
    delete request.body._id; //pour empêcher la duplication de clé primaire
    db.query(sql, request.body, function(err, rows) {
        if (err) {
            console.log(err);
        }
        response.json(rows); //row renvoie le résultat de la requête pour mysql
    });
});

app.delete('/contactlist/:id', function(request, response) {
    var id = request.params.id;
    var sql = "DELETE FROM contacts WHERE _id = ?";

    db.query(sql, id, function(err, rows) {
        response.json(rows);
    });
});

app.get('/contactlist/:id', function(request, response) {
    var id = request.params.id;
    var sql = "SELECT * FROM contacts WHERE _id = ?";
    db.query(sql, [id], function(err, rows) {
        response.json(rows[0]);
    });
});

app.put('/contactlist/:id', function(request, response) {
    var id = request.params.id;
    var sql = "UPDATE contacts SET ? WHERE _id = ?";
    var contact = {
        nom: request.body.nom,
        courriel: request.body.courriel,
        numero: request.body.numero
    };
    //delete request.body._id;
    db.query(sql, [contact, id], function(err, rows) {
        response.json(rows);
    });
});


//-- localhost://3000
app.listen(3000);
console.log("\nLe serveur écoute le port 3000");
