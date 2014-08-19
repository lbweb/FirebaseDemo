'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('AuthCtrl', function($scope, Auth, $log, $firebaseSimpleLogin, $location, $modal, $rootScope) {


    $scope.user = {
        'email': '',
        'password': '',
        'confirmPassword': ''
    };



    $scope.testVar = 'hello';

    $scope.errors = [];

    $rootScope.$watch('activeDataBox', function(newVal, oldVal) {
        $scope.activeDataBox = newVal;
    });

    $scope.registerUser = function() {

        Auth.register($scope.user).then(function(data) {
            console.log(data);
        }, function(error) {
            $log.info(error);
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