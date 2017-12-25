var myApp = angular.module('myApp',[]);

//Définition d'un controleur pour le module myApp
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
  console.log("Coucou du controleur !");

  var rafraichir = function(){
    //action lorsque requete get /contactlist
    $http.get('/contactlist').then(function(response){
      console.log("J'ai reçu les données que j'ai demandées");
      $scope.listeContacts = response.data;
      $scope.contact = null;
    });
  };

  rafraichir(); // la fonction sera appelé lors du démmarage de l'app

  //fonction pour ajouter un contact à la base de données
  $scope.ajouterContact = function(){
    console.log($scope.contact); //contact à ajouter à la bd
    $http.post('/contactlist', $scope.contact).then(function(response){
      console.log(response.data); //contact ajouté à la bd
      rafraichir();
    });
  };

  //fonction pour supprimer un contact de la bd
  $scope.supprimerContact = function(id){
    console.log(id);
    $http.delete('/contactlist/'+id).then(function(response){
        rafraichir();
    });
  };

  //fonction pour supprimer un contact de la bd
  $scope.chercherContact = function(id){
    console.log(id);
    $http.get('/contactlist/'+id).then(function(response){
        $scope.contact = response.data;
    });
  };

}]);
