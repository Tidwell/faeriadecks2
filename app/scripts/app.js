'use strict';

/**
 * @ngdoc overview
 * @name faeriadecks2App
 * @description
 * # faeriadecks2App
 *
 * Main module of the application.
 */
angular
  .module('faeriadecks2App', [
    'ngRoute',
    'ngMaterial',
    'ngSanitize',
    'ngAnimate',
    'ngResource',
    'ngCookies'
  ])
  .config(function($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider
      .when('/deckbuilder', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/decks/browse', {
        templateUrl: 'views/decks.html',
        controller: 'DecksCtrl',
        controllerAs: 'decks'
      })
      .when('/:deckId', {
        templateUrl: 'views/deckview.html',
        controller: 'DeckViewCtrl',
        controllerAs: 'deckView'
      })
      .when('/deckbuilder/:deckId', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/deckbuilder'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');
     $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('blue');
  });