'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('DataBoxCtrl', function($scope, $log, $modal, $firebase, $rootScope, Databox, User) {


    /**
    SET DEFAULTS
    **/

    function resetDataBox() {
        $scope.databox = {
            name: '',
            created: '',
            modified: '',
            userId: '',
            isActive: false,
            isOwner: false
        };
    }

    //deal with later;
    $scope.isLoaded = true;


    $scope.addDataboxToUser = function(i, a) {
        a.isOwner = false;
        Databox.addOthers(i, a).then(function(returned) {
            console.log(returned);
        });
    };
    /**
    FIREBASE
    **/

    $scope.databoxes = Databox.list();
    $scope.userList = User.listUsers();


    var newDataBoxModal = $modal({
        scope: $scope,
        template: 'views/templates/modal.newDatabox.html',
        show: false
    });


    $scope.showDataBoxModal = function() {
        newDataBoxModal.$promise.then(newDataBoxModal.show);
    };

    $scope.makeActive = function(id) {
        Databox.setActive(id, function(val) {
            //console.log(val);
        });
    };

    $scope.saveDatabox = function() {

        $scope.databox.created = Date.now();
        $scope.databox.modified = Date.now();
        $scope.databox.userId = $rootScope.LoggedUser.id;
        $scope.databox.isOwner = true;
        Databox.create($scope.databox).then(function(data) {
            console.log('data from Firebase' + data);
            resetDataBox();
            newDataBoxModal.hide();
        });

    };

    $scope.removeDatabox = function(ref) {
        Databox.delete(ref).then(function(ref) {
            console.log(ref.name());
        });
    };


    resetDataBox();

});