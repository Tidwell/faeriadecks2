"use strict";angular.module("faeriadecks2App",["ngRoute","ngMaterial","ngSanitize","ngAnimate","ngResource","ngCookies"]).config(["$routeProvider","$locationProvider","$mdThemingProvider",function(a,b,c){a.when("/deckbuilder",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/decks/browse",{templateUrl:"views/decks.html",controller:"DecksCtrl",controllerAs:"decks"}).when("/:deckId",{templateUrl:"views/deckview.html",controller:"DeckViewCtrl",controllerAs:"deckView"}).when("/deckbuilder/:deckId",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/deckbuilder"}),b.html5Mode(!0).hashPrefix("!"),c.theme("default").primaryPalette("light-blue").accentPalette("blue")}]),angular.module("faeriadecks2App").controller("MainCtrl",["Cards","Deck","$routeParams","$location","$cookies","$mdBottomSheet","$mdSidenav",function(a,b,c,d,e,f,g){function h(a){var b;return j.deck.forEach(function(c){c.id===a&&(b=c)}),b}function i(a){var b;j.deck.forEach(function(c,d){c.id===a&&(b=d)}),j.deck.splice(b,1)}var j=this;j.hasRated=!1,j.cards=a.get(),j.deck=[],j.totalCards=0,j.deckName="",j.deckUrl="",j.colorFilters={human:!0,green:!0,yellow:!0,blue:!0,red:!0},j.typeFilters={creature:!0,event:!0,structure:!0},j.averageStat=function(a,b,c){var d=0,e=0;return j.deck.forEach(function(f){b&&f[b]!==c||(d+=f[a]*f.copies,e+=f.copies)}),isNaN(d)||isNaN(e)||!d||!e?0:Math.floor(d/e*100)/100},j.countStatValue=function(a,b){var c=0;return j.deck.forEach(function(d){b&&d[a]!==b||(c+=d.copies)}),isNaN(c)?0:c},j.highestStat=function(a){var b=0;return j.deck.forEach(function(c){c[a]>b&&(b=c[a])}),isNaN(b)?0:b},j.add=function(a){if(30!==j.totalCards){var b=h(a.id);if(b){if("LEGENDARY"===b.rarity)return;if(3===b.copies)return;return b.copies++,void j.totalCards++}var c={};for(var d in a)c[d]=a[d];c.copies=1,j.deck.push(c),j.totalCards++}},j.remove=function(a){var b=h(a.id);b.copies--,j.totalCards--,0===b.copies&&i(b.id)};var k={HUMAN:1,BLUE:2,GREEN:3,RED:4,YELLOW:5};j.colorOrder=function(a){return k[a]},j.pad=function(a){for(var b=String(a);b.length<3;)b=0+b;return b},c.deckId&&b.get({deckId:c.deckId}).$promise.then(function(a){j.deckName=a.name,j.deckUrl=a.url,j.deck=a.deck,j.deckRating=a.rating.average;var b=0;j.deck.forEach(function(a){b+=a.copies}),j.totalCards=b,e.get(j.deckUrl)&&(j.hasRated=!0)},function(){j.error="Deck could not be found."}),j.save=function(){var a=new b({name:j.deckName,deck:j.deck});a.$save().then(function(a){d.path("/"+a.url)})},j.reset=function(){c.deckId&&d.path("/"),j.deck=[],j.totalCards=0,j.deckName="",j.deckUrl=""},j.submitRating=function(a){j.hasRated=!0,b.rate({rating:a,id:j.deckUrl}).$promise.then(function(){e.put(j.deckUrl,a)})},j.showDeck=function(){g("right").toggle().then(function(){})}}]),angular.module("faeriadecks2App").filter("colorFilter",function(){return function(a,b){var c=[];return a&&b?(a.forEach(function(a){b[a.color.toLowerCase()]&&c.push(a)}),c):c}}),angular.module("faeriadecks2App").filter("typeFilter",function(){return function(a,b){var c=[];return a&&b?(a.forEach(function(a){b[a.type.toLowerCase()]&&c.push(a)}),c):c}}),angular.module("faeriadecks2App").service("Cards",["$http","$sce",function(a,b){var c={};return{get:function(){return c.cards||a.get("/scripts/output.json").then(function(a){var d=a.data;d.forEach(function(a){a.text=a.text.replace(/\{/g,"<strong>"),a.text=a.text.replace(/\}/g,"</strong>"),a.text=a.text.replace(/\_/g," "),a.text=a.text.replace(/\|/g," "),a.text=b.trustAsHtml(a.text)}),c.cards=d}),c},getById:function(a){if(!c.cards)return{};var b;return c.cards.forEach(function(c){c.id===a&&(b=c)}),b}}}]),angular.module("faeriadecks2App").controller("RootCtrl",function(){}),angular.module("faeriadecks2App").service("Deck",["$resource",function(a){var b="",c=a(b+"/api/decks/:deckId",{deckId:"@id",rating:"@rating"},{list:{method:"GET",isArray:!0},topList:{method:"GET",isArray:!0,url:b+"/api/decks/top"},rate:{method:"POST",url:b+"/api/decks/:deckId/rate/:rating"}});return c}]),angular.module("faeriadecks2App").service("Stats",["$resource",function(a){function b(a,b,c,d){"object"==typeof b&&(d=b);var e=0,f=0;return d.forEach(function(d){b&&d[b]!==c||(e+=d[a]*d.copies,f+=d.copies)}),isNaN(e)||isNaN(f)||!e||!f?0:Math.floor(e/f*100)/100}function c(a,b,c){var d=0;return c.forEach(function(c){b&&c[a]!==b||(d+=c.copies)}),isNaN(d)?0:d}function d(a,b){var c=0;return b.forEach(function(b){b[a]>c&&(c=b[a])}),isNaN(c)?0:c}return{averageStat:b,countStatValue:c,highestStat:d}}]),angular.module("faeriadecks2App").controller("DecksCtrl",["Deck","Cards",function(a,b){var c=this;this.recentDecks=a.list(),this.topDecks=a.topList(),this.cards=b.get(),this.getById=function(a){var b;return this.cards&&this.cards.cards?(this.cards.cards.forEach(function(c){c.id===a&&(b=c)}),b):{}},this.getColors=function(a){if(!a||!a.deck)return[];var b=[];return a.deck.forEach(function(a){var d=c.getById(a.id);-1===b.indexOf(d.color)&&b.push(d.color)}),b},this.deckCardCount=function(a){var b=0;return a.deck.forEach(function(a){b+=a.copies}),b}}]),angular.module("faeriadecks2App").directive("starRating",function(){return{restrict:"EA",template:'<ul class="star-rating" ng-class="{readonly: isReadonly}">  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">    <i class="fa fa-star"></i>  </li></ul>',scope:{ratingValue:"=ngModel",max:"=?",onRatingSelect:"&?",isReadonly:"=?"},link:function(a,b,c){function d(){a.stars=[];for(var b=0;b<a.max;b++)a.stars.push({filled:b<a.ratingValue})}a.max||(a.max=5),a.toggle=function(b){if(!a.isReadonly){if(a.ratingValue=b+1,!a.onRatingSelect)return;a.onRatingSelect({rating:b+1})}},a.$watch("ratingValue",function(a,b){d()})}}}),angular.module("faeriadecks2App").controller("DeckViewCtrl",["Cards","Deck","$routeParams","$cookies",function(a,b,c,d){var e=this;e.hasRated=!1,c.deckId&&b.get({deckId:c.deckId}).$promise.then(function(a){e.deck=a,d.get(e.deck.url)&&(e.hasRated=!0)},function(){e.error="Deck could not be found."}),e.cards=a.get(),e.pad=function(a){for(var b=String(a);b.length<3;)b=0+b;return b},e.submitRating=function(a){e.hasRated=!0,b.rate({rating:a,id:e.deck.url}).$promise.then(function(){d.put(e.deck.url,a)})}}]),angular.module("faeriadecks2App").directive("stats",["Stats",function(a){return{templateUrl:"/views/stats.html",restrict:"E",scope:{deck:"="},link:function(b,c,d){b.deck||(b.deck=[]);for(var e in a)!function(c){b[c]=function(){var d=Array.prototype.slice.call(arguments);return d.push(b.deck),a[c].apply(null,d)}}(e)}}}]);