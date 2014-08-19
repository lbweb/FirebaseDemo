'use strict';

/**
 * @ngdoc overview
 * @name firebaseDemoApp
 * @description
 * # firebaseDemoApp
 *
 * Main module of the application.
 */
var app = angular.module('firebaseDemoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'mgcrea.ngStrap',
        'routeSecurity',
        'simpleLoginTools'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/map', {
                templateUrl: 'views/map.html',
                controller: 'mapCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'AuthCtrl'
            })
            .when('/databoxes', {
                templateUrl: 'views/databoxes.html',
                controller: 'DataBoxCtrl'
            })
            .when('/instagram', {
                templateUrl: 'views/instagram.html',
                controller: 'InstaCtrl'
            })
            .when('/explore', {
                templateUrl: 'views/explore.html',
                controller: 'ExploreCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant('FIREBASE_URL', 'https://disastermapp.firebaseio.com/')
    .constant('loginRedirectPath', '/login')
    .run(function($rootScope) {
        $rootScope.activeDataBox = null;
    });