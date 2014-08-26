/* global Firebase */
'use strict';


app.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope, Databox, User, $q) {
    var ref = new Firebase(FIREBASE_URL);

    var fireAuth = $firebaseSimpleLogin(ref);

    var Auth = {
        register: function(user) {
            var deferred = $q.defer();
            fireAuth.$createUser(user.email, user.password).then(function(userData) {
                User.createUser(userData).then(function(e) {
                    if (e.uid !== null) {
                        deferred.resolve();
                    }
                });
            });
            return deferred.promise;
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

        Databox.initialLoad().then(function(data) {

            angular.forEach(data, function(value, key) {
                if (value.isActive === true) {
                    Databox.setActive(key, function(val) {
                        console.log('Databox is set');
                    });
                }
            });
        });


    });

    return Auth;

});