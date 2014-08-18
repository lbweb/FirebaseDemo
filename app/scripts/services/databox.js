'use strict';


app.factory('Databox', function($firebase, FIREBASE_URL, Auth, $rootScope, waitForAuth) {


    var UserDatabox = {};

    /*
    PRIVATE FUNCTION THAT SYNCS DATABOXES PER USER
    */
    function loadUserDataboxes() {
        var ref = new Firebase(FIREBASE_URL + '/databoxes/' + $rootScope.LoggedUser.uid);
        var sync = $firebase(ref);
        var databoxes = sync.$asArray();
        UserDatabox = databoxes;
    }


    var Databox = {
        initialLoad: function() {
            loadUserDataboxes();
            return UserDatabox.$loaded();
        },
        // setActive: function(id){

        // }
        // returnActive: function(){
        //     return returnActive
        // }
        create: function(databox) {
            return UserDatabox.$add(databox);
        },
        delete: function(ref) {
            return UserDatabox.$remove(ref);
        }
    };

    return Databox;
});