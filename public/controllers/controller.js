var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
  console.log("Coucou du controleur !");
  $http.get('/contactlist').then(function(response){
    console.log("J'ai reçu les données que j'ai demandé");
    $scope.listeContacts = response.data;
  });

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
