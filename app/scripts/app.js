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
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/decks/browse', {
        templateUrl: 'views/decks.html',
        controller: 'DecksCtrl',
        controllerAs: 'decks'
      })
      .when('/:deckId', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');

  });