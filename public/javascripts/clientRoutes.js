/**
 * Created by talwa_000 on 21/02/15.
 */
var mainApp = angular.module('mainApp', ['ui.router','ngTouch']);

// configure our routes
mainApp.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider

        .state('home', {
            url:'/',
            templateUrl : '/views/home.html'
        })

        .state('completeTheWord', {
            url:'/completeTheWord',
            templateUrl : '/views/completeTheWord.html',
            controller: 'completeTheWordCTR'
        })

        .state('firstLetter', {
            url:'/firstLetter',
            templateUrl : '/views/firstLetter.html',
            controller: 'firstLetterCTR'
        })

        .state('knowTheLetters', {
            url:'/knowTheLetters',
            templateUrl : '/views/knowTheLetters.html',
            controller: 'knowTheLettersCTR'
        })

}]);
