/* jshint camelcase:false*/
/* global Firebase */
'use strict';


app.factory('Instapile', function($firebase, FIREBASE_URL, $rootScope, Databox) {

    InstaPile = {};



    /*
    PRIVATE FUNCTION THAT SYNCS DATABOXES PER USER
    */
    function loadInstaPile() {
        var ref = new Firebase(FIREBASE_URL + '/Instapiles/' + $rootScope.activeDataBox.$id);
        var sync = $firebase(ref);
        var instapile = sync.$asArray();
        InstaPile = instapile;
    }

    var InstaPile = {
        loadUp: function() {
            if ($rootScope.activeDataBox !== null) {
                loadInstaPile();
                return InstaPile.$loaded();
            } else {
                return false
            }
        },
        list: function() {
            return InstaPile;
        },
        add: function(instaPost) {
            return InstaPile.$add(instaPost);
        },
        delete: function(ref) {
            return InstaPile.$remove(ref);
        }
    };

    return InstaPile;
});