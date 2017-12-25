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

  rafraichir();

  //fonction pour ajouter un contact à la base de données
  $scope.ajouterContact = function(){
    console.log($scope.contact); //contact à ajouter à la bd
    $http.post('/contactlist', $scope.contact).then(function(response){
      console.log(response.data); //contact ajouté à la bd
      rafraichir();
  });
};

/*
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
    // la variable scope est un peu comme les viewData. c'est le lien entre la controleur et la vue
    $scope.listeContacts = listeContacts;
*/


}]);
