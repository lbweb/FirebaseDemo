'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('DataBoxCtrl', function($scope, $log, $modal, $firebase, Databox) {


    /**
    SET DEFAULTS
    **/

    function resetDataBox() {
        $scope.databox = {
            name: '',
            created: '',
            modified: ''
        }
    };

    $scope.databoxes = [];
    $scope.isLoaded = false;

    /**
    FIREBASE
    **/


    Databox.initialLoad().then(function(data) {
        $scope.databoxes = data;
        $scope.isLoaded = true;
    });

    var newDataBoxModal = $modal({
        scope: $scope,
        template: 'views/templates/modal.newDatabox.html',
        show: false
    });


    $scope.showDataBoxModal = function() {
        newDataBoxModal.$promise.then(newDataBoxModal.show);
    };

    $scope.saveDatabox = function() {

        $scope.databox.created = Date.now();
        $scope.databox.modified = Date.now();

        Databox.create($scope.databox).then(function(data) {
            console.log('data from Firebase' + data);
            resetDataBox();
            newDataBoxModal.hide();
        });

    };

    $scope.removeDatabox = function(ref) {
        Databox.delete(ref).then(function(ref) {
            console.log(ref.name());
        })
    };


    resetDataBox();

});