/* jshint camelcase:false*/
/* global Firebase */
'use strict';


app.factory('Databox', function($firebase, FIREBASE_URL, Auth, $rootScope, waitForAuth) {


    var UserDatabox = {};
    var activeDataboxId = null;
    /*
    PRIVATE FUNCTION THAT SYNCS DATABOXES PER USER
    */
    function loadUserDataboxes() {
        var ref = new Firebase(FIREBASE_URL + '/databoxes/' + $rootScope.LoggedUser.uid);
        var sync = $firebase(ref);
        var databoxes = sync.$asArray();
        UserDatabox = databoxes;
    }

    function setActiveDataBox(id) {
        activeDataboxId = id;
        $rootScope.activeDataBox = UserDatabox[id];
    }

    var Databox = {
        initialLoad: function() {
            loadUserDataboxes();
            return UserDatabox.$loaded();
        },

        setActive: function(id, callback) {
            if (activeDataboxId !== null) {
                UserDatabox[activeDataboxId].isActive = false;
                UserDatabox.$save(activeDataboxId).then(function() {
                    UserDatabox[id].isActive = true;
                    UserDatabox.$save(id).then(function() {
                        setActiveDataBox(id);
                        callback(true);
                    });
                });
            } else if (activeDataboxId === null) {
                UserDatabox[id].isActive = true;
                UserDatabox.$save(id).then(function() {
                    setActiveDataBox(id);
                    callback(true);
                });
            }
        },
        create: function(databox) {
            return UserDatabox.$add(databox);
        },
        delete: function(ref) {
            return UserDatabox.$remove(ref);
        }
    };

    return Databox;
});