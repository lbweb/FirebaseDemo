'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('AuthCtrl', function($scope, Auth, $log, $firebaseSimpleLogin, $location, $modal, $rootScope, Instapile) {



    $scope.user = {
        'email': '',
        'password': '',
        'confirmPassword': ''
    };



    $scope.showLoading = false;
    $scope.registerError = null;
    $scope.errors = [];

    $rootScope.$watch('activeDataBox', function(newVal, oldVal) {
        $scope.activeDataBox = newVal;
        Instapile.loadUp();
    });

    $scope.registerUser = function() {


        $scope.showLoading = true;


        Auth.register($scope.user).then(function() {
            $scope.showLoading = false;
            registerModal.hide();
        }, function(error) {
            $scope.showLoading = false;
            $scope.registerError = error;
        });

    };


    $scope.logout = function() {
        $rootScope.activeDataBox = null;
        Auth.logout();
    };

    $scope.isSignedIn = function() {
        return Auth.signedIn();
    };

    $scope.loginUser = function() {

        Auth.login($scope.user).then(function(user) {
            loginModal.hide();
            $location.path('/databoxes/');
        }, function(error) {
            $log.info('Login failed: ', error);
        });

    };

    var loginModal = $modal({
        scope: $scope,
        template: 'views/templates/modal.login.html',
        show: false
    });


    var registerModal = $modal({
        scope: $scope,
        template: 'views/templates/modal.register.html',
        show: false
    });



    $scope.showLoginModal = function() {
        loginModal.$promise.then(loginModal.show);
    };

    $scope.showRegisterModal = function() {
        registerModal.$promise.then(registerModal.show);
    };

    if ($location.path() === '/login') {
        $scope.showLoginModal();
    }


});