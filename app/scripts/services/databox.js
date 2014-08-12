'use strict';


app.factory('Databox', function($firebase, FIREBASE_URL, Auth, $rootScope) {

    var ref = new Firebase(FIREBASE_URL + '/databoxes');
    var sync = $firebase(ref);
    var databoxes = sync.$asArray();


    var Databox = {
        initialLoad: function() {
            return databoxes.$loaded();
        },

        create: function(databox) {
            return databoxes.$add(databox);
        },

        delete: function(ref) {
            return databoxes.$remove(ref);
        }
    };

    return Databox;
});