'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('DataBoxCtrl', function($scope, FIREBASE_URL, $log, $modal, $firebase) {


    function resetDataBox() {
        $scope.databox = {
            name: '',
            created: '',
            modified: ''
        }
    };

    $scope.databoxes = [];

    $scope.isLoaded = false;

    var ref = new Firebase(FIREBASE_URL + '/databoxes');
    var sync = $firebase(ref);

    var databoxes = sync.$asArray();

    databoxes.$loaded().then(function() {

        $scope.databoxes = databoxes;
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

        sync.$push($scope.databox).then(function() {
            resetDataBox();
            newDataBoxModal.hide();

        })

    };


    resetDataBox();

});