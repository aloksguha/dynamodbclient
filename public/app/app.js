var App = angular.module('app',[
    'ui.router',
    'app.directives.tableListDirective',
    'app.directives.tableContentDirective'
]);

App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/")
    $stateProvider
    .state('/', {
        url: "/",
        templateUrl: "app/templates/home.html",
        controller:"homeCtrl"
    })
}]);