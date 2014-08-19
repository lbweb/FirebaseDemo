/* global Firebase */
'use strict';


app.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);

    var fireAuth = $firebaseSimpleLogin(ref);

    var Auth = {
        register: function(user) {
            return fireAuth.$createUser(user.email, user.password);
        },
        signedIn: function() {
            return fireAuth.user !== null;
        },
        getCurrentUser: function() {
            return fireAuth.$getCurrentUser();
        },
        login: function(user) {
            return fireAuth.$login('password', user);
        },
        logout: function() {
            fireAuth.$logout();
        }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
        $rootScope.LoggedUser = user;
        console.log($rootScope.LoggedUser);
    });

    return Auth;

});