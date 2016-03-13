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
    'ngCookies',
    'angularMoment'
  ])
  .config(function($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/homepage.html',
        controller: 'HomepageCtrl',
        controllerAs: 'home'
      })
      .when('/tos', {
        templateUrl: 'views/tos.html',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
      })
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
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');
     $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('blue');
  });