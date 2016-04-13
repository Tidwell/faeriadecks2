"use strict";angular.module("faeriadecks2App",["ngRoute","ngMaterial","ngSanitize","ngAnimate","ngResource","ngCookies","angularMoment","angularUtils.directives.dirDisqus","angularUtils.directives.dirPagination"]).config(["$routeProvider","$locationProvider","$mdThemingProvider",function(a,b,c){a.when("/",{templateUrl:"views/homepage.html",controller:"HomepageCtrl",controllerAs:"home"}).when("/tos",{templateUrl:"views/tos.html"}).when("/about",{templateUrl:"views/about.html"}).when("/deckbuilder",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/decks/browse",{templateUrl:"views/decks.html",controller:"DecksCtrl",controllerAs:"decks"}).when("/:deckId",{templateUrl:"views/deckview.html",controller:"DeckViewCtrl",controllerAs:"deckView"}).when("/deckbuilder/:deckId",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/decks/by/:steamid",{templateUrl:"views/userdecks.html",controller:"UserdecksCtrl",controllerAs:"userDecks"}).otherwise({redirectTo:"/"}),b.html5Mode(!0).hashPrefix("!"),c.theme("default").primaryPalette("light-blue").accentPalette("blue")}]),angular.module("faeriadecks2App").service("Cards",["$http","$sce",function(a,b){function c(a){return a.deserts+a.mountains+a.islands+a.forests}var d={};return{get:function(){return d.cards||a.get("/scripts/output.json").then(function(a){var e=a.data;e.forEach(function(a){a.text=a.text.replace(/\{/g,"<strong>"),a.text=a.text.replace(/\}/g,"</strong>"),a.text=a.text.replace(/\_/g," "),a.text=a.text.replace(/\|/g," "),a.text=b.trustAsHtml(a.text),a.landCount=c(a)}),d.cards=e}),d},getById:function(a){if(!d.cards)return{};var b;return d.cards.forEach(function(c){c.id===a&&(b=c)}),b}}}]),angular.module("faeriadecks2App").service("Deck",["$resource","APIDomain","Cards",function(a,b,c){function d(a){if(!a||!a.deck)return[];var b=[];return a.deck.forEach(function(a){var d=c.getById(a.id);return d?void(-1===b.indexOf(d.color)&&d.color&&b.push(d.color.toLowerCase())):void console.log("find",a.id)}),b}function e(a){return a.forEach(function(a){a.colors=d(a),a.metaVotes?a.voteScore=a.metaVotes.upvotes-a.metaVotes.downvotes:a.voteScore=0,a.created||(a.created=1456224170810)}),a}var f=a(b+"/api/decks/:deckId",{deckId:"@id",rating:"@rating",steamid:"@steamid"},{list:{method:"GET",isArray:!0,transformResponse:[angular.fromJson,e]},topList:{method:"GET",isArray:!0,url:b+"/api/decks/top",transformResponse:[angular.fromJson,e]},upvote:{method:"POST",url:b+"/api/decks/:deckId/upvote"},downvote:{method:"POST",url:b+"/api/decks/:deckId/downvote"},unvote:{method:"POST",url:b+"/api/decks/:deckId/unvote"},byUser:{method:"GET",isArray:!0,url:b+"/api/decks/by/:steamid",transformResponse:[angular.fromJson,e]}});return f}]),angular.module("faeriadecks2App").service("Stats",["Cards",function(a){function b(b,c,d,e){"object"==typeof c&&(e=c);var f=0,g=0;return e.forEach(function(e){var h=a.getById(e.id);return h?void(c&&h[c]!==d||(f+=h[b]*e.copies,g+=e.copies)):void console.log("find",e.id)}),isNaN(f)||isNaN(g)||!f||!g?0:Math.floor(f/g*100)/100}function c(b,c,d){var e=0;return d.forEach(function(d){var f=a.getById(d.id);return f?void(c&&f[b]!==c||(e+=d.copies)):void console.log("find",d.id)}),isNaN(e)?0:e}function d(b,c){var d=0;return c.forEach(function(c){var e=a.getById(c.id);return e?void(e[b]>d&&(d=e[b])):void console.log("find",c.id)}),isNaN(d)?0:d}return{averageStat:b,countStatValue:c,highestStat:d}}]),angular.module("faeriadecks2App").service("User",["$http","APIDomain",function(a,b){var c=b,d={},e=!1;return{get:function(){return d.user||e||(a.get(c+"/account").then(function(a){d.user=a.data.user._json}),e=!0),d}}}]),angular.module("faeriadecks2App").constant("APIDomain","http://www.faeriadecks.com"),angular.module("faeriadecks2App").controller("MainCtrl",["Cards","Deck","$routeParams","$location","$cookies","$mdBottomSheet","$mdSidenav","User",function(a,b,c,d,e,f,g,h){function i(a){var b;return l.deck.forEach(function(c){c.id===a&&(b=c)}),b}function j(a){var b;l.deck.forEach(function(c,d){c.id===a&&(b=d)}),l.deck.splice(b,1)}var k=h.get(),l=this;l.hasRated=!1,l.cards=a.get(),l.deck=[],l.totalCards=0,l.deckName="",l.deckUrl="",l.deckNotes="",l.colorFilters={human:!0,green:!0,yellow:!0,blue:!0,red:!0},l.typeFilters={creature:!0,event:!0,structure:!0},l.add=function(b){if(30!==l.totalCards){var c=i(b.id),d=a.getById(b.id);if(c){if("LEGENDARY"===d.rarity)return;if(3===c.copies)return;return c.copies++,void l.totalCards++}var e={id:b.id,name:b.name,copies:1};l.deck.push(e),l.totalCards++}},l.remove=function(a){var b=i(a.id);b.copies--,l.totalCards--,0===b.copies&&j(b.id)};var m={HUMAN:1,BLUE:2,GREEN:3,RED:4,YELLOW:5};l.colorOrder=function(a){return m[a]},l.pad=function(a){for(var b=String(a);b.length<3;)b=0+b;return b},l.rawDeck={},c.deckId&&b.get({deckId:c.deckId}).$promise.then(function(a){l.deckName=a.name,l.deckUrl=a.url,l.deck=a.deck,l.rawDeck=a;var b=0;l.deck.forEach(function(a){b+=a.copies}),l.totalCards=b,l.deckNotes=a.notes,l.deckAuthor=a.author,e.get(l.deckUrl)&&(l.hasRated=!0)},function(){l.error="Deck could not be found."}),l.save=function(){var a;return k.user&&l.deckUrl&&l.deckAuthor&&l.deckAuthor.steamId===k.user.steamid?(a=new b(l.rawDeck),a.name=l.deckName,a.deck=l.deck,a.notes=l.deckNotes,a.id=l.deckUrl,void a.$save().then(function(a){d.path("/"+a.url)})):(a=new b({name:l.deckName,deck:l.deck,notes:l.deckNotes}),void a.$save().then(function(a){d.path("/"+a.url)}))},l.reset=function(){c.deckId&&d.path("/"),l.deck=[],l.totalCards=0,l.deckName="",l.deckUrl=""},l.showDeck=function(){g("right").toggle().then(function(){})}}]),angular.module("faeriadecks2App").controller("RootCtrl",["User","$timeout","$mdSidenav",function(a,b,c){function d(a,c,d){var e;return function(){var d=f,g=Array.prototype.slice.call(arguments);b.cancel(e),e=b(function(){e=void 0,a.apply(d,g)},c||10)}}function e(a){return d(function(){c(a).toggle().then(function(){})},200)}this.user=a.get();var f=this;this.toggleLeft=e("left"),this.close=function(){f.toggleLeft()}}]),angular.module("faeriadecks2App").controller("HomepageCtrl",["Deck","Cards","DiscusComments","User","$scope",function(a,b,c,d,e){var f=this;this.recentDecks=a.list(),this.topDecks=a.topList(),e.user=d.get(),e.$watch("user",function(){e.user&&e.user.user&&e.user.user.steamid&&!f.myDecks&&a.byUser({steamid:e.user.user.steamid}).$promise.then(function(a){f.myDecks=a})}),c.onPromises([this.recentDecks.$promise,this.topDecks.$promise]),this.cards=b.get(),this.getById=function(a){var b;return this.cards&&this.cards.cards?(this.cards.cards.forEach(function(c){c.id===a&&(b=c)}),b):{}},this.getColors=function(a){if(!a||!a.deck)return[];var b=[];return a.deck.forEach(function(a){var c=f.getById(a.id);return c?void(-1===b.indexOf(c.color)&&b.push(c.color)):void console.log("find",a.id)}),b}}]),angular.module("faeriadecks2App").controller("DecksCtrl",["Deck","Cards","$timeout","DiscusComments",function(a,b,c,d){var e=this;this.recentDecks=a.list(),d.onPromises([this.recentDecks.$promise]),this.cards=b.get(),e.colorFilters={human:!0,green:!0,yellow:!0,blue:!0,red:!0},e.perPage=30,e.sort="voteScore",e.includeUntitled=!0}]),angular.module("faeriadecks2App").controller("DeckViewCtrl",["Cards","Deck","$routeParams","$filter","DiscusComments",function(a,b,c,d,e){var f=this;if(f.hasRated=!1,c.deckId){b.get({deckId:c.deckId}).$promise.then(function(a){f.deck=a,f.deck.deck=d("decklistOrder")(f.deck.deck),f.disqusConfig.disqus_title="Deck: "+f.deck.name,e.load()},function(){f.error="Deck could not be found."})}f.cards=a.get(),f.pad=function(a){for(var b=String(a);b.length<3;)b=0+b;return b},this.disqusConfig={disqus_shortname:"faeriadecks",disqus_identifier:c.deckId,disqus_url:"http://www.faeriadecks.com/"+c.deckId,disqus_title:""}}]),angular.module("faeriadecks2App").controller("UserdecksCtrl",["Deck","$routeParams","DiscusComments",function(a,b,c){var d=this;d.steamId=b.steamid,d.steamId?a.byUser({steamid:b.steamid}).$promise.then(function(a){d.decks=a,c.load()},function(){d.error="User could not be found."}):d.error="No user specified."}]),angular.module("faeriadecks2App").directive("starRating",function(){return{restrict:"EA",template:'<ul class="star-rating" ng-class="{readonly: isReadonly}">  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">    <i class="fa fa-star"></i>  </li></ul>',scope:{ratingValue:"=ngModel",max:"=?",onRatingSelect:"&?",isReadonly:"=?"},link:function(a,b,c){function d(){a.stars=[];for(var b=0;b<a.max;b++)a.stars.push({filled:b<a.ratingValue})}a.max||(a.max=5),a.toggle=function(b){if(!a.isReadonly){if(a.ratingValue=b+1,!a.onRatingSelect)return;a.onRatingSelect({rating:b+1})}},a.$watch("ratingValue",function(a,b){d()})}}}),angular.module("faeriadecks2App").directive("stats",["Stats",function(a){return{templateUrl:"/views/stats.html",restrict:"E",scope:{deck:"="},link:function(b,c,d){b.deck||(b.deck=[]);for(var e in a)!function(c){b[c]=function(){var d=Array.prototype.slice.call(arguments);return d.push(b.deck),a[c].apply(null,d)}}(e)}}}]),angular.module("faeriadecks2App").directive("deckItem",["Cards","User","Deck","$mdDialog",function(a,b,c,d){return{templateUrl:"/views/deck-item.html",restrict:"E",replace:!0,scope:{deck:"=",showCopy:"="},link:function(e,f,g){function h(){e.deck&&e.user.user&&e.user.user.steamid&&(-1!==e.deck.vote.negative.indexOf(e.user.user.steamid)&&(e.myVote="downvote"),-1!==e.deck.vote.positive.indexOf(e.user.user.steamid)&&(e.myVote="upvote"))}a.get(),e.getColors=function(b){if(!b||!b.deck)return[];var c=[];return b.deck.forEach(function(b){var d=a.getById(b.id);return d?void(-1===c.indexOf(d.color)&&d.color&&c.push(d.color)):(console.log("find",b.id),[])}),c},e.hasRated=function(a){return!!$cookies.get(a)};var i={YELLOW:"deserts",BLUE:"islands",GREEN:"forests",RED:"mountains"};e.maxColors=function(b,c){if(!c||!c.deck)return 0;var d=0;return c.deck.forEach(function(c){var e=a.getById(c.id);return e?void(e.color&&e.color===b&&i[b]&&e[i[b]]>d&&(d=e[i[b]])):(console.log("find",c.id),0)}),d},e.myVote="",e.vote=function(a,b){return e.user.user&&e.user.user.steamid?a===e.myVote?(c.unvote({id:b}).$promise.then(function(a){e.deck=a}),void(e.myVote="")):(e.myVote=a,void c[a]({id:b}).$promise.then(function(a){e.deck=a})):e.showPopup()},e.user=b.get(),e.$watch("user",h),e.$watch("deck",h),e.showPopup=function(){d.show({templateUrl:"/views/vote-popup.html",parent:angular.element(document.body),clickOutsideToClose:!0,fullscreen:!1})}}}}]),angular.module("faeriadecks2App").filter("colorFilter",function(){return function(a,b){var c=[];return a&&b?(a.forEach(function(a){a&&a.color&&b[a.color.toLowerCase()]&&c.push(a)}),c):c}}).filter("newlines",function(){return function(a){return a?a.replace(/(\r\n|\n|\r)/gm,"<br />"):a}}),angular.module("faeriadecks2App").filter("decklistOrder",["Cards",function(a){function b(a){return a.deserts+a.mountains+a.islands+a.forests}return function(c){return c?(c.sort(function(c,d){var e=a.getById(c.id),f=a.getById(d.id);return e.faeriaCost>f.faeriaCost?1:e.faeriaCost===f.faeriaCost&&b(e)>b(f)?1:e.faeriaCost===f.faeriaCost&&b(e)===b(f)&&e.name>f.name?1:-1}),c):c}}]),angular.module("faeriadecks2App").filter("fullDecks",["Cards",function(a){return function(a){if(!a||!a.forEach)return a;var b=[];return a.forEach(function(a){a&&a.url&&30===a.cardCount&&b.push(a)}),b}}]),angular.module("faeriadecks2App").filter("typeFilter",function(){return function(a,b){var c=[];return a&&b?(a.forEach(function(a){b[a.type.toLowerCase()]&&c.push(a)}),c):c}}),angular.module("faeriadecks2App").filter("deckColorFilter",["Cards",function(a){return function(a,b){var c=[];return a&&b?(a.forEach(function(a){if(a&&a.url){var d=!0;a.colors.forEach(function(a){b[a]||(d=!1)}),d&&c.push(a)}}),c):c}}]),angular.module("faeriadecks2App").service("DiscusComments",["$timeout",function(a){function b(){a(function(){DISQUSWIDGETS.getCount({reset:!0})},1e3)}function c(a){var c=a.length,d=0;a.forEach(function(a){a.then(function(){d++,d===c&&b()})})}return{onPromises:c,load:b}}]),angular.module("faeriadecks2App").filter("hasName",function(){return function(a){var b=[];return a&&a.forEach?(a.forEach(function(a){a.name&&b.push(a)}),b):a}});