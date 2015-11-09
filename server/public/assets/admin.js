var messageApp = angular.module('messageApp', []);

messageApp.controller("MessageController", ['$scope', '$http', function($scope, $http){
    $scope.values= {};
    $scope.peopleArray = [];
    $scope.numbers = {};

    $scope.clickButton = function(values){
        console.log($scope.values);

        //Post to the message from the form to the database.
        $http.post('/messages', values).then(function(response){
            console.log("Okay, posted to the database. Check robo");
            $scope.addMessage();
        });
    };

    $scope.deleteButton = function(id){
       console.log(id);

    };

    $scope.addMessage = function() {
        $http.get('/board').then(function(response) {
            $scope.peopleArray = response.data;
            console.log($scope.peopleArray);
        });

    };

    $scope.deleteMessage = function(){
        $http.delete('/delete').then(function(response){

        });
    }
    $scope.addMessage();
}]);
