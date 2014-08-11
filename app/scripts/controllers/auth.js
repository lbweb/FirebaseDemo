'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('AuthCtrl', function($scope, Auth, $log, $firebaseSimpleLogin, $location, $modal) {


    $scope.user = {
        'email': '',
        'password': '',
        'confirmPassword': ''
    };

    $scope.testVar = 'hello';

    $scope.errors = [];

    $scope.registerUser = function() {

        Auth.register($scope.user).then(function(data) {
            $log.info(data);
        }, function(error) {
            $log.info(error);
        });

    };

    $scope.logout = function() {
        Auth.logout();
    };

    $scope.isSignedIn = function() {
        return Auth.signedIn();
    };

    $scope.loginUser = function() {

        Auth.login($scope.user).then(function(user) {
            loginModal.hide();
            $log.info("Logged in as: ", user.email);
        }, function(error) {
            $log.info("Login failed: ", error);
        });

    };

    var loginModal = $modal({
        scope: $scope,
        template: 'views/templates/modal.login.html',
        show: false
    });

    $scope.showLoginModal = function() {
        loginModal.$promise.then(loginModal.show);
    };

    if ($location.path() == '/login') {
        $scope.showLoginModal();
    };


});