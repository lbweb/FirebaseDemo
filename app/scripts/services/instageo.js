/* jshint camelcase:false*/
/* global Firebase */
'use strict';

app.factory('Instageo', function($firebase, FIREBASE_URL, $rootScope, Databox) {
  var ref = new Firebase(FIREBASE_URL);
  var instageo = $firebase(ref.child('instageo')).$asArray();

  var Instageo = {
    all: function () {
      return $firebase(ref.child('instageo').child($rootScope.activeDataBox.$id)).$asObject();
    }
  };

  return Instageo;
});
